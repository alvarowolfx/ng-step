(function(){
    angular
        .module('ngStep', [])
        .directive('ngStep', ngStep);

    function ngStep() {
        var directive = {
            restrict: 'E',
            template:
                "<div class='steps-container'>" +
                "<a class='step-item' ng-repeat='step in config.steps' " +
                " ng-class=\"{ 'active step-animation' : $index == config.currentStep }\" " +
                " ng-click='goToStep($index)'> " +
                " {{step}} " +
                "</a> " +
                "</div>",
            scope: {
                config: '='
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            scope.goToStep = goToStep;
            var currentStepWatch = scope.$watch('config.currentStep', currentStepWatchHandler);

            element.on('$destroy', function () {
                currentStepWatch();
            });

            function currentStepWatchHandler(newValue, oldValue) {
                var size = scope.config.steps.length - 1;
                if (newValue > size || newValue < 0) {
                    scope.config.currentStep = oldValue;
                }
            }

            function goToStep(stepIndex) {
                scope.config.currentStep = stepIndex;
            }
        }

    }
})();