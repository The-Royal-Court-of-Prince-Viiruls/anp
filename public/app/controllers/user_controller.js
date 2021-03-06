IlmoitusApp.controller('UserController', function ($scope, PostService, UserService, $rootScope, $window) {
  $scope.usersPosts = [];
  $scope.postId = "";
  $scope.postsComments = [];
  $scope.post = "";
  $scope.usersQuestions = [];

  UserService.listUsersQuestions().then(function(d) {
    for (var post in d){
      var questions = d[post].questions;
      for (var question in questions) {
        var quiz = questions[question];
        if($rootScope.user.id == quiz.senderId){
          var reply = quiz.reply;
          if (typeof reply === 'undefined'){
            reply = ''
          } else {
            reply = quiz.reply.reply;
          }
          $scope.usersQuestions.push({post: d[post].item, question: quiz.question,  reply: reply})
      }
    }
  }
});

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
    $scope.post = posti;
    $scope.postsComments = posti.questions;
    $scope.postId = posti._id;
    // Modal doesn't scale right (Semantic bug); workaround:
    $('#commentModal')
    .modal({ detachable:false, observeChanges:true })
    .modal('show')
    .modal('refresh');
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

  $scope.removePost = function(post, index) {
    UserService.removePost(post._id, post.user);
    $scope.usersPosts.splice(index,1);
  }

  $scope.sendReply = function(questionId, event) {
    var replyInfo = {
      questionId: questionId,
      reply: event.target.parentElement.childNodes[3].value,
      sender: $rootScope.user.email,
      timestamp: Date.now()
    }
     UserService.addReply(replyInfo,$scope.postId);
    for (var comment in $scope.postsComments) {
      if(questionId === $scope.postsComments[comment]._id){
        $scope.postsComments[comment]["reply"]= replyInfo;
      }
    }
  }

})
