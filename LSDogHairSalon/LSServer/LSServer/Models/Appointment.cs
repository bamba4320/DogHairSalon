using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LSServer.Models
{
    public class Appointment
    {
        public User User { get; set; }
        public int AppointmentId { get; set; }
        public DateTime Time { get; set; }
    }
}
