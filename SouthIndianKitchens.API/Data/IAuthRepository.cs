using System.Collections;
using System.Threading.Tasks;
using SouthIndianKitchens.API.Model;

namespace SouthIndianKitchens.API.Data

{
    public interface IAuthRepository
    {
        Task<Users> Register(Users user, string password);

        Task<EmailSubscribe> SubscribeEmail(EmailSubscribe emailSubscribe, string EmailId);

        Task<UploadImage> AddImage(UploadImage addIMage, string name, string address, string path);

        Task<UploadImage> EditImage(UploadImage editImage);

        Task<int> DeleteImage(int delImageId);

        Task<UploadVideoURL> EditVideo(UploadVideoURL editVideo);

        Task<int> DeleteVideo(int delVideoId);

        //Task<UploadVideoURL> EditVideoUrl(UploadVideoURL addvideo, int id, string videoName, string videoUrl, bool path);
        Task<UploadVideoURL> AddVideoUrl(UploadVideoURL addvideo, string videoName, string videoUrl, bool path);

        Task<Users> Login(string username, string password);
        Task<bool> UserExist(string username);
        Task Login(object username, string password);

        Task<System.Collections.Generic.IEnumerable<UploadImage>> getImages();

        Task<System.Collections.Generic.IEnumerable<UploadVideoURL>> getVideoUrl();

        Task<System.Collections.Generic.IEnumerable<SocialMediaLinks>> getSocialMediaLinks();

    }
}
