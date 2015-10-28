IlmoitusApp.service('PostService', function ($http) {
  this.getPosts = function () {
    $http.get('/posts')
    .success(function(data, status, headers, config){
      console.log('Palvelin lähetti vastauksen!');
      console.log(data);
    })
    .error(function(data, status, headers, config){
      console.log('Jotain meni pieleen...');
    });
  }

  this.addPost = function (post) {
    $http.post('/posts', { data: post })
    .success(function(data, status, headers, config){
      console.log('Palvelin lähetti vastauksen!');
      console.log(data);
    })
    .error(function(data, status, headers, config){
      console.log('Jotain meni pieleen...');
    });
  }

  this.query = function(query) {
    $http({
    url: '/posts/query/test',
    method: "GET",
    params: { "type": query.type,
              "shipping":query.shipping}
 })
 .success(function(data, status, headers, config){
      console.log('Palvelin lähetti vastauksen!');
      for (var post in data) {
        console.log(data[post]);
      }
    })
    .error(function(data, status, headers, config){
      console.log('Jotain meni pieleen...');
    });
  }

});
