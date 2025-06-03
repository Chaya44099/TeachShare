using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TeachShare.Core.Entities;
using TeachShare.Core.Irepositories;
using TeachShare.Data;

////namespace TeachShare.Data.Repository
////{


////    public class CollectionRepository : IColleltionRepository
////    {
////        private readonly DataContext _context;

////        public CollectionRepository(DataContext context)
////        {
////            _context = context;
////        }

////        public async Task<IEnumerable<Collection>> GetAllAsync()
////        {
////            return await _context.Collections.ToListAsync();
////        }

////        public async Task<Collection> GetByIdAsync(int id)
////        {
////            return await _context.Collections.FindAsync(id);
////        }



////        public async Task<Collection> UpdateAsync(int id, Collection entity)
////        {
////            var existingEntity = await GetByIdAsync(id);
////            if (existingEntity == null) throw new Exception("Collection not found");

////            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
////            return existingEntity;
////        }

////        public async Task<bool> DeleteAsync(int id)
////        {
////            var entity = await GetByIdAsync(id);
////            if (entity == null) return false;

////            _context.Collections.Remove(entity);
////            return true;
////        }
////    }
////}


//public class CollectionRepository : IColleltionRepository
//{
//    private readonly DataContext _context;

//    public CollectionRepository(DataContext context)
//    {
//        _context = context;
//    }

//    //    public async Task<IEnumerable<Collection>> GetAllAsync()
//    //    {
//    //        return await _context.Collections.ToListAsync();
//    //    }

//    //    public async Task<Collection> GetByIdAsync(int id)
//    //    {
//    //        return await _context.Collections.FindAsync(id);
//    //    }

//    public async Task<Collection> AddAsync(Collection entity)
//    {
//        await _context.Collections.AddAsync(entity);
//        return entity;
//    }

//    //    public async Task<Collection> UpdateAsync(int id, Collection entity)
//    //    {
//    //        var existingEntity = await GetByIdAsync(id);
//    //        if (existingEntity == null) throw new Exception("Collection not found");

//    //        _context.Entry(existingEntity).CurrentValues.SetValues(entity);
//    //        return existingEntity;
//    //    }

//    //    public async Task<bool> DeleteAsync(int id)
//    //    {
//    //        var entity = await GetByIdAsync(id);
//    //        if (entity == null) return false;

//    //        _context.Collections.Remove(entity);
//    //        return true;
//    //    }

//    //    public async Task<IEnumerable<Collection>> GetRootCollectionsAsync(int userId)
//    //    {
//    //        return await _context.Collections
//    //            .Where(c => c.ParentCollectionId == null && c.UserId == userId)
//    //            .ToListAsync();
//    //    }

//    //    public async Task<IEnumerable<Collection>> GetSubCollectionsAsync(int parentCollectionId)
//    //    {
//    //        return await _context.Collections
//    //            .Where(c => c.ParentCollectionId == parentCollectionId)
//    //            .ToListAsync();
//    //    }
//    //}
//    public  async Task<IEnumerable<Collection>> GetAllAsync()
//    {
//        return await _context.Collections
//            .Where(c => !c.IsDeleted)
//            .ToListAsync();
//    }

//    public  async Task<Collection> GetByIdAsync(int id)
//    {
//        return await _context.Collections
//            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
//    }

//    public async Task<IEnumerable<Collection>> GetRootCollectionsAsync(int userId)
//    {
//        return await _context.Collections
//            .Where(c => c.UserId == userId && c.ParentCollectionId == null && !c.IsDeleted)
//            .ToListAsync();
//    }

//    public async Task<IEnumerable<Collection>> GetSubCollectionsAsync(int parentId)
//    {
//        return await _context.Collections
//            .Where(c => c.ParentCollectionId == parentId && !c.IsDeleted)
//            .ToListAsync();
//    }

//    public  async Task<bool> DeleteAsync(int id)
//    {
//        var collection = await GetByIdAsync(id);
//        if (collection == null) return false;

//        // Soft delete
//        collection.IsDeleted = true;
//        collection.DeletedDate = System.DateTime.UtcNow;
//        _context.Collections.Update(collection);

//        return true;
//    }



//    public Task<Collection> UpdateAsync(int id, Collection entity)
//    {
//        throw new NotImplementedException();
//    }
//}


public class CollectionRepository : IColleltionRepository
{
    private readonly DataContext _context;

    public CollectionRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Collection> AddAsync(Collection entity)
    {
        await _context.Collections.AddAsync(entity);
        return entity;
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Collection>> GetAllAsync()
    {
        return await _context.Collections
            .ToListAsync(); // ❌ הסרנו את !c.IsDeleted – כי יש Query Filter
    }

    public async Task<Collection> GetByIdAsync(int id)
    {
        return await _context.Collections
            .Include(c => c.Materials)
            .Include(c => c.SubCollections)
            .FirstOrDefaultAsync(c => c.Id == id); // ❌ הסרנו את !c.IsDeleted
    }

    public async Task<IEnumerable<Collection>> GetRootCollectionsAsync(int userId)
    {
        return await _context.Collections
            .Where(c => c.UserId == userId && c.ParentCollectionId == null)
            .ToListAsync(); // ❌ הסרנו את !c.IsDeleted
    }

    public async Task<IEnumerable<Collection>> GetSubCollectionsAsync(int parentId)
    {
        return await _context.Collections
            .Where(c => c.ParentCollectionId == parentId)
            .ToListAsync(); // ❌ הסרנו את !c.IsDeleted
    }

    public async Task<bool> SoftDeleteRecursiveAsync(Collection folder)
    {
        if (folder == null) return false;

        folder.IsDeleted = true;
        folder.DeletedDate = DateTime.UtcNow;

        foreach (var material in folder.Materials)
        {
            material.IsDeleted = true;
            material.DeletedDate = DateTime.UtcNow;
        }

        foreach (var sub in folder.SubCollections)
        {
            var fullSub = await GetByIdAsync(sub.Id);
            if (fullSub != null)
                await SoftDeleteRecursiveAsync(fullSub);
        }

        return true;
    }

    public Task<Collection> UpdateAsync(int id, Collection entity)
    {
        throw new NotImplementedException();
    }
}
