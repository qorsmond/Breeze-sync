namespace Breeze_sync.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Client",
                c => new
                    {
                        guid = c.Guid(nullable: false, identity: true),
                        AccNr = c.String(),
                        Initials = c.String(),
                        LastName = c.String(),
                        FirstName = c.String(),
                        Tel = c.String(),
                        Email = c.String(),
                        ModifiedTimeStamp = c.Long(),
                        RegionGuid = c.Guid(),
                    })
                .PrimaryKey(t => t.guid)
                .ForeignKey("dbo.Region", t => t.RegionGuid)
                .Index(t => t.RegionGuid);
            
            CreateTable(
                "dbo.LoanInformation",
                c => new
                    {
                        guid = c.Guid(nullable: false, identity: true),
                        ContractNr = c.String(),
                        LoanTotal = c.Double(nullable: false),
                        LoanRecovery = c.Double(nullable: false),
                        ModifiedTimeStamp = c.Long(),
                        ClientGuid = c.Guid(nullable: false),
                        RegionGuid = c.Guid(),
                    })
                .PrimaryKey(t => t.guid)
                .ForeignKey("dbo.Region", t => t.RegionGuid)
                .ForeignKey("dbo.Client", t => t.ClientGuid, cascadeDelete: true)
                .Index(t => t.ClientGuid)
                .Index(t => t.RegionGuid);
            
            CreateTable(
                "dbo.Region",
                c => new
                    {
                        guid = c.Guid(nullable: false, identity: true),
                        Name = c.String(),
                        ModifiedTimeStamp = c.Long(),
                    })
                .PrimaryKey(t => t.guid);
            
            CreateTable(
                "dbo.Tombstone",
                c => new
                    {
                        guid = c.Guid(nullable: false, identity: true),
                        ModifiedTimeStamp = c.Long(),
                        EntityTypeName = c.String(),
                        EntityKey = c.Guid(),
                    })
                .PrimaryKey(t => t.guid);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.LoanInformation", "ClientGuid", "dbo.Client");
            DropForeignKey("dbo.LoanInformation", "RegionGuid", "dbo.Region");
            DropForeignKey("dbo.Client", "RegionGuid", "dbo.Region");
            DropIndex("dbo.LoanInformation", new[] { "RegionGuid" });
            DropIndex("dbo.LoanInformation", new[] { "ClientGuid" });
            DropIndex("dbo.Client", new[] { "RegionGuid" });
            DropTable("dbo.Tombstone");
            DropTable("dbo.Region");
            DropTable("dbo.LoanInformation");
            DropTable("dbo.Client");
        }
    }
}
