using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LSServer.Models
{
    public class UpdateAppointmentDateTime
    {
        public int AppointmentId { get; set; }
        public DateTime OldDateTime { get; set; }
        public DateTime NewDateTime { get; set; }
    }
}
