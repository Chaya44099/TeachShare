using AutoMapper;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;
using TeachShare.Core.Irepositories;
using TeachShare.Core.Iservices;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace TeachShare.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public UserService(IRepositoryManager repository, IMapper mapper, IConfiguration configuration)
        {
            _repositoryManager = repository;
            _mapper = mapper;
            _configuration = configuration;
        }


        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var users = await _repositoryManager.UserRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }

        public async Task<UserDTO> GetUserByIdAsync(int userId)
        {
            var user = await _repositoryManager.UserRepository.GetByIdAsync(userId);
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> CreateUserAsync(User user)
        {
            var userEntity = _mapper.Map<User>(user);

            var userEntityAdded = await _repositoryManager.UserRepository.AddAsync(userEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<UserDTO>(userEntityAdded);

        }
        public async Task<UserDTO> UpdateUserAsync(UserDTO userDto)
        {
            var existingUser = await _repositoryManager.UserRepository.GetByIdAsync(userDto.Id);
            if (existingUser == null) throw new Exception("User not found");

            var userEntity = _mapper.Map<User>(userDto);
            await _repositoryManager.UserRepository.UpdateAsync(existingUser.Id, userEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<UserDTO>(userEntity);
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _repositoryManager.UserRepository.GetByIdAsync(userId);
            if (user != null)
            {
                await _repositoryManager.UserRepository.DeleteAsync(userId);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;

        }

        public async Task<(string Token, UserDTO User)> LoginAsync(LoginDTO loginDTO)
        {
            if (loginDTO == null || string.IsNullOrWhiteSpace(loginDTO.Email) || string.IsNullOrWhiteSpace(loginDTO.PasswordHash))//צריך לבדוק על הכל הפרטים?
            {
                throw new ArgumentException("Email and password are required.");
            }
            var user = (await _repositoryManager.UserRepository.GetAllAsync()).FirstOrDefault(u => u.Email == loginDTO.Email);

            if (user == null || !VerifyPassword(user.PasswordHash, loginDTO.PasswordHash))
            {
                throw new ArgumentException("Invalid login data.");
            }

            // כאן נבצע קריאה ל-API או מסד נתונים כדי לבדוק את המידע
            // לדוגמה, נניח שיש לנו פונקציה בשם AuthenticateUserAsync
            // var token = await AuthenticateUserAsync(loginDTO.Username, loginDTO.Password);

            //if (string.IsNullOrEmpty(token))
            //{
            //    throw new UnauthorizedAccessException("Invalid username or password.");
            //}

            var token = GenerateJwtToken(user);

            // החזרת טוקן ופרטי משתמש
            return (Token: token, User: _mapper.Map<UserDTO>(user));
        }

        public async Task<(string Token, UserDTO User)> RegisterAsync(UserDTO userDTO)
        {
            // 1. בדיקת נתונים חובה
            if (userDTO == null || string.IsNullOrWhiteSpace(userDTO.Email) || string.IsNullOrWhiteSpace(userDTO.PasswordHash))//צריך לבדוק על הכל הפרטים?
            {
                throw new ArgumentException("Email and password are required.");
            }

            // 2. בדיקת פורמט של אי-מייל
            if (!IsValidEmail(userDTO.Email))
            {
                throw new ArgumentException("Invalid email format.");
            }

            // 3. בדיקת חוזק סיסמה
            //if (!IsStrongPassword(userDTO.Password))
            //{
            //    throw new ArgumentException("Password does not meet complexity requirements.");
            //}

            // 4. בדיקת ייחודיות של המשתמש
            var existingUser = (await _repositoryManager.UserRepository.GetAllAsync()).ToList().Any(u => u.Email == userDTO.Email);

            if (existingUser)
            {
                throw new ArgumentException("User already exists.");
            }

            var newUser = _mapper.Map<User>(userDTO);
            // 5. הצפנת סיסמה
            newUser.PasswordHash = HashPassword(userDTO.PasswordHash);

            // 6. שמירה בבסיס נתונים
            var user = await CreateUserAsync(newUser);
            // await _repositoryManager.SaveAsync();
            var token = GenerateJwtToken(newUser);

            // החזרת טוקן ופרטי משתמש
            return (Token: token, User: _mapper.Map<UserDTO>(newUser));
        }

        private bool IsValidEmail(string email)
        {
            var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            return System.Text.RegularExpressions.Regex.IsMatch(email, emailPattern);
        }
        private bool VerifyPassword(string storedHash, string password)
        {
            string hashOfInput = HashPassword(password);
            return storedHash == hashOfInput;
        }

        public string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }
        public string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>()
            {
                 new Claim(ClaimTypes.Name, user.Username), // משתמש בשם המשתמש מהאובייקט UserDTO
                  new Claim(ClaimTypes.Email, user.Email) // הוספת מייל מהאובייקט UserDTO
        
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30), // תאריך תפוגה של 30 דקות
                signingCredentials: signinCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions); // החזרת הטוקן
        }

    }
}

