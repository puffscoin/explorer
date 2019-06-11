angular.module('puffsExplorer')
    .controller('addressInfoCtrl', function ($rootScope, $scope, $location, $routeParams, $q) {

      var web3 = $rootScope.web3;
	
      $scope.init=function(){

        $scope.addressId=$routeParams.addressId;

        if($scope.addressId!==undefined) {
          getAddressInfos().then(function(result){
            $scope.balance = result.balance;
            $scope.balanceInPuffs = result.balanceInPuffs;
          });
        }


        function getAddressInfos(){
          var deferred = $q.defer();

          web3.puffs.getBalance($scope.addressId,function(error, result) {
            if(!error) {
                deferred.resolve({
                  balance: result,
                  balanceInPuffs: web3.fromWei(result, 'puffs')
                });
            } else {
                deferred.reject(error);
            }
          });
          return deferred.promise;
        }


      };
      
      $scope.init();

    });
