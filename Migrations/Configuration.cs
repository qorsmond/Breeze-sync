using System.Collections.ObjectModel;
using Breeze_sync.Models;

namespace Breeze_sync.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Breeze_sync.Models.DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Breeze_sync.Models.DataContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            //some setup
            context.Database.ExecuteSqlCommand("SET ANSI_NULLS ON");
            context.Database.ExecuteSqlCommand("SET QUOTED_IDENTIFIER ON");
            context.Database.ExecuteSqlCommand("SET NOCOUNT ON");

            //Add function
            const string dTtoUnixTs = @"CREATE FUNCTION [dbo].[DTtoUnixTS] 
                                ( 
                                    @dt DATETIME 
                                ) 
                                RETURNS BIGINT 
                                AS 
                                BEGIN 
                                    DECLARE @diff BIGINT 
                                    IF @dt >= '20380119' 
                                    BEGIN 
                                        SET @diff = CONVERT(BIGINT, DATEDIFF(S, '19700101', '20380119')) 
                                            + CONVERT(BIGINT, DATEDIFF(S, '20380119', @dt)) 
                                    END 
                                    ELSE 
                                        SET @diff = DATEDIFF(S, '19700101', @dt) 
                                    RETURN @diff * 1000 --for miliseconds
                                END";

            try
            {
                context.Database.ExecuteSqlCommand(dTtoUnixTs);
            }
            catch (Exception)
            {
                //Already exist
            }

            var sets =
                from p in typeof (DataContext).GetProperties()
                where p.PropertyType.IsGenericType && p.PropertyType.GetGenericTypeDefinition() == typeof (DbSet<>)
                select p;

            foreach (var item in sets)
            {
                var tableName = item.PropertyType.GetGenericArguments().FirstOrDefault().Name;
                if (tableName != "Tombstone")
                {
                    System.Diagnostics.Debug.WriteLine(tableName);

                    var createTrigger = string.Format(@"CREATE TRIGGER [dbo].[{0}_create_trigger]
                                        ON [dbo].[{0}]
                                        AFTER INSERT
                                        AS
                                        UPDATE [dbo].[{0}]
                                        SET ModifiedTimeStamp = [dbo].DTtoUnixTS(GETUTCDATE())
                                        WHERE EXISTS (SELECT *
                                        FROM inserted AS i
                                        WHERE i.guid = [dbo].[{0}].guid)", tableName);

                    var updateTrigger = string.Format(@"CREATE TRIGGER [dbo].[{0}_update_trigger]
                                                    ON [dbo].[{0}]
                                                    AFTER UPDATE
                                                    AS
                                                    -- Prevent recursion!
                                                    IF NOT UPDATE(ModifiedTimeStamp)
                                                    BEGIN
                                                    UPDATE [dbo].[{0}]
                                                    SET ModifiedTimeStamp = [dbo].DTtoUnixTS(GETUTCDATE())
                                                    WHERE EXISTS (SELECT *
                                                    FROM inserted AS i
                                                    WHERE i.guid = [dbo].[{0}].guid)
                                                    END", tableName);

                    var deleteTrigger =
                        string.Format(@"CREATE TRIGGER [dbo].[{0}_delete_trigger] ON [dbo].[{0}] FOR DELETE AS
                                                    INSERT INTO [dbo].[Tombstone]
                                                               ([ModifiedTimeStamp]
                                                               ,[EntityTypeName]
                                                               ,[EntityKey])
                                                         Select
                                                         [dbo].DTtoUnixTS(GETUTCDATE()),
                                                         '{0}',
                                                         [d].guid
                                                         FROM DELETED [d]", tableName);


                    try
                    {
                        //triggers on our table
                        context.Database.ExecuteSqlCommand(createTrigger);
                        context.Database.ExecuteSqlCommand(updateTrigger);
                        context.Database.ExecuteSqlCommand(deleteTrigger);
                    }
                    catch (Exception)
                    {
                        //Already exist
                    }
                }
            }

            //DATA SEEDING 

            context.Regions.AddOrUpdate(p => p.Name,
                new Region
                {
                    Name = "Region A",
                    Clients =
                        new Collection<Client>
                        {
                            new Client
                            {
                                AccNr = "A000123",
                                Initials = "A",
                                FirstName = "Andre",
                                LastName = "Hill",
                                Email = "a-hill-test@gmail.com",
                                Tel = "555-555",
                                LoanInformation =
                                    new Collection<LoanInformation>
                                    {
                                        new LoanInformation
                                        {
                                            ContractNr = "#000123",
                                            LoanTotal = 120000,
                                            LoanRecovery = 50000
                                        }
                                    }
                            }
                        }
                });

            context.Regions.AddOrUpdate(p => p.Name, new Region
            {
                Name = "Region B",
                Clients =
                    new Collection<Client>
                    {
                        new Client
                        {
                            AccNr = "B000123",
                            Initials = "B",
                            FirstName = "Ben",
                            LastName = "Regan",
                            Email = "b-regan-test@gmail.com",
                            Tel = "555-123",
                            LoanInformation =
                                new Collection<LoanInformation>
                                {
                                    new LoanInformation
                                    {
                                        ContractNr = "#000569",
                                        LoanTotal = 86000,
                                        LoanRecovery = 12000
                                    }
                                }
                        }
                    }
            });


            context.SaveChanges();

        }
    }
}
