IlmoitusApp.controller('UserController', function ($scope, PostService, UserService, $rootScope) {
$scope.usersPosts = [];

UserService.listUsersPosts($rootScope.user.id).then(function(d) {
    $scope.usersPosts = d;
 });

 $scope.removePost = function(post) {
   UserService.removePost(post._id, post.user);
 }

 $scope.sendReply = function(postId,questionId,event) {
   var replyInfo = {
     postId: postId,
     questionId: questionId,
     reply: event.target.parentElement.childNodes[1].value,
     sender: $rootScope.email,
     timestamp: Date.now()
   }
   UserService.addReply(replyInfo);
 }

})
