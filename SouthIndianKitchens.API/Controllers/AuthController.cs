using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using SouthIndianKitchens.API.Data;
using SouthIndianKitchens.API.Dtos;
using SouthIndianKitchens.API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Web;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore;

namespace SouthIndianKitchens.API.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("upload")]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }



        [HttpPost]
        [Route("SavePath")]
        public async Task<IActionResult> SavePath(ImageUploadDto ImageUploadDto)
        {
            var userToCreate = new UploadImage
            {
                Name = ImageUploadDto.Name
            };
            var createdImage = await _repo.AddImage(userToCreate, ImageUploadDto.Name, ImageUploadDto.Address, ImageUploadDto.ImgPath);
            return StatusCode(201);
        }


        

        [HttpPost]
        [Route("SaveVideoUrl")]
        public async Task<IActionResult> SaveVideoUrl(UploadVideoUrlDto UploadVideoUrlDto)
        {
            var videoUrl = new UploadVideoURL
            {
                VideoName = UploadVideoUrlDto.VideoName
            };
            var createdImage = await _repo.AddVideoUrl(videoUrl, UploadVideoUrlDto.VideoName, UploadVideoUrlDto.VideoURL, UploadVideoUrlDto.IsActive);
            return StatusCode(201);
        }

        [HttpGet]
        [Route("getImages")]
        public async Task<IActionResult> GetImage()
        {
            var values = await _repo.getImages();
            return Ok(values);
        }

       [HttpPut]
       [Route("EditImage")]
       public async Task<IActionResult>EditImage(UploadImage imageUploadDto)
        {
            var editImage = new UploadImage
            {
                ImgPath = imageUploadDto.ImgPath,
                Id= imageUploadDto.Id,
                Address =imageUploadDto.Address,
                Name=imageUploadDto.Name                                
            };
            var createImage = await _repo.EditImage(editImage);
            return StatusCode(201);
        }
        [HttpDelete]
        [Route("DeleteImage/{deleteImageID}")]
        public async Task<int>DeleteImage(int deleteImageID)
        {
            var deleteImage = new UploadImage
            {
                Id = deleteImageID
            };

            var deleteImg = await _repo.DeleteImage(deleteImage.Id);
            return deleteImageID;
        }
        [HttpGet]
        [Route("getVideoUrl")]
        public async Task<IActionResult> getVideoUrl()
        {
            var values = await _repo.getVideoUrl();
            return Ok(values);
        }

        //method is used to register the user in Db
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegistrationDto)
        {
            //if(!ModelState.IsValid)
            // return BadRequest(ModelState);
            userForRegistrationDto.Username = userForRegistrationDto.Username.ToLower();


            if (await _repo.UserExist(userForRegistrationDto.Username))
                return BadRequest("User already Exist");
            var userToCreate = new Users
            {
                Username = userForRegistrationDto.Username
            };

            var createdUser = await _repo.Register(userToCreate, userForRegistrationDto.Password);
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password);
            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[] {
                       new Claim (ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                       new Claim (ClaimTypes.Name, userFromRepo.Username)

                   };
            var key = new SymmetricSecurityKey(Encoding
            .UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDecriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDecriptor);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}