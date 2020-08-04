using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Dtos
{
    public class ManageImagesDto
    {
        [Required]
        public int TitleId { get; set; }
        [Required]
        public bool IsBanner { get; set; }
        [Required]
        public string ImagePath { get; set; }
        
    }
}
