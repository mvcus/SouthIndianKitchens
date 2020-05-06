using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Dtos
{
    public class UploadVideoUrlDto
    {
        public string VideoName { get; set; }

        public string VideoURL { get; set; }

        public bool IsActive { get; set; }
    }
}
