IlmoitusApp.controller('UserController', function ($scope, PostService, UserService, $rootScope) {
$scope.usersPosts = [];
$scope.postId = "";
$scope.postsComments = [];

UserService.listUsersPosts($rootScope.id).then(function(d) {
    $scope.usersPosts = d;
 });

 $scope.openCommentModal = function(posti) {
   $scope.postsComments = posti.questions;
   $scope.postId = posti._id;
   $('#commentModal')
   .modal('show')
   ;
 }

 $scope.showAnswerBox = function(event) {
   event.currentTarget.parentElement.getElementsByClassName("ui fluid action input")[0].style.display = '';
 }

 $scope.removePost = function(post) {
   UserService.removePost(post._id, post.user);
 }

 $scope.sendReply = function(questionId, event) {
   var replyInfo = {
     questionId: questionId,
     reply: event.target.parentElement.childNodes[1].value,
     sender: $rootScope.email,
     timestamp: Date.now()
   }
   UserService.addReply(replyInfo,$scope.postId);
 }

})
