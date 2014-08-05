using System.Data.Entity;

namespace Breeze_sync.Models
{
    public class DataContext : DbContext
    {
        public DataContext()
            : base("name=DefaultConnection")
        {
        }

        //Data 
        public DbSet<Region> Regions { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<LoanInformation> LoanInformation { get; set; }

        //Tombstones
        public DbSet<Tombstone> Tombstones { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new LoanInformationConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}