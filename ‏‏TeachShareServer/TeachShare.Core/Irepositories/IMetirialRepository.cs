﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.Entities;

namespace TeachShare.Core.Irepositories
{
    public interface IMetirialRepository : IRepositoryGeneric<Material>
    {

        Task<IEnumerable<Material>> GetMaterialsByFolderAsync(int folderId);
        Task<IEnumerable<Material>> GetFilesByOwnerAsync(int userId);
    }
}
