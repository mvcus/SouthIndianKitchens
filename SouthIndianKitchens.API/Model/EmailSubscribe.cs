using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace SouthIndianKitchens.API.Model
{
    public class EmailSubscribe
    {
        [Key]
        public string MailId { get; set; }
        [MaxLength(50)]
        public string SubscriberEmail { get; set; }

        public static implicit operator EmailSubscribe(List<EmailSubscribe> e)
        {
            throw new NotImplementedException();
        }
    }
}
