using System.Linq.Dynamic.Core;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;

namespace TeachShare.Core.Iservices
{
    public interface IUserService
    {
        Task<(string Token, UserDto User)> LoginAsync(LoginDTO loginDTO);
        Task<(string Token, UserDto User)> RegisterAsync(UserDto UserDto);
        Task<UserDto> GetUserByIdAsync(int userId);
        Task<PagedResult<UserDto>> GetUsersAsync(int page, int pageSize, string? searchTerm);

        Task<UserDto> CreateUserAsync(UserDto user);
        Task<UserDto> UpdateUserAsync(UserDto user);
        Task<bool> DeleteUserAsync(int userId);
        string GenerateJwtToken(UserDto user);


    }
}
