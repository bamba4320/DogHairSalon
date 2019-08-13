using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LSServer.BL;
using LSServer.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LSServer.Controllers
{   
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : Controller
    {
        AppointmentBL _appointmentBL;

        public AppointmentController()
        {
            _appointmentBL = new AppointmentBL();
        }

        /// <summary>
        /// Function to get all appointments
        /// </summary>
        /// <returns>Json string - parsed dictionary of all appointments</returns>
        [HttpGet]
        [Route("GetAllAppointments")]
        public ActionResult<List<Appointment>> GetAllAppointments()
        {
            return _appointmentBL.GetAllAppointments();
        }

        /// <summary>
        /// function to cancel appointment
        /// </summary>
        /// <param name="AppointmentId">cancel requested appointment id</param>
        /// <returns>string message </returns>
        [HttpPost]
        [Route("Cancel")]
        public ActionResult<MyBooleanResult> CancelAppointment([FromBody]Appointment App)
        {

            MyBooleanResult res = new MyBooleanResult
            {
                ResultValue = _appointmentBL.CancelAppointment(App.AppointmentId)
            };
            return res;

        }

        /// <summary>
        /// function to update or change appointment date and/or time
        /// </summary>
        /// <param name="Data">JObject contains both new DateTime and AppointmentId</param>
        /// <returns>string message</returns>
        [HttpPost]
        [Route("UpdateAppointment")]
        public ActionResult<MyBooleanResult> ChangeAppointmentDateOrTime([FromBody] UpdateAppointmentDateTime UADT )
        {
            MyBooleanResult res = new MyBooleanResult
            {
                ResultValue = _appointmentBL.ChangeAppointmentDateOrTime(UADT)
            };
            return res;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="UID"></param>
        /// <param name="AID"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("IsAppointmentOfUser")]
        public ActionResult<MyBooleanResult> IsAppointmentOfUser([FromBody] MyAppointmentCheckRequest Receive)
        {
            MyBooleanResult res = new MyBooleanResult
            {
                ResultValue = _appointmentBL.IsAppointmentOfUser(Receive.UID,Receive.AID)
            };
            return res;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddAppointment")]
        public ActionResult<MyBooleanResult> AddAppointment([FromBody] Appointment app)
        {
            MyBooleanResult res = new MyBooleanResult
            {
                ResultValue = _appointmentBL.AddAppointment(app)
            };
            return res;
        }
    }
}