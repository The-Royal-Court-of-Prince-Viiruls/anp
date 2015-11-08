IlmoitusApp.service('UserService', function ($http) {

  this.listUsersPosts = function(id) {
    // $http returns a promise, which has a then function, which also returns a promise
    var promise = $http({
      url: '/posts/user/:'+id,
      method: "GET"
    }).then(function(response){
      // The then function here is an opportunity to modify the response

      // The return value gets picked up by the then in the controller.
      return response.data;
    });
    // Return the promise to the controller
    return promise;
  };

  this.removePost = function(id, user) {
    $http.post('/posts/delete/:'+id, {user: user})
    .success(function(data, status, headers, config){
    });
  }

  this.addReply = function(reply,postId) {
    $http.post('/posts/addReply/:'+postId, reply)
    .success(function(data, status, headers, config){
    });
  }

  this.listUsersQuestions = function(userId){
    var promise = $http({
      url: '/posts/user/questions',
      method: "GET",
      params:{"userId": userId}
    }).then(function(response){
      return response.data;
    });
    // Return the promise to the controller
    return promise;
  }
})
