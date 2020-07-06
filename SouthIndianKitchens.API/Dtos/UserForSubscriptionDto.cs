using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Dtos
{
    public class UserForSubscriptionDto
    {
        [Required]
        public string Email { get; set; }
    }
}
