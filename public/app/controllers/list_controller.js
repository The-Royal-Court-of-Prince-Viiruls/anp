IlmoitusApp.controller('ListController', function ($scope, FirebaseService, PostService) {
  $scope.freeItems = PostService.listByType("Lahjoitetaan");
  $scope.searchItems = PostService.listByType("Etsitään");
  $scope.changeItems = PostService.listByType("Vaihdetaan");

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

  var searcFree = {
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

  var searcChange = {
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

  var searcSearch = {
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

  $scope.querySwitch = function(){
    if ($scope.searchtype === "Lahjoitetaan"){
      $scope.freeItems = query();
    } else if ($scope.searchtype === "Etsitään") {
      $scope.searchItems = query();
    } else {
      $scope.changeItems = query();
    }
  }

  modalModelSwitch = function() {
    if ($scope.searchtype === "Lahjoitetaan"){
      $scope.searchshipping = searcFree.searchshipping;
      $scope.searchCondition = searcFree.searchCondition;
    } else if ($scope.searchtype === "Etsitään") {
      $scope.searchshipping = searcSearch.searchshipping;
      $scope.searchCondition = searcFree.searchCondition;
    } else {
      $scope.searchshipping = searcChange.searchshipping;
      $scope.searchCondition = searcFree.searchCondition;
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

  query = function(){
    queryObject = {
      type : $scope.searchtype,
      shipping : $scope.searchshipping,
      condition: toArray($scope.searchCondition)
    }
     return PostService.query(queryObject);
  }

})
