using SouthIndianKitchens.API.Model;
using Microsoft.EntityFrameworkCore;

namespace SouthIndianKitchens.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {    }
        public DbSet<UserGroup> UserGroup { get;set;}

        public DbSet<Users> User {get; set;}

        public DbSet<UploadImage> UploadImage { get; set; }

        public DbSet<UploadVideoURL> UploadVideoURL { get; set; }

        public DbSet<SocialMediaLinks> SocialMediaLinks { get; set; }
        public DbSet<UserSubscription> UserSubscription { get; set; }
    }
}