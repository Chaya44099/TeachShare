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

    public class RatingRepository : IRatingRepository
    {


        private readonly DataContext _context;

        public RatingRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Rating>> GetAllAsync()
        {
            return await _context.Ratings.ToListAsync();
        }

        public async Task<Rating> GetByIdAsync(int id)
        {
            return await _context.Ratings.FindAsync(id);
        }

        public async Task<Rating> AddAsync(Rating entity)
        {
            await _context.Ratings.AddAsync(entity);
            return entity;
        }

        public async Task<Rating> UpdateAsync(int id, Rating entity)
        {
            var existingEntity = await GetByIdAsync(id);
            if (existingEntity == null) throw new Exception("Rating not found");

            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
            return existingEntity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity == null) return false;

            _context.Ratings.Remove(entity);
            return true;
        }
    }

}
    
