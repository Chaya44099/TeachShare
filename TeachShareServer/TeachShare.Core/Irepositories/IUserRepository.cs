using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;
using TeachShare.Core.Entities;

namespace TeachShare.Core.Irepositories
{
  public  interface IUserRepository : IRepositoryGeneric<User>
    {
        Task<(IEnumerable<UserDto> users, int totalCount)> GetUsersAsync(int page, int pageSize, string? searchTerm);
        Task<User?> GetByEmailAsync(string email);

    }
}
