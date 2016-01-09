angular.module('domopi')

.controller('RulesCtrl', function($scope, Rules) {

  Rules.all().success( function(response) {
    console.log('callback rule');
    console.log(response);
    if (response.status == 'ok'){
      $scope.rules = response.rules;
      Rules.set(response.rules);
    }
  });

  $scope.remove = function(rule) {
    Rules.remove(rule);
  };
})
.controller('formController', function($scope, $ionicPopup, Rules) {

    $scope.showAlert = function(title, message) {
       var alertPopup = $ionicPopup.alert({
         title: title,
         template: message
       });

       alertPopup.then(function(res) {
         console.log('closing popup');
       });
     };

    // we will store all of our form data in this object
    $scope.ruleData = {};
    $scope.actions = [];
    $scope.conditions = [];
    $scope.condition = {};
    $scope.action = {};

    $scope.removeaction = function(action) {
      $scope.actions.splice($scope.actions.indexOf(action), 1);
    };

    $scope.removecond = function(condition) {
      $scope.conditions.splice($scope.conditions.indexOf(condition), 1);
    };

    $scope.showModalAddRule = function() {
      return true;
    };
    $scope.addaction = function(event) {
      //prevent form posting
      event.preventDefault();
      var errors = '';
      if ($scope.action.actiontype == 'sensorcmd'){
        var fields = ['sensorname', 'value'];
        for (var i = 0; i < fields.length; i++) {
          if($scope.action[fields[i]] == null){
            //alert('error ' + fields[i]);
            errors = fields[i];
          }
        }

      }else if ($scope.action.actiontype == 'emailcmd'){
        var fields = ['email', 'subject', 'content'];
        for (var i = 0; i < fields.length; i++) {
          if($scope.action[fields[i]] == null){
            //alert('error ' + fields[i]);
            errors = fields[i];
          }
        }

      }else{
        errors = 'please select an Action type';
      }
      if (errors == ''){
        $scope.actions.push($scope.action);
        $scope.showAlert('Action', 'Action successfully added');
        //alert('Action successfully added')
        $scope.action = {};

      }else{
        $scope.showAlert('Action', errors);
        //alert (errors);
      }

    };

    $scope.addcondition = function(event) {
      //prevent form posting
      event.preventDefault();
      var errors = '';
      if ($scope.condition.condtype == 'thresholdcond'){
        var fields = ['testtype', 'value', 'condtype'];
        for (var i = 0; i < fields.length; i++) {
          if($scope.condition[fields[i]] == null){
            //alert('error ' + fields[i]);
            errors = fields[i];
          }
        }
      }else if($scope.condition.condtype == 'timecond'){
        var fields = ['starttime', 'endtime'];
        for (var i = 0; i < fields.length; i++) {
          if($scope.condition[fields[i]] == null){
            //alert('error ' + fields[i]);
            errors = fields[i];
          }
        }

      }else{
        errors = 'please select a Condition type';
      }
      if (errors == ''){
        $scope.conditions.push($scope.condition);
        $scope.showAlert('Condition', 'Condition successfully added');        
        //alert('Condition successfully added')
        $scope.condition = {};

      }else{
        $scope.showAlert('Condition', errors);        
        //alert (errors);
      }

    };
    // function to process the form
    $scope.save = function(event) {
      event.preventDefault();
      var errors = '';
      if($scope.ruleData.description == null){
        errors = 'You must enter a description';
      }else if($scope.actions.length == 0){
        errors = 'You must add at least one action';
      }else if($scope.conditions.length == 0){
        errors = 'You must add at least one condition';
      }

      if (errors == ''){
        $scope.ruleData.actions = $scope.actions
        $scope.ruleData.conditions = $scope.conditions
        //$scope.conditions.push($scope.condition);
        $scope.showAlert('Rule', 'Rule successfully created');        
        
        //$scope.condition = {};

      }else{
        $scope.showAlert('Rule', errors);        
        //alert (errors);
      }

    };

})
.controller('RuleDetailCtrl', function($scope, $stateParams, Rules) {
  console.log('params: ' + $stateParams.ruleDescription);
  var rules = Rules.get($stateParams.ruleDescription);
  rules.sensors = [];
  rules.conditions.forEach( function(element, index, array){
    sensor = Rules.getconditionsensor(element.devid, element.instid, element.sid);
    rules.sensors.push(sensor);
    element.sensorname = sensor.metrics.title;
    //console.log(element);
  });
  console.log(rules);
  $scope.rule = rules;
});

