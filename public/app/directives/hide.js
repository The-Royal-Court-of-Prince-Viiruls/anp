IlmoitusApp.directive('unhide', function(AuthService){
  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  return{
  		restrict: 'A',
  		priority: 100000,
  		scope: false,
  		link: function(){
  			// alert('ergo sum!');
  		},
  		compile:  function(element, attr, linker){
  			var accessDenied = true;
        AuthService.isUserAuthenticated().then(function(d){
          if (d.data) {
            AuthService.generateRoleData("user");
          } else {
            AuthService.generateRoleData("guest");
          }
  			var user = AuthService.getUser();
  			var attributes = attr.access.split(" ");
  			for(var i in attributes){
  				if(user.role == attributes[i]){
  					accessDenied = false;
  				}
  			}

  			if(!accessDenied){
          element[0].className=replaceAll(attr.class,"disabled ","");
          console.log(element[0].className);
        }

        })

  		}
  	}
});
