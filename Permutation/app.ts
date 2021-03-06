﻿/// <reference path="jquery.d.ts" />

angular.module('textInputExample', [])
    .controller('ExampleController', ['$scope', function ($scope) {
        $scope.nineDigits = '';
        
    }])
    .directive('myOutput', () => {
        return {
            restrict: 'EA',
            link: function (scope, elm, attrs) {

                var numValues = {
                    '1': "1",
                    '2': "ABC",
                    '3': "DEF",
                    '4': "GHI",
                    '5': "JKL",
                    '6': "MNO",
                    '7': "PQRS",
                    '8': "TUV",
                    '9': "WXYZ",
                    '*': "",
                    '0': "0",
                    '#': ""
                };
                var backgroundColorValues = [
                    'd82323',
                    '3023d8',
                    '050318',
                    '92a82d',
                    'f7f9eb',
                    '60615c',
                    '3b413a',
                    'a5716e',
                    'de59ea',
                    'e2d9e3',
                    '00ff4e',
                    '040257'
                ];
                scope.phone = numValues;
                scope.getKeyDown = function (event, key, value) {
                    console.log(event.target);
                    console.log(event.currentTarget);
                    if (this.value != '' && scope.nineDigits.length <= 8) {
                        console.log(this.value);
                        var randomColor = backgroundColorValues[Math.floor(Math.random() * backgroundColorValues.length)];
                        var _ = event.currentTarget;

                        (function (_) {
                            setTimeout(function () {
                                $(_).css({
                                'background-color':'#'+randomColor});
                            }, Math.floor(100));
                            setTimeout(function () {
                                $(_).css({
                                    'background-color': ''
                                });
                            }, Math.floor(300)); 
                        })(_);

                        scope.nineDigits += this.key; 
                    }
                    
                };

                function permute(input) {

                    var permute = [],
                        numbers = input,
                        results;

                    //assign numbers to alphabet values if avaiable.
                    for (var i = 0; i < numbers.length; i++) {
                        if (numbers[i] in numValues) {
                            permute[i] = numValues[numbers[i]].split('');
                        } else {
                            permute[i] = numbers[i].split('');
                        }
                    }
                    function casesPossible(arr) {
                        if (arr.length == 0) {
                            return [];
                        } else if (arr.length == 1) {
                            return arr[0];
                        } else {
                            var results = [];
                            var allCasesOfRest = casesPossible(arr.slice(1));
                            for (var i = 0; i < allCasesOfRest.length; i++) {
                                for (var j = 0; j < arr[0].length; j++) {
                                    results.push(arr[0][j] + allCasesOfRest[i]);
                                }
                            }
                            return results;
                        }
                    }
                    results = casesPossible(permute);
                    $('.arryCounter').html(results.length);
                    $('.arrayPermutation').html(JSON.stringify(permute));
                    $('.combResults').html(JSON.stringify(results));
                } // End permute function
                scope.$watch(function (value) {
                    console.log("keypress : " + value.nineDigits);
                    console.log('scope    : ' + scope.nineDigits);
                    if (value.nineDigits != undefined) {
                        var angInput = scope.nineDigits.split("");
                        permute(angInput);
                    } 
                    else {
                        console.log('else');
                        
                    }
                })
            } //End
        };
    })
    .filter('tel', function () {
        return function (tel) {
            //console.log(tel);
            if (!tel) {
                return '';
            }
            var value = tel.toString().trim().replace(/^\+/, '');
            if (value.match(/[^0-9]/)) {
                return tel;
            }
            var country, city, number;
            switch (value.length) {
                case 1:
                case 2:
                case 3:
                    city = value;
                    break;
                default:
                    city = value.slice(0, 3);
                    number = value.slice(3);
            }
            if (number) {
                if (number.length > 3) {
                    number = number.slice(0, 3) + '-' + number.slice(3, 7);
                } else {
                    number = number;
                }
                return ("(" + city + ") " + number).trim();
            } else {
                return "(" + city;
            }
        };
    });