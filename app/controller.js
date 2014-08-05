angular.module('app')
    .controller('AppController', function ($scope, clientRepository, syncsvc) {


        $scope.clients = clientRepository.clients;

        //Get the data
        clientRepository.getClients();

        //Subscribe to when data is actually ready 
        $scope.$on('DATA_READY', function () {
            clientRepository.getClients();
        });


        $scope.clientGridOptions = {
            data: 'clients',
            columnDefs: [
                { field: 'AccNr', displayName: 'AccNr' },
                { field: 'LastName', displayName: 'LastName' }
            ],
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
        };


        $scope.save = function() {
            clientRepository.saveChanges();
        }

        $scope.sync = function () {
            syncsvc.syncronize();
        }

    });