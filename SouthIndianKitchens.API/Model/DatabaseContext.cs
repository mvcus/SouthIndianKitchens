using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SouthIndianKitchens.API.Model
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Users> User { get; set; }
        public DbSet<UserGroup> UserGroup { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            LoadDefaultUsers();
        }

        public List<Users> LoadDefaultUsers() => User.ToList();
        //{
        //Users.Add(new User { Id = 100, Username = "Chandan" });
        //Users.Add(new User { Id = 102, Username = "Amit" });

        //}
        public List<Users> getUsers() => User.ToList();

        public List<UserGroup> getGroup() => UserGroup.ToList();
        public void AddUser(Users user)
        {
            User.Add(user);
            this.SaveChanges();
            return;
        }
        public void AddUserGroup(UserGroup usergroup)
        {
            UserGroup.Add(usergroup);
            this.SaveChanges();
            return;
        }
    }
}
