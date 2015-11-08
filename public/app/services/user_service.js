IlmoitusApp.service('UserService', function ($http) {

  this.listUsersPosts = function(id) {
    var promise = $http({
      url: '/posts/user/:'+id,
      method: "GET"
    }).then(function(response){
      return response.data;
    });
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

  this.listUsersQuestions = function(){
    var promise = $http({
      url: '/questions/user',
      method: "GET"
    }).then(function(response){
      return response.data;
    });
    return promise;
  }
})
