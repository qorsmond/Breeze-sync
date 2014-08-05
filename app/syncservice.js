angular.module('app')
    .factory('syncsvc', function (localstorage, dataservice, $q, $log) {


        function syncronize() {
           
            //Data that changes regularly
            var dynamicTables = [
                { name: 'Regions' },
                { name: 'Clients' },
                { name: 'LoanInformation' }
            ];

            //When the sync completes
            function syncCompleated() {

                var lastSyncDate = Date.now();
                //set last sync date
                localstorage.set('LastSyncDate', lastSyncDate);

                dataservice.putDataOffline();

                //When the sync is done make the data available offline, this will broadcast the DATA_READY event so that all modules can reload data etc
                dataservice.makeOfflineDataAvailable();
            }


            //Save any changes to the online server
            return dataservice.saveChanges('online')
                .then(function () {

                    //Then delete any tombstones
                    dataservice.syncAllDeletes()
                        .then(function () {

                            var dynamicQfns = [];
                            dynamicTables.forEach(function (table) {

                                dynamicQfns.push(
                                    dataservice.getAllFor(table.name, true)
                                    .then(function () {
                                        $log.log('done synced ' + table.name);
                                    })
                                    .catch(function (err) {
                                        console.log(err, 'error');
                                        alert(err);
                                    })
                                );

                            });

                            //Then pull table data
                            $q.all(dynamicQfns)
                                .then(function () {
                                    syncCompleated();
                                },
                                    function (reason) {
                                        $log.log('Failed: ' + reason);
                                    });


                        }, function (reason) {
                            $log.log('the sync has failed.', reason);
                        });
                })
                .catch(function (error) {
                    $log.info('save failed! ->', error);

                    dataservice.getAllErrors();
                });
        }

        // Public API here
        return {
            syncronize: syncronize
        };
    })