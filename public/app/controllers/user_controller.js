IlmoitusApp.controller('UserController', function ($scope, PostService, UserService, $rootScope) {
$scope.usersPosts = [];
$scope.postId = "";
$scope.postsComments = [];

UserService.listUsersPosts($rootScope.user.id).then(function(d) {
    $scope.usersPosts = d;
 });

 $scope.unansweredQuestions = function(posti) {
   var i = posti.questions.length;
   while (i--) {
     if (!posti.questions[i].contains(reply)) {
       return true;
     }
   }
   return false
 }

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
     sender: $rootScope.user.email,
     timestamp: Date.now()
   }
   UserService.addReply(replyInfo,$scope.postId);
 }

})
