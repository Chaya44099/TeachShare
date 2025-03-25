using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.Entities;
using TeachShare.Core.Irepositories;

namespace TeachShare.Data.Repository
{
    public class MaterialRepository : IMetirialRepository
    {
        private readonly DataContext _context;

        public MaterialRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Material>> GetAllAsync()
        {
            return await _context.Materials.Include(x=>x.User).ToListAsync();
        }

        public async Task<Material> GetByIdAsync(int id)
        {
            return await _context.Materials.FindAsync(id);
        }

        public async Task<Material> AddAsync(Material entity)
        {
            await _context.Materials.AddAsync(entity);
            return entity;
        }

        public async Task<Material> UpdateAsync(int id, Material entity)
        {
            var existingEntity = await GetByIdAsync(id);
            if (existingEntity == null) throw new Exception("Material not found");

            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
            return existingEntity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity == null) return false;

            _context.Materials.Remove(entity);
            return true;
        }
    }
}
