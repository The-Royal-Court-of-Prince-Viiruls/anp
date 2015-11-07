IlmoitusApp.directive('restrict', function(AuthService, $http, AuthService, $rootScope){
  return{
  		restrict: 'A',
  		priority: 100000,
  		scope: false,
  		link: function(){
  		},
  		compile:  function(element, attr, linker){
        var accessDenied = true;

       AuthService.isUserAuthenticated().then(function(d){
         if (d.data) {
           $rootScope.userLoggedIn = true;
           $rootScope.user = d.data.local;
           $rootScope.user.id = d.data._id;
           AuthService.generateRoleData("user");
         } else {
           $rootScope.userLoggedIn = false;
           $rootScope.user = {};
           AuthService.generateRoleData("guest");
         }

   			var user = AuthService.getUser();
   			var attributes = attr.access.split(" ");
   			for(var i in attributes){
   				if(user.role == attributes[i]){
   					accessDenied = false;
   				}
   			}

   			if(accessDenied){
   				element.children().remove();
   				element.remove();
   			}

       })

  		}
  	}
});
