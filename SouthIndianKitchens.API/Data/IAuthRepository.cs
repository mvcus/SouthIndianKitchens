using System.Collections;
using System.Threading.Tasks;
using SouthIndianKitchens.API.Model;

namespace SouthIndianKitchens.API.Data

{
    public interface IAuthRepository
    {
        Task<Users> Register(Users user, string password);

        Task<UploadImage> AddImage(UploadImage addIMage, string name, string address, string path);

        Task<Users> Login(string username, string password);
        Task<bool> UserExist(string username);
        Task Login(object username, string password);

        Task<System.Collections.Generic.IEnumerable<UploadImage>> getImages();
    }
}
