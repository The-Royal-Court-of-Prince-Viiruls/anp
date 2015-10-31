IlmoitusApp.service('FirebaseService', function ($firebase, $firebaseArray) {
  var firebaseRef = new Firebase('https://ilmoitusapp.firebaseio.com/posts');
  var posts = $firebaseArray(firebaseRef);

  this.getPosts = function () {
    return posts;
  }

  this.addPost = function (post) {
    posts.$add(post);
  }

})
