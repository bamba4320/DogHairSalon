using LSServer.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Globalization;
using System.Text.RegularExpressions;

namespace LSServer.Utils
{
    public static class DataToObj
    {
        /// <summary>
        /// convert data to user object
        /// </summary>
        /// <param name="Data">Dataset to convert from</param>
        /// <returns>User object</returns>
        public static User DataToUser(DataSet Data)
        {
            try
            {
                var table = Data.Tables[0].Rows[0];
                User user = new User();
                user.UserId = int.Parse(table["user_user_id"].ToString());
                user.UserUserName = table["user_username"].ToString();
                user.UserPassword = table["user_password"].ToString();
                user.UserName = table["user__name"].ToString();
                return user;
            }
            catch (Exception ex) { Console.WriteLine(ex.StackTrace); return null; }
        }
        /// <summary>
        /// convert datarow to user object
        /// </summary>
        /// <param name="Data">DataRow to convert from</param>
        /// <returns>User object</returns>
        public static User DataToUser(DataRow Data)
        {
            try
            {
                User user = new User();
                user.UserId = int.Parse(Data["user_user_id"].ToString().Trim());
                user.UserUserName = Data["user_username"].ToString().Trim();
                user.UserPassword = Data["user_password"].ToString().Trim();
                user.UserName = Data["user__name"].ToString().Trim();
                return user;
            }
            catch (Exception ex) { Console.WriteLine(ex.StackTrace); return null; }
        }

        /// <summary>
        /// function to find if a user exists on database
        /// </summary>
        /// <param name="Data">Dataset to convert from</param>
        /// <returns>boolean value</returns>
        public static bool IsRecordExist(DataSet Data)
        {
            try
            {
                var table = Data.Tables[0];
                return table.Rows.Count != 0;
            
            }
            //if there is no primary key this exception will be thrown
            catch (MissingPrimaryKeyException noPKEx) { Console.WriteLine(noPKEx.StackTrace); return false; }
            catch (Exception ex) { Console.WriteLine(ex.StackTrace); return false; }
        }

        /// <summary>
        /// function to check is user's input properties are correct
        /// </summary>
        /// <param name="data">DataSet to check from</param>
        /// <param name="UserUserName">Entered Username</param>
        /// <param name="UserPaswword">Entered Password</param>
        /// <returns>Is Valid User</returns>
        public static bool IsValidUser(DataSet data, string UserUserName, string UserPaswword)
        {
            if (IsRecordExist(data))
            {
                var table = data.Tables[0].Rows[0];
                return UserUserName.Equals(table[0]) && UserPaswword.Equals(table[1]);
            }
            return false;
        }

        /// <summary>
        /// convert DataRow entry to appointment object
        /// </summary>
        /// <param name="Data">DataRow to convert from</param>
        /// <returns>Appointment object</returns>
        public static Appointment DataToAppointment(DataRow Data)
        {
            string date = null;
            Appointment app = new Appointment();
            if (Data.ItemArray == null) { return app; }
            app.AppointmentId = int.Parse(Data["appointment_id"].ToString());
            Regex r = new Regex(@"\d\d\d\d-0?\d\d-0?\d\d 0?\d\d:0?\d\d:0?\d\d$");
            if (Regex.Match(Data["appointment_time"].ToString(), r.ToString()).Success)
            {
                date = string.Join("T", Data["appointment_time"].ToString().Split(" "));
            }
            app.Time = DateTime.ParseExact(date ?? ConvertSqlDateToNormalDate(Data["appointment_time"].ToString()), "s", null);
            app.User = DataToUser(Data);
            return app;
        }

        public static string ConvertSqlDateToNormalDate(string date)
        {
            string rebuiled = "";
            string[] Divide = date.Split(" ");
            string[] DateDiv = Divide[0].Split("/");
            string[] TimeDiv = Divide[1].Split(":");

            rebuiled += DateDiv[2]+"-";
            rebuiled += (DateDiv[0].Length <2) ? $"0{DateDiv[0]}-": $"{DateDiv[0]}-";
            rebuiled += (DateDiv[1].Length < 2) ? $"0{DateDiv[1]}" : $"{DateDiv[1]}";
            rebuiled += "T";
            if (Divide[2].Equals("PM"))
            {
                if (int.Parse(TimeDiv[0]) <= 11) { rebuiled += (int.Parse(TimeDiv[0]) + 12).ToString() + ":"; }
                else { rebuiled += TimeDiv[0] + ":"; }
            }
            else
            {
                if (int.Parse(TimeDiv[0]) == 12) { rebuiled += "00:"; }
                else { rebuiled += TimeDiv[0]; }
            }
            rebuiled += (TimeDiv[1].Length<2) ? $"0{TimeDiv[1]}:" : $"{TimeDiv[1]}:";
            rebuiled += (TimeDiv[2].Length < 2) ? $"0{TimeDiv[2]}" : $"{TimeDiv[2]}";

            return rebuiled;
        }
        /// <summary>
        /// function to convert a specific List<Appointment> to Json string 
        /// </summary>
        /// <param name="dict">Dictionary (type:int,Appointment)</param>
        /// <returns>Json string</returns>
        public static string ListToJsonString(List<Appointment> lst)
        {
            var entries = lst.Select(d => string.Format("{0}",JsonConvert.SerializeObject(d)));
            return "{" + string.Join(",", entries) + "}";
        }

        /// <summary>
        /// function to retrieve Json string out of DataSet of Appointments
        /// </summary>
        /// <param name="Data">DataSet to convert from</param>
        /// <returns>Json string contains all Appointment objects</returns>
        public static List<Appointment> DataToListOfAppointments(DataSet Data)
        {
            List<Appointment> listOfAppointments = new List<Appointment>();
            foreach (DataRow r in Data.Tables[0].Rows)
            {
                Appointment app = DataToAppointment(r);
                listOfAppointments.Insert(listOfAppointments.Count, app);
            }
            return listOfAppointments;
        }

        public static string AppointmentToJson(Appointment app)
        {
            return $"{{{JsonConvert.SerializeObject(app)}}}";
        }
    }
}
