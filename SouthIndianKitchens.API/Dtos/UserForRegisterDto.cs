using System.ComponentModel.DataAnnotations;

namespace SouthIndianKitchens.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username {get;set;}
        
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage = "Password between 4 and 8 charator")]
        public string Password {get;set;}
    }
}