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
.controller('formController', function($scope, Rules) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.actions = [];
    $scope.conditions = [];
    $scope.condition = {};

    $scope.showModalAddRule = function() {
    };
    $scope.addcondition = function() {
      //console.log($scope.condition)
      var errors = '';
      if ($scope.condition.condtype == 'thresholdcond'){
        var fields = ['testtype', 'value', 'condtype'];
        for (var i = 0; i < fields.length; i++) {
          if($scope.condition[fields[i]] == null){
            alert('error ' + fields[i]);
            errors = errors + ' ' + fields[i];
          }
        }
      }
      if(errors != ''){
        $scope.conditions.push($scope.condition);
      }

    };
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');
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

