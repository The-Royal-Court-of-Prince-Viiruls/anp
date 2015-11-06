IlmoitusApp.service('PostService', function ($http) {

    this.addPost = function (post) {
      $http.post('/posts', post)
      .success(function(data, status, headers, config){
      });
    };

    this.query = function(query) {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http({
      url: '/posts/query/',
      method: "GET",
      params: { "type": query.type,
                "shipping":query.shipping,
                "condition[]":query.condition,
                "category[]":query.category,
                "location[]":query.location}
   }).then(function(response){
        // The then function here is an opportunity to modify the response

        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    };

    this.type = function(type) {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('/posts/:'+type)
      .then(function(response){
        // The then function here is an opportunity to modify the response

        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    };

    this.addQuestion = function(msg) {
      $http.post('/posts/addquestion', msg)
      .success(function(data, status, headers, config){
      });
    }


});
