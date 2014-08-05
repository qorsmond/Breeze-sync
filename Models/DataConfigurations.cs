using System.Data.Entity.ModelConfiguration;

namespace Breeze_sync.Models
{
    public class LoanInformationConfiguration
       : EntityTypeConfiguration<LoanInformation>
    {
        public LoanInformationConfiguration()
        {
            HasKey(ai => ai.guid);

            HasRequired(fi => fi.Client)
                 .WithMany()
                 .HasForeignKey(fi => fi.ClientGuid)
                 .WillCascadeOnDelete(true);

        }
    }
}