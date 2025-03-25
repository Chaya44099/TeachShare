using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeachShare.Data.Repository
{
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using TeachShare.Core.Entities;
    using TeachShare.Core.Irepositories;

    public class UserRepository : IUserRepository
    {


        private readonly DataContext _context;
       

        public UserRepository(DataContext context)
        {
            _context = context;
            
        }
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<User> AddAsync(User entity)
        {
            await _context.AddAsync(entity);
            return entity;
        }

        public async Task<User> UpdateAsync(int id, User entity)
        {
            var existingEntity = await GetByIdAsync(id);
            if (existingEntity == null) throw new Exception("User not found");

            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
            return existingEntity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity == null)return false;
            _context.Remove(entity);
            return true;
        }

       

       
    }

}
