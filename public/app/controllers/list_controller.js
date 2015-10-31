IlmoitusApp.controller('ListController', function ($scope, FirebaseService, PostService) {
  $scope.freeItems = [];
  $scope.searchItems = [];
  $scope.changeItems =  [];

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
    }
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
    }
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
    }
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
    } else if ($scope.searchtype === "Etsitään") {
      $scope.searchshipping = searchSearch.searchshipping;
      $scope.searchCondition = searchSearch.searchCondition;
    } else {
      $scope.searchshipping = searchChange.searchshipping;
      $scope.searchCondition = searchChange.searchCondition;
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

  $scope.query = function(list){
    queryObject = {
      type : $scope.searchtype,
      shipping : $scope.searchshipping,
      condition: toArray($scope.searchCondition)
    }
    PostService.query(queryObject).then(function(d) {
    querySwitch(d);
    });
  }
})
