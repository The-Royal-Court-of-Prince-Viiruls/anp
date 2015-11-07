IlmoitusApp.controller('UserController', function ($scope, PostService, UserService, $rootScope) {
  $scope.usersPosts = [];
  $scope.postId = "";
  $scope.postsComments = [];
  $scope.post = "";

  UserService.listUsersPosts($rootScope.user.id).then(function(d) {
    $scope.usersPosts = d;
  });

  $scope.unansweredQuestions = function(posti) {
    if (typeof posti.questions === 'undefined') {
      return false;
    }
    var i = posti.questions.length;
    while (i--) {
      if (typeof posti.questions[i].reply === 'undefined') {
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

  $scope.openPostModal = function(posti) {
    $scope.post = posti;
    $('#postModal')
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
