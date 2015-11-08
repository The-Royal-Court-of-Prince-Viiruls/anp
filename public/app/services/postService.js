IlmoitusApp.service('PostService', function ($http) {

    this.addPost = function (post) {
      $http.post('/posts', post)
      .success(function(data, status, headers, config){
      });
    };

    this.query = function(query) {
      var promise = $http({
      url: '/posts/query/',
      method: "GET",
      params: { "type": query.type,
                "shipping":query.shipping,
                "condition[]":query.condition,
                "category[]":query.category,
                "location[]":query.location}
   }).then(function(response){
        return response.data;
      });
      return promise;
    };

    this.type = function(type) {
      var promise = $http.get('/posts/:'+type)
      .then(function(response){
        return response.data;
      });
      return promise;
    };

    this.addQuestion = function(msg) {
      $http.post('/posts/addquestion', msg)
      .success(function(data, status, headers, config){
      });
    }


});
