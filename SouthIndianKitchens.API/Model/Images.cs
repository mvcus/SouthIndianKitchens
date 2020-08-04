using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Model
{
    public class Images
    {
        public int Id { get; set; }
        public int TitleId { get; set; }
        public bool IsBanner { get; set; }
        public string ImagePath { get; set; }
       
    }
}
