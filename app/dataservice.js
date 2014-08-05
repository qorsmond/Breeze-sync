angular.module('app')
    .factory('localstorage', [
        '$window', function ($window) {
            return {
                set: function (key, value) {
                    $window.localStorage[key] = value;
                },
                get: function (key) {
                    return $window.localStorage[key];
                },
                setObject: function (key, value) {
                    $window.localStorage[key] = JSON.stringify(value);
                },
                getObject: function (key) {
                    if ($window.localStorage[key]) {
                        return JSON.parse($window.localStorage[key]);
                    }
                },
                clearAll: function () {
                    $window.localStorage.clear();
                },
            }
        }
    ])
    .factory('metadata', function() {
        var metadata = JSON.stringify(
        { "schema": { "namespace": "Breeze_sync.Models", "alias": "Self", "annotation:UseStrongSpatialTypes": "false", "xmlns:annotation": "http://schemas.microsoft.com/ado/2009/02/edm/annotation", "xmlns:customannotation": "http://schemas.microsoft.com/ado/2013/11/edm/customannotation", "xmlns": "http://schemas.microsoft.com/ado/2009/11/edm", "cSpaceOSpaceMapping": "[[\"Breeze_sync.Models.Client\",\"Breeze_sync.Models.Client\"],[\"Breeze_sync.Models.LoanInformation\",\"Breeze_sync.Models.LoanInformation\"],[\"Breeze_sync.Models.Region\",\"Breeze_sync.Models.Region\"],[\"Breeze_sync.Models.Tombstone\",\"Breeze_sync.Models.Tombstone\"]]", "entityType": [{ "name": "Client", "customannotation:ClrType": "Breeze_sync.Models.Client, Breeze-sync, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "guid" } }, "property": [{ "name": "guid", "type": "Edm.Guid", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "AccNr", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "Initials", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "LastName", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "FirstName", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "Tel", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "Email", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "ModifiedTimeStamp", "type": "Edm.Int64" }, { "name": "RegionGuid", "type": "Edm.Guid" }], "navigationProperty": [{ "name": "LoanInformation", "relationship": "Self.Client_LoanInformation", "fromRole": "Client_LoanInformation_Source", "toRole": "Client_LoanInformation_Target" }, { "name": "Region", "relationship": "Self.Region_Clients", "fromRole": "Region_Clients_Target", "toRole": "Region_Clients_Source" }] }, { "name": "LoanInformation", "customannotation:ClrType": "Breeze_sync.Models.LoanInformation, Breeze-sync, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "guid" } }, "property": [{ "name": "guid", "type": "Edm.Guid", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "ContractNr", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "LoanTotal", "type": "Edm.Double", "nullable": "false" }, { "name": "LoanRecovery", "type": "Edm.Double", "nullable": "false" }, { "name": "ModifiedTimeStamp", "type": "Edm.Int64" }, { "name": "ClientGuid", "type": "Edm.Guid", "nullable": "false" }, { "name": "RegionGuid", "type": "Edm.Guid" }], "navigationProperty": [{ "name": "Client", "relationship": "Self.Client_LoanInformation", "fromRole": "Client_LoanInformation_Target", "toRole": "Client_LoanInformation_Source" }, { "name": "Region", "relationship": "Self.Region_LoanInformation", "fromRole": "Region_LoanInformation_Target", "toRole": "Region_LoanInformation_Source" }] }, { "name": "Region", "customannotation:ClrType": "Breeze_sync.Models.Region, Breeze-sync, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "guid" } }, "property": [{ "name": "guid", "type": "Edm.Guid", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "Name", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "ModifiedTimeStamp", "type": "Edm.Int64" }], "navigationProperty": [{ "name": "Clients", "relationship": "Self.Region_Clients", "fromRole": "Region_Clients_Source", "toRole": "Region_Clients_Target" }, { "name": "LoanInformation", "relationship": "Self.Region_LoanInformation", "fromRole": "Region_LoanInformation_Source", "toRole": "Region_LoanInformation_Target" }] }, { "name": "Tombstone", "customannotation:ClrType": "Breeze_sync.Models.Tombstone, Breeze-sync, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "guid" } }, "property": [{ "name": "guid", "type": "Edm.Guid", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "ModifiedTimeStamp", "type": "Edm.Int64" }, { "name": "EntityTypeName", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "EntityKey", "type": "Edm.Guid" }] }], "association": [{ "name": "Region_Clients", "end": [{ "role": "Region_Clients_Source", "type": "Edm.Self.Region", "multiplicity": "0..1" }, { "role": "Region_Clients_Target", "type": "Edm.Self.Client", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Region_Clients_Source", "propertyRef": { "name": "guid" } }, "dependent": { "role": "Region_Clients_Target", "propertyRef": { "name": "RegionGuid" } } } }, { "name": "Region_LoanInformation", "end": [{ "role": "Region_LoanInformation_Source", "type": "Edm.Self.Region", "multiplicity": "0..1" }, { "role": "Region_LoanInformation_Target", "type": "Edm.Self.LoanInformation", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Region_LoanInformation_Source", "propertyRef": { "name": "guid" } }, "dependent": { "role": "Region_LoanInformation_Target", "propertyRef": { "name": "RegionGuid" } } } }, { "name": "Client_LoanInformation", "end": [{ "role": "Client_LoanInformation_Source", "type": "Edm.Self.Client", "multiplicity": "1", "onDelete": { "action": "Cascade" } }, { "role": "Client_LoanInformation_Target", "type": "Edm.Self.LoanInformation", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Client_LoanInformation_Source", "propertyRef": { "name": "guid" } }, "dependent": { "role": "Client_LoanInformation_Target", "propertyRef": { "name": "ClientGuid" } } } }], "entityContainer": { "name": "DataContext", "customannotation:UseClrTypes": "true", "entitySet": [{ "name": "Clients", "entityType": "Self.Client" }, { "name": "LoanInformation", "entityType": "Self.LoanInformation" }, { "name": "Regions", "entityType": "Self.Region" }, { "name": "Tombstones", "entityType": "Self.Tombstone" }], "associationSet": [{ "name": "Region_Clients", "association": "Self.Region_Clients", "end": [{ "role": "Region_Clients_Source", "entitySet": "Regions" }, { "role": "Region_Clients_Target", "entitySet": "Clients" }] }, { "name": "Region_LoanInformation", "association": "Self.Region_LoanInformation", "end": [{ "role": "Region_LoanInformation_Source", "entitySet": "Regions" }, { "role": "Region_LoanInformation_Target", "entitySet": "LoanInformation" }] }, { "name": "Client_LoanInformation", "association": "Self.Client_LoanInformation", "end": [{ "role": "Client_LoanInformation_Source", "entitySet": "Clients" }, { "role": "Client_LoanInformation_Target", "entitySet": "LoanInformation" }] }] } } });
        return {
            getMetadata: function() {
                return metadata;
            }
        };
    })
    .factory('dataservice', function ($rootScope,$q, $timeout,$log, breeze, metadata, localstorage) {

        var dataService = new breeze.DataService({
            serviceName: 'breeze/sync',
            hasServerMetadata: false // don't ask the server for meta data we maintain it our self for offline purposes
        });

        var metadataStore = new breeze.MetadataStore();
        metadataStore.importMetadata(metadata.getMetadata());

        var manager = new breeze.EntityManager({
            dataService: dataService,
            metadataStore: metadataStore
        });
        manager.enableSaveQueuing(true);

        function getAllFor(entity, getOnline) {
            var query = breeze.EntityQuery
                .from(entity);

            var lastSyncDate = localstorage.get('LastSyncDate');

            if (getOnline && lastSyncDate) {
                query = query.where('ModifiedTimeStamp', '>=', lastSyncDate);
            }

            if (!getOnline) {
                query = query.using(breeze.FetchStrategy.FromLocalCache);
            }

            var promise = manager.executeQuery(query).catch(queryFailed);
            return promise;

            function queryFailed(error) {
                $log.log(error.message, "Query failed");
                return $q.reject(error); // so downstream promise users know it failed
            }
        }

        function syncAllDeletes() {
            $log.log('dataservice - syncAllDeletes');

            var query = breeze.EntityQuery
                .from('Tombstones');

            var lastSyncDate = localstorage.get('LastSyncDate');
            if (lastSyncDate) {
                query = query.where('ModifiedTimeStamp', '>=', lastSyncDate);
            }

            return manager.executeQuery(query)
                .then(function (data) {

                    var tooms = [];
                    data.results.forEach(function (item) {
                        var toom = manager.getEntityByKey(item.EntityTypeName, item.EntityKey);

                        if (toom) {
                            manager.detachEntity(toom);
                            tooms.push(toom);
                        }
                    });
                    return tooms;
                });
        }

        function putDataOffline() {
            var deferred = $q.defer();

            var allEntities = manager.exportEntities();
            var obj = { entData: allEntities };
            var setobj = localstorage.setObject('LocalEntities', obj);

            deferred.resolve(setobj);

            return deferred.promise;
        }

        function makeOfflineDataAvailable() {

            var entities = localstorage.getObject('LocalEntities');
            
            if (!entities || !entities.entData) {
                console.log('data is empty');
                $rootScope.$broadcast('DATA_EMPTY', { ready: true });
                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
                return;
            }

            $timeout(function () {
                manager.importEntities(entities.entData);
                //broadcast to the rest of the app that data is now ready
                $rootScope.$broadcast('DATA_READY', { ready: true });
            });
        }



        /**
      * By default changes will only be saved offline and when synced they will be stored online
      * @param Specify to store changes online, if left empty changes will be stored offline
      */
        function saveChanges(online) {
            if (online) {
                return manager.saveChanges();
            } else {
                $log.log('save to local storage');
                return putDataOffline();
            }
        }


        //Public API here
        return {
            getAllFor: getAllFor,
            syncAllDeletes:syncAllDeletes,

            saveChanges: saveChanges,

            putDataOffline: putDataOffline,

            makeOfflineDataAvailable: makeOfflineDataAvailable
        }
    });