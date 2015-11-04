IlmoitusApp.controller('ListController', function ($scope, FirebaseService, PostService, LoginService, $rootScope) {
  $scope.freeItems = [];
  $scope.searchItems = [];
  $scope.changeItems =  [];

  // Check if user is logged in
  $scope.isLoggedIn = false;

  $scope.$on('logged-value-changed', function(event, args) {
    $scope.isLoggedIn = args.isLogged.data;
  });

  $scope.sendQuestion = function(id,event) {
    var questionInfo = {
      questionID: id,
      question: event.target.parentElement.childNodes[1].value,
      sender: $rootScope.userinfo.email,
      timestamp: Date.now()
    }
    PostService.addQuestion(questionInfo);
  }

  PostService.type("Lahjoitetaan").then(function(d) {
      $scope.freeItems = d;
  });

  PostService.type("Etsitään").then(function(d) {
    $scope.searchItems = d;
  });

  PostService.type("Vaihdetaan").then(function(d) {
    $scope.changeItems = d;
  });

  $scope.searchshipping = {
    pickup:true,
    mail:true,
    home:true
  }

  $scope.searchCondition = {
    new: "Uudenveroinen",
    good: "Hyvä",
    reasonable: "Kohtalainen",
    bad: "Heikko"
  }

  $scope.category = [];
  $scope.location = [];

  $scope.searchtype = "Lahjoitetaan";

  var searchFree = {
    searchshipping : {
      pickup:true,
      mail:true,
      home:true
    },
    searchCondition : {
      new: "Uudenveroinen",
      good: "Hyvä",
      reasonable: "Kohtalainen",
      bad: "Heikko"
    },
    category :[],
    location :[]
  }

  var searchChange = {
    searchshipping : {
      pickup:true,
      mail:true,
      home:true
    },
    searchCondition : {
      new: "Uudenveroinen",
      good: "Hyvä",
      reasonable: "Kohtalainen",
      bad: "Heikko"
    },
    category :[],
    location :[]
  }

  var searchSearch = {
    searchshipping : {
      pickup:true,
      mail:true,
      home:true
    },
    searchCondition : {
      new: "Uudenveroinen",
      good: "Hyvä",
      reasonable: "Kohtalainen",
      bad: "Heikko"
    },
    category :[],
    location :[]
  }

  $scope.changeType = function(event) {
    $scope.searchtype=event.target.getAttribute("data-tab");
  }

  // Open the search refining modal
  $scope.refineModal = function() {
    modalModelSwitch();
    $('#refineModal').modal('show');
  };

  $scope.accordion = function() {
    $('.ui.accordion')
    .accordion();
  };

  querySwitch = function(data){
    if ($scope.searchtype === "Lahjoitetaan"){
      $scope.freeItems = data;
    } else if ($scope.searchtype === "Etsitään") {
      $scope.searchItems = data;
    } else {
      $scope.changeItems = data;
    }
  }

  modalModelSwitch = function() {
    if ($scope.searchtype === "Lahjoitetaan"){
      $scope.searchshipping = searchFree.searchshipping;
      $scope.searchCondition = searchFree.searchCondition;
      $scope.category = searchFree.category;
      $scope.location = searchFree.location;
    } else if ($scope.searchtype === "Etsitään") {
      $scope.searchshipping = searchSearch.searchshipping;
      $scope.searchCondition = searchSearch.searchCondition;
      $scope.category = searchSearch.category;
      $scope.location = searchSearch.location;
    } else {
      $scope.searchshipping = searchChange.searchshipping;
      $scope.searchCondition = searchChange.searchCondition;
      $scope.category = searchChange.category;
      $scope.location = searchChange.location;
    }
  }

  toArray = function (object) {
    var array = [];
    var i = 0;
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (object[property]!== false) {
          array[i++]=object[property];
        }
      }
    }
    return array;
}
  $scope.shippingMethods = function(post) {
    var methods = post.methods;
    var result = "";
    if (methods.pickup === true) {
      result+="Nouto ";
    }
    if (methods.mail === true) {
      result+="Postitus ";
    }
    if (methods.home === true) {
      result+="Kotiintoimitus ";
    }

    return result;
  }

  $scope.query = function(){
    $('#refineModal').modal('hide');
    queryObject = {
      type : $scope.searchtype,
      shipping : $scope.searchshipping,
      condition: toArray($scope.searchCondition),
      category: $scope.category,
      location: $scope.location
    };
    PostService.query(queryObject).then(function(d) {
    querySwitch(d);
    });
  }
})
