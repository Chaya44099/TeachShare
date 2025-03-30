using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeachShare.Core.Entities;

namespace TeachShare.Core.DTOs
{
    public class MaterialDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public long Size { get; set; }
        public string AwsUrl { get; set; }
        public string S3Key { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CollectionID { get; set; }
        public int UserId { get; set; }

    }
}
