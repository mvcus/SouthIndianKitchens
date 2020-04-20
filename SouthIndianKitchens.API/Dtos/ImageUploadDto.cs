using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Dtos
{
    public class ImageUploadDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string ImagePath { get; set; }
    }
}
