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
        public async Task<IActionResult> EditImage(UploadImage imageUploadDto)
        {
            var editImage = new UploadImage
            {
                ImgPath = imageUploadDto.ImgPath,
                Id = imageUploadDto.Id,
                Address = imageUploadDto.Address,
                Name = imageUploadDto.Name
            };
            var createImage = await _repo.EditImage(editImage);
            return StatusCode(201);
        }
        [HttpDelete]
        [Route("DeleteImage/{deleteImageID}")]
        public async Task<int> DeleteImage(int deleteImageID)
        {
            var deleteImage = new UploadImage
            {
                Id = deleteImageID
            };
            var deleteImg = await _repo.DeleteImage(deleteImage.Id);
            return deleteImageID;
        }


        [HttpPut]
        [Route("EditVideo")]
        public async Task<IActionResult> EditVideo(UploadVideoURL imageVideoDto)
        {
            var editVideo = new UploadVideoURL
            {
                VideoName = imageVideoDto.VideoName,
                Id = imageVideoDto.Id,
                VideoURL = imageVideoDto.VideoURL,
                isActive = imageVideoDto.isActive
            };
            var createImage = await _repo.EditVideo(editVideo);
            return StatusCode(201);
        }
        [HttpDelete]
        [Route("DeleteVideo/{deleteVideoID}")]
        public async Task<int> DeleteVideo(int deleteVideoID)
        {
            var deleteVideo = new UploadVideoURL
            {
                Id = deleteVideoID
            };
            var deleteImg = await _repo.DeleteVideo(deleteVideo.Id);
            return deleteVideoID;
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
       
        //[HttpPost("emailsubscribe")]
        //public async Task<IActionResult>SubscribeEmail(EmailSubscribeDto emailSubscribeDto)
        //{
        //    emailSubscribeDto.EmailId = emailSubscribeDto.EmailId.ToLower();
        //    if (await _repo.UserExist(emailSubscribeDto.EmailId))
        //        return BadRequest("Email Id already Exists");
        //    var subscribeToCreate = new EmailSubscribe
        //    {
        //        SubscriberEmail = emailSubscribeDto.EmailId
        //    };
        //    var createdSubscriber = await _repo.SubscribeEmail(subscribeToCreate, emailSubscribeDto.EmailId);
        //    return StatusCode(201);
        //}


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

        [HttpGet]
        [Route("getSocialMediaLinks")]
        public async Task<IActionResult> getSocialMediaLinks()
        {
            var values = await _repo.getSocialMediaLinks();
            return Ok(values);
        }

       
        [HttpPost("sendEmail")]
        public async Task<IActionResult> SendEmail(UserForSubscriptionDto userForSubscriptionDto, string Email)
        {
            userForSubscriptionDto.Email = userForSubscriptionDto.Email.ToLower();

            var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587);
            client.UseDefaultCredentials = false;
            client.EnableSsl = true;

            client.Credentials = new System.Net.NetworkCredential("kalaimca2013@gmail.com", "kavin@2018");

            var mailMessage = new System.Net.Mail.MailMessage();
            mailMessage.From = new System.Net.Mail.MailAddress("kalaimca2013@gmail.com");

            mailMessage.To.Add(userForSubscriptionDto.Email);

            //mailMessage.To.Add(email.To);
            //if (!string.IsNullOrEmpty(email.Cc))
            //{
            //    mailMessage.CC.Add(email.Cc);
            //}

            mailMessage.Body = "Successfully subscribed";

            mailMessage.Subject = "South Indian food email subscription";

            mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;

            await client.SendMailAsync(mailMessage);

            var userToSubscribe = new UserSubscription
            {
                Email = userForSubscriptionDto.Email
            };

            var subscribedUser = await _repo.SendEmail(userToSubscribe, userForSubscriptionDto.Email);

            return StatusCode(201);
            //return Ok();
        }
    }
}