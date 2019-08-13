using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LSServer.Models
{
    public class UpdateUserName
    {
        public int UserId { get; set; }
        public string OldName { get; set; }
        public string NewName { get; set; }
    }
}
