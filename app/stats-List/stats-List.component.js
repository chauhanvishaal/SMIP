
angular.module('statsList')
    .component('statsList', {
        templateUrl: 'stats-List/stats-List.template.html',
        controller: function StatsListController($http, $scope, $interval) {
            // this.stats = [
            //     {
            //         name: 'AvgFiveMinLoad',
            //         value: '5.67'
            //     }, {
            //         name: 'AvgTenMinLoad',
            //         value: '6.78'
            //     }
            // ];
            var self = this;
            //var data = [{name: "Moroni", age: 50} /*,*/];
            var data;
            $scope.columns = [{ field: 'Counter' }, { field: 'Value' }];
            $scope.gridOptions = {
                enableSorting: true,
                columnDefs: self.columns,
                onRegisterApi: function( gridApi ) {
                    self.gridApi = gridApi;
                    var cellTemplate = 'ui-grid/selectionRowHeader';   // you could use your own template here
                    self.gridApi.core.addRowHeaderColumn( { name: 'rowHeaderCol', displayName: '', width: 30, cellTemplate: cellTemplate} );
                }
            };
            $http.get('http://localhost:9091/api/stats').then(function (responseJson) {
                self.stats = responseJson.data ;
                $scope.gridOptions.data = self.stats;
            })

            $interval(function () {

                $http.get('http://localhost:9091/api/stats').then(function (responseJson) {
                    self.stats = responseJson.data ;
                    $scope.gridOptions.data = self.stats;
                })
            },2000);


        }
    });
