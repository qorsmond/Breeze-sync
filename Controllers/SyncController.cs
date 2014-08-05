using System.Linq;
using System.Web.Http;
using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using Breeze_sync.Models;
using Newtonsoft.Json.Linq;

namespace Breeze_sync.Controllers
{
    [BreezeController]
    public class SyncController : ApiController
    {
        readonly EFContextProvider<DataContext> _contextProvider =
            new EFContextProvider<DataContext>();

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpGet]
        public IQueryable<Region> Regions()
        {
            return _contextProvider.Context.Regions;
        }

        [HttpGet]
        public IQueryable<Client> Clients()
        {
            return _contextProvider.Context.Clients;
        }

        [HttpGet]
        public IQueryable<LoanInformation> LoanInformation()
        {
            return _contextProvider.Context.LoanInformation;
        }

        //Tombstones
        [HttpGet]
        public IQueryable<Tombstone> Tombstones()
        {
            return _contextProvider.Context.Tombstones;
        }


        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            SaveResult saveResult = _contextProvider.SaveChanges(saveBundle);

            return saveResult;
        }
    }
}
