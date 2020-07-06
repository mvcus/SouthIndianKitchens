using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Model
{
    public class UserSubscription
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public bool isSent { get; set; }

    }
}
