using System;
using System.Threading.Tasks;
using SouthIndianKitchens.API.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

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

            //var user = await _context.User.FirstOrDefaultAsync(x=>x.Username ==username);
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

        public async Task<UploadImage> AddImage(UploadImage uploadImage , string name, string address,string path)
        {
            uploadImage.Name = name;
            uploadImage.Address = address;
            uploadImage.ImgPath = path;
            await _context.UploadImage.AddAsync(uploadImage);
            await _context.SaveChangesAsync();
            return uploadImage;

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
    }
}