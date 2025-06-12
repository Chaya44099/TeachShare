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
using TeachShare.Core.Settings;
using Microsoft.Extensions.Options;
using TeachShare.Core;
namespace TeachShare.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly JwtSettings _jwtSettings;

        public UserService(IRepositoryManager repository, IMapper mapper, IConfiguration configuration, IOptions<JwtSettings> settings)
        {
            _repositoryManager = repository;
            _mapper = mapper;
            _configuration = configuration;
            _jwtSettings = settings.Value;
        }


        public async Task<PagedResult<UserDto>> GetUsersAsync(int page, int pageSize, string? searchTerm)
        {
            var (users, totalCount) = await _repositoryManager.UserRepository.GetUsersAsync(page, pageSize, searchTerm);

            return new PagedResult<UserDto>
            {
                Data = users,
                Pagination = new PaginationInfo
                {
                    Page = page,
                    Limit = pageSize,
                    Total = totalCount,
                    TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
                }
            };
        }


        public async Task<UserDto> GetUserByIdAsync(int userId)
        {
            var user = await _repositoryManager.UserRepository.GetByIdAsync(userId);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> CreateUserAsync(UserDto userDto)
        {
            if (userDto == null ||
                string.IsNullOrWhiteSpace(userDto.Email) ||
                string.IsNullOrWhiteSpace(userDto.PasswordHash) ||
                string.IsNullOrWhiteSpace(userDto.FirstName) ||
                string.IsNullOrWhiteSpace(userDto.LastName))
            {
                throw new ArgumentException("Missing required fields.");
            }

            if (!IsValidEmail(userDto.Email))
            {
                throw new ArgumentException("Invalid email format.");
            }

            var exists = (await _repositoryManager.UserRepository.GetAllAsync())
                         .Any(u => u.Email == userDto.Email);

            if (exists)
            {
                throw new ArgumentException("User already exists.");
            }

            var newUser = _mapper.Map<User>(userDto);
            newUser.PasswordHash = HashPassword(userDto.PasswordHash);
            newUser.CreatedAt = DateTime.UtcNow;


            var userEntityAdded = await _repositoryManager.UserRepository.AddAsync(newUser);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<UserDto>(userEntityAdded);

        }
        public async Task<UserDto> UpdateUserAsync(UserDto userDto)
        {

            var existingUser = await _repositoryManager.UserRepository.GetByIdAsync(userDto.Id);
            if (existingUser == null) throw new Exception("User not found");
            existingUser.FirstName = userDto.FirstName;
            existingUser.LastName = userDto.LastName;
            existingUser.Email = userDto.Email;
            existingUser.Role = userDto.Role;
            existingUser.IsActive = userDto.IsActive;
            if (userDto.PasswordHash != null && userDto.PasswordHash != "")
                existingUser.PasswordHash = HashPassword(userDto.PasswordHash);

            await _repositoryManager.UserRepository.UpdateAsync(existingUser.Id, existingUser);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<UserDto>(existingUser);
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var entity = await _repositoryManager.UserRepository.GetByIdAsync(userId);
            if (entity == null) return false;

            entity.IsDeleted = true;
            await _repositoryManager.SaveAsync();
            return true;
        }


        public async Task<(string Token, UserDto User)> LoginAsync(LoginDTO loginDTO)
        {
            if (loginDTO == null ||
                string.IsNullOrWhiteSpace(loginDTO.Email) ||
                string.IsNullOrWhiteSpace(loginDTO.PasswordHash))
            {
                throw new ArgumentException("Email and password are required.");
            }

            var user = await _repositoryManager.UserRepository.GetByEmailAsync(loginDTO.Email);

            if (user == null || !VerifyPassword(user.PasswordHash, loginDTO.PasswordHash))
            {
                throw new UnauthorizedAccessException("Email or password is incorrect.");
            }

            if (!user.IsActive)
            {
                throw new UnauthorizedAccessException("This account is disabled.");
            }

            user.LastLogin = DateTime.UtcNow;
            await _repositoryManager.UserRepository.UpdateAsync(user.Id, user);
            await _repositoryManager.SaveAsync();

            var userDto = _mapper.Map<UserDto>(user);

            var token = GenerateJwtToken(userDto);

            return (token, userDto);
        }


        public async Task<(string Token, UserDto User)> RegisterAsync(UserDto userDto)
        {
            var createdUser = await CreateUserAsync(userDto);
            var token = GenerateJwtToken(createdUser);

            return (token, createdUser);
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
        public string GenerateJwtToken(UserDto user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role) // ✳️ זה חשוב
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}

