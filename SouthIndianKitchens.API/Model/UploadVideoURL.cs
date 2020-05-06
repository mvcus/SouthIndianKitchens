using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Model
{
    public class UploadVideoURL
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string VideoName { get; set; }

        [Required]
        public string VideoURL { get; set; }

        [Required]
        public bool isActive { get; set; }
    }
}
