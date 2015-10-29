IlmoitusApp.service('PostService', function ($http) {

  this.addPost = function (post) {
    $http.post('/posts', { data: post })
    .success(function(data, status, headers, config){
      console.log('Palvelin lähetti vastauksen!');
      console.log(data);
    });
  }

  this.query = function(query) {
    var array = [];
    $http({
    url: '/posts/query/test',
    method: "GET",
    params: { "type": query.type,
              "shipping":query.shipping,
              "condition[]":query.condition}
 })
 .success(function(data, status, headers, config){
   console.log(data);
   for (var item in data) {
     array[item] = data[item].data;
   }
 });
 return array;
  }

  this.listByType = function (type) {
    var array = [];
    $http.get('/posts/:'+type)
    .success(function(data, status, headers, config){
      for (var item in data) {
        array[item] = data[item].data;
      }
    });
    return array;
  }

});
