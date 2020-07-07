using System;
using System.Threading.Tasks;
using SouthIndianKitchens.API.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace SouthIndianKitchens.API.Data
{

    public class AuthRepository : IAuthRepository
    {
        private const bool V = true;

        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            this._context = context;
        }
        public async Task<Users> Login(string username, string password)
        {
            //byte[] data = System.Text.UTF8Encoding.GetBytes(_context.User.passwordHash);
            
            //var user = await _context.User.FirstOrDefaultAsync(x => x.Username == username);
             var user = await _context.User.SingleOrDefaultAsync(x => x.Username == username);
            if (user == null)
                return null;
            if (!verifyPasswordHash(password, user.passwordHash, user.PasswordSalt))
                return user;
            return user;
        }

        private bool verifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var ComputedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < ComputedHash.Length; i++)
                {
                    if (ComputedHash[i] != passwordHash[i]) return false;
                }
                return true;

            }
        }

        public async Task<Users> Register(Users user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.passwordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;

        }
        //public async Task<EmailSubscribe>Subscribe(EmailSubscribe email,string EmailId)
        //{
        //    email.SubscriberEmail =EmailId;
        //    await _context.UserSubscription.AddAsync(email);
        //    await _context.SaveChangesAsync();
        //    return email;
        //}

        public async Task<UploadImage> AddImage(UploadImage uploadImage , string name, string address,string path)
        {
            uploadImage.Name = name;
            uploadImage.Address = address;
            uploadImage.ImgPath = path;
            await _context.UploadImage.AddAsync(uploadImage);
            await _context.SaveChangesAsync();
            return uploadImage;

        }

        public async Task<UploadImage>EditImage(UploadImage uploadImage1)
        {

            UploadImage uploadImage = _context.UploadImage.Where(temp => temp.Id == uploadImage1.Id).FirstOrDefault();
            if (uploadImage != null)
            {
                uploadImage.Name = uploadImage1.Name;
                uploadImage.Address = uploadImage1.Address;
              
               // await _context.UploadImage.AddAsync(uploadImage);
                await _context.SaveChangesAsync();
                return uploadImage;
            }
            else
            {
                return null;
            }
        }
        public async Task <int> DeleteImage(int delImageId)
        {
            UploadImage deleteImageid1 = _context.UploadImage.Where(temp => temp.Id == delImageId).FirstOrDefault();
            if(deleteImageid1 != null)
            {
                _context.Remove(deleteImageid1);
                await _context.SaveChangesAsync();              
                return delImageId;
            }
            else
            {
                return -1;
            }
        }
        

        public async Task<int> DeleteVideo(int delVideoId)
        {
            UploadVideoURL uploadVideo = _context.UploadVideoURL.Where(temp => temp.Id == delVideoId).FirstOrDefault();
            if (uploadVideo != null)
            {
                _context.Remove(uploadVideo);
                await _context.SaveChangesAsync();
                return delVideoId;
            }
            else
            {
                return -1;
            }
        }

        public async Task<UploadVideoURL> EditVideo(UploadVideoURL editVideo)
        {

            UploadVideoURL uploadVideo = _context.UploadVideoURL.Where(temp => temp.Id == editVideo.Id).FirstOrDefault();
            if (uploadVideo != null)
            {
                uploadVideo.VideoName = editVideo.VideoName;
                uploadVideo.VideoURL = editVideo.VideoURL;
                await _context.SaveChangesAsync();
                return uploadVideo;
            }
            else
            {
                return null;
            }
        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        public async Task<bool> UserExist(string username)
        {
            if (await _context.User.AnyAsync(x => x.Username == username))
                return true;
            return false;
        }

        public Task Login(object username, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UploadImage>> getImages()
        {
            var UploadImage = await _context.UploadImage.ToListAsync();
            return UploadImage;
        }

        public async Task<UploadVideoURL> AddVideoUrl(UploadVideoURL addvideo, string videoName, string videoUrl, bool path)
        {
            addvideo.VideoName = videoName;
            addvideo.VideoURL = videoUrl;
            addvideo.isActive = path;
            await _context.UploadVideoURL.AddAsync(addvideo);
            await _context.SaveChangesAsync();
            return addvideo;
        }

        public async Task<IEnumerable<UploadVideoURL>> getVideoUrl()
        {
            var UploadVideoUrl = await _context.UploadVideoURL.Where(p =>p.isActive == true).ToListAsync();
            return UploadVideoUrl;
        }

        public async Task<IEnumerable<SocialMediaLinks>> getSocialMediaLinks()
        {
            var socialMediaLinks = await _context.SocialMediaLinks.ToListAsync();
            return socialMediaLinks;
        }
        public async Task<UserSubscription> SendEmail(UserSubscription userSubscription, string Email)
        {
            userSubscription.Email = Email;
            userSubscription.isSent = true;
            await _context.UserSubscription.AddAsync(userSubscription);
            await _context.SaveChangesAsync();
            return userSubscription;
        }
    }
}