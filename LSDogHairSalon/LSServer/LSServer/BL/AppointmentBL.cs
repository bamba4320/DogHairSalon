using LSServer.Models;
using LSServer.SQLConnector;
using LSServer.Utils;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LSServer.BL
{
    public class AppointmentBL
    {
        public AppointmentBL() { }

        /// <summary>
        /// function to retreive all appointments
        /// </summary>
        /// <returns>Json string</returns>
        public List<Appointment> GetAllAppointments()
        {
            DataSet ReturnedData = SqlConnector.Select("*", "Users,Appointments", "where user_user_id = appointment_user_id");
            return DataToObj.DataToListOfAppointments(ReturnedData);
        }

        /// <summary>
        /// function to remove appointment from database
        /// </summary>
        /// <param name="AppointmentId">cancel requested appointment id</param>
        /// <returns>Success status</returns>
        public bool CancelAppointment(int AppointmentId)
        {
            return SqlConnector.Delete("Appointments", $"where appointment_id = {AppointmentId}");
        }


        /// <summary>
        /// function to remove all user's appointments 
        /// </summary>
        /// <param name="UserId">int</param>
        /// <returns>Success status</returns>
        public bool CancelAllUserAppointments(int UserId)
        {
            return SqlConnector.Delete("Appointments", $"where appointment_user_id = {UserId}");
        }

        /// <summary>
        /// function to update appointment time and date
        /// </summary>
        /// <param name="Data">JObject, contains 2 parameters: "newTimeAndDate":Format(yyyy-mm-dd HH:MM:SS) and "AppointmentId":int</param>
        ///<returns>Success status</returns>
        public bool ChangeAppointmentDateOrTime(UpdateAppointmentDateTime UADT)
        {
            if (!IsAppointmentOccupied(UADT))
            {
                return SqlConnector.Update("Appointments", "appointment_time", $"'{UADT.NewDateTime}'", $"where appointment_id = {UADT.AppointmentId}");
            }
            return false;
        }

        public bool AddAppointment(Appointment app)
        {
            if (!IsAppointmentOccupied(app.Time)){
                return SqlConnector.Insert("Appointments", $"{app.User.UserId},'{app.Time}'");
            }
            return false;
        }

        /// <summary>
        /// function to check if Appointment its of user
        /// </summary>
        /// <param name="Data">Jobject containt 2 parameters: "UserId":{user_id}, "AppId":{appointment_id}</param>
        /// <returns>boolean value of Success</returns>
        public bool IsAppointmentOfUser(int UID, int AID)
        {
            DataSet ReturnedData = SqlConnector.Select("user_user_id, appointment_id", "Users, Appointments", $"where user_user_id = {UID} and appointment_id = {AID} and appointment_user_id = {UID}");
            return DataToObj.IsRecordExist(ReturnedData);
        }

        /// <summary>
        /// function to check if wished time is occupied
        /// </summary>
        /// <param name="UADT">UpdateAppointmentDateTime object</param>
        /// <returns>boolean value</returns>
        public bool IsAppointmentOccupied(UpdateAppointmentDateTime UADT)
        {
            DataSet ReturnedData = SqlConnector.Select("appointment_id", "Appointments", $"where '{UADT.NewDateTime}' = appointment_time");
            return DataToObj.IsRecordExist(ReturnedData);
        }

        public bool IsAppointmentOccupied(DateTime DateTime)
        {
            DataSet ReturnedData = SqlConnector.Select("appointment_id", "Appointments", $"where appointment_time = '{DateTime.ToString()}'");
            return DataToObj.IsRecordExist(ReturnedData);
        }
    }
}
