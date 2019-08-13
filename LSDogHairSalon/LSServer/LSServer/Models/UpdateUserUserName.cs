using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LSServer.Models
{
    public class UpdateUserUserName
    {
        public int    UserId      { get; set; }
        public string OldUserName { get; set; }
        public string NewUserName { get; set; }
    }
}
