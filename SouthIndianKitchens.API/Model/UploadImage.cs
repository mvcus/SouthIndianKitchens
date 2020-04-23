using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Model
{
        public class UploadImage
        {
            [Key]
            public int Id { get; set; }

            [Required]
            public string Name { get; set; }

            [Required]
            public string Address { get; set; }

            public string ImgPath { get; set; }

        public static implicit operator UploadImage(List<UploadImage> v)
        {
            throw new NotImplementedException();
        }
    }
}
