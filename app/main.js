
    // app module depends on "Breeze Angular Service"
angular.module('app', ['breeze.angular', 'ngGrid'])
    .run(function (dataservice) {
        
        //It is very important to let the data only populate the manager once!
        var offlineDataPrepaired = false;

        function prepareOfflineData() {
            if (!offlineDataPrepaired) {
                dataservice.makeOfflineDataAvailable();
                offlineDataPrepaired = true;
            }
        }
        prepareOfflineData();

    })
