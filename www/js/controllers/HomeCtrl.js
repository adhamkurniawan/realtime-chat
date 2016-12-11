(function(){
  angular.module('starter')

  .controller('HomeCtrl', ['$scope', '$state', 'localStorageService', 'SocketService', HomeCtrl]);

  function HomeCtrl($scope, $state, localStorageService, SocketService){
    var me = this;

    me.current_room = localStorageService.get('room');
    me.rooms = ['Coding', 'Art', 'Writing', 'Travel', 'Business', 'Photography'];

    $scope.login = function(username){
        localStorageService.set('username', username);
        $state.go('rooms');
    };

    $scope.enterRoom = function(room_name){

        me.current_room = room_name;
        localStorageService.set('room', room_name);

        var room = {
            'room_name': room_name
        };

        SocketService.emit('join:room', room);

        $state.go('room');
    };
  }
})();
