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

        //        public async Task<IEnumerable<Material>> GetAllAsync()
        //        {
        //            return await _context.Materials.Include(x=>x.User).ToListAsync();
        //        }

        //        public async Task<Material> GetByIdAsync(int id)
        //        {
        //            return await _context.Materials
        //                .Include(f => f.collection)
        //                .Include(f => f.User)
        //                .FirstOrDefaultAsync(f => f.Id == id);
        //        }
        public async Task<Material> AddAsync(Material material)
        {
           // material.CreatedAt = DateTime.UtcNow;
            _context.Materials.Add(material);
            //await _context.SaveChangesAsync();
            return material;
        }

        //        public async Task<Material> UpdateAsync(int id, Material entity)
        //        {
        //            var existingEntity = await GetByIdAsync(id);
        //            if (existingEntity == null) throw new Exception("Material not found");

        //            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
        //            return existingEntity;
        //        }

        //        public async Task<bool> DeleteAsync(int id)
        //        {
        //            var material = await _context.Materials.FindAsync(id);
        //            if (material == null) return false;

        //            material.IsDeleted = true;
        //            //await _context.SaveChangesAsync();
        //            return true;
        //        }
        //        public async Task<IEnumerable<Material>> GetFilesByOwnerAsync(int ownerId)
        //        {
        //            return await _context.Materials
        //                .Where(f => f.UserId == ownerId && !f.IsDeleted)
        //                .ToListAsync();
        //        }

        //        public async Task<IEnumerable<Material>> GetFilesByFolderAsync(int folderId)
        //        {
        //            return await _context.Materials
        //                .Where(f => f.CollectionID == folderId && !f.IsDeleted)
        //                .ToListAsync();
        //        }






        //    }
        //}
        public  async Task<IEnumerable<Material>> GetAllAsync()
        {
            return await _context.Materials
                .Where(m => !m.IsDeleted)
                .ToListAsync();
        }

        public  async Task<Material>GetByIdAsync(int id)
        {
            return await _context.Materials
                .FirstOrDefaultAsync(m => m.Id == id && !m.IsDeleted);
        }

        public async Task<IEnumerable<Material>> GetMaterialsByFolderAsync(int folderId)
        {
            return await _context.Materials
                .Where(m => m.CollectionID == folderId && !m.IsDeleted)
                .ToListAsync();
        }

        public async Task<IEnumerable<Material>> GetFilesByOwnerAsync(int userId)
        {
            return await _context.Materials
                .Where(m => m.UserId == userId && !m.IsDeleted)
                .ToListAsync();
        }

        public  async Task<bool> DeleteAsync(int id)
        {
            var material = await GetByIdAsync(id);
            if (material == null) return false;

            // Soft delete
            material.IsDeleted = true;
            material.DeletedDate = System.DateTime.UtcNow;
            _context.Materials.Update(material);

            return true;
        }

        //public Task<Material> AddAsync(Material entity)
        //{
        //    throw new NotImplementedException();
        //}

        public Task<Material> UpdateAsync(int id, Material entity)
        {
            throw new NotImplementedException();
        }
    }
}