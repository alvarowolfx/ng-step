(function(){
    var app = angular.module('app', ['ngStep']);

    app.controller('StepController', StepController);

    function StepController() {
        var vm = this;

        vm.forward = forward;
        vm.back = back;
        vm.stepConfig = {
            steps: [1, 2, 3, 4, 5, 6, 'End'],
            currentStep: 0
        };

        function back() {
            vm.stepConfig.currentStep--;
        }

        function forward() {
            vm.stepConfig.currentStep++;
        }
    }
})();