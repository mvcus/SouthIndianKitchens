using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Model
{
    public class Menu
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsActive { get; set; }
    }
}
