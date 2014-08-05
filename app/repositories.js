angular.module('app')
    .factory('clientRepository', function (dataservice) {
        // Service logic
        var clients = [];

        function getClients() {
            return dataservice.getAllFor('Clients')
                .then(function (data) {
                    clients.length = 0;

                    data.results.forEach(function (item) {
                        clients.push(item);
                    });

                    return clients;
                });
        }

        function saveChanges() {
            return dataservice.saveChanges();
        }

        //Public API here
        return {
            clients: clients,

            getClients: getClients,
            saveChanges: saveChanges
        }
    });