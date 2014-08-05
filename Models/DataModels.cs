using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Breeze_sync.Models
{
    [Table("Region")]
    public class Region
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid guid { get; set; }

        public string Name { get; set; }

        public long? ModifiedTimeStamp { get; set; }


        [InverseProperty("Region")]
        public ICollection<Client> Clients { get; set; }

        [InverseProperty("Region")]
        public ICollection<LoanInformation> LoanInformation { get; set; }
    }

    [Table("Client")]
    public class Client
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid guid { get; set; }

        public string AccNr { get; set; }

        public string Initials { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Tel { get; set; }

        public string Email { get; set; }

        public long? ModifiedTimeStamp { get; set; }

        public Guid? RegionGuid { get; set; }

        [ForeignKey("RegionGuid")]
        public Region Region { get; set; }


        [InverseProperty("Client")]
        public ICollection<LoanInformation> LoanInformation { get; set; }
    }

    [Table("LoanInformation")]
    public class LoanInformation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid guid { get; set; }

        public string ContractNr { get; set; }
        public double LoanTotal { get; set; }
        public double LoanRecovery { get; set; }

        public long? ModifiedTimeStamp { get; set; }

        public Guid? ClientGuid { get; set; }

        [ForeignKey("ClientGuid")]
        public Client Client { get; set; }

        public Guid? RegionGuid { get; set; }

        [ForeignKey("RegionGuid")]
        public Region Region { get; set; }

    }

    //Tombstones

    [Table("Tombstone")]
    public class Tombstone
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid guid { get; set; }

        public long? ModifiedTimeStamp { get; set; }

        public string EntityTypeName { get; set; }

        public Guid? EntityKey { get; set; }
    }
}