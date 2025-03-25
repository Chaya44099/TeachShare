using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;

namespace TeachShare.Core.Iservices
{
    public interface IUserService
    {
        Task<(string Token, UserDTO User)> LoginAsync(LoginDTO loginDTO);
        Task<(string Token, UserDTO User)> RegisterAsync(UserDTO userDTO);
        Task<UserDTO> GetUserByIdAsync(int userId);
        Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        Task<UserDTO> CreateUserAsync(User user);
        Task<UserDTO> UpdateUserAsync(UserDTO user);
        Task<bool> DeleteUserAsync(int userId);


    }
}
