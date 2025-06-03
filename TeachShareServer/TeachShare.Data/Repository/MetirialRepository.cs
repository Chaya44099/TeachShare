using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.DTOs;
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

        public async Task<Material> AddAsync(Material material)
        {
            _context.Materials.Add(material);
            return material;
        }

        public async Task<IEnumerable<Material>> GetAllAsync()
        {
            return await _context.Materials
                .ToListAsync(); // ❌ אין צורך בסינון IsDeleted – מטופל ע"י Query Filter
        }

        public async Task<Material> GetByIdAsync(int id)
        {
            return await _context.Materials
                .FirstOrDefaultAsync(m => m.Id == id); // ❌ אין צורך בסינון IsDeleted
        }

        public async Task<IEnumerable<Material>> GetMaterialsByFolderAsync(int folderId)
        {
            return await _context.Materials
                .Where(m => m.CollectionID == folderId)
                .ToListAsync(); // ❌ אין צורך בסינון IsDeleted
        }

        public async Task<IEnumerable<Material>> GetFilesByOwnerAsync(int userId)
        {
            return await _context.Materials
                .Where(m => m.UserId == userId)
                .ToListAsync(); // ❌ אין צורך בסינון IsDeleted
        }

        public async Task<bool> SoftDeleteAsync(Material material)
        {
            if(material == null)
                return false;
            material.IsDeleted = true;  // נניח ש-FileEntity מכיל שדה IsDeleted מסוג bool
            material.DeletedDate = DateTime.UtcNow; // אופציונלי - לשמור תאריך מחיקה

            _context.Materials.Update(material);
            return true;
        }

        //public async Task UpdateAsync(Material material)
        //{
        //    _context.Materials.Update(material);
        //    await _context.SaveChangesAsync();
        //}

        //public async Task<Material> UpdateAsync(int id, Material entity)
        //{
        //    var existing = await GetByIdAsync(id);
        //    if (existing == null) throw new Exception("Material not found");

        //    _context.Entry(existing).CurrentValues.SetValues(entity);
        //    _context.Materials.Update(existing);
        //    return existing;
        //}

        public async Task<IEnumerable<Material>> FindAllAsync(Expression<Func<Material, bool>> predicate)
        {
            return await _context.Materials
                .Where(predicate)
                .ToListAsync(); // גם פה Query Filter יופעל אוטומטית
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Material> UpdateAsync(int id, Material entity)
        {
            throw new NotImplementedException();
        }
    }
}
