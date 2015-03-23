/**
 * @license angular-svg-radial v0.1.1
 * (c) 2015 Vokal LLC https://github.com/vokal/angular-svg-radial
 * License: MIT
 */
angular.module( "svgRadial", [] )
    .directive( "radialProgress", function ()
    {
        "use strict";

        return {
            restrict: "E",
            transclude: true,
            replace: true,
            template: "templates/radialProgress.html",
            link: function ( scope, element, attrs )
            {
                var setRotation = function ( selector, numVal )
                {
                    var cssObj = {
                        "-ms-transform": "rotate( " + numVal + "deg )",
                        "-webkit-transform": "rotate( " + numVal + "deg )",
                        "-moz-transform": "rotate( " + numVal + "deg )",
                        "transform": "rotate( " + numVal + "deg )"
                    };
                    element.find( selector ).css( cssObj );
                };
                var setStyle = function ( percent )
                {
                    var angle1, angle2;
                    //get the angle of rotation
                    angle1 = angle2 = 360 * percent / 100;
                    //make sure that the first piece doesn't rotate too far
                    angle1 = Math.min( 180, angle1 );
                    //this next line is to prevent bugs if the entered percentage is over 100
                    angle2 = Math.min( 360, angle2 );

                    setRotation( ".piece:first-child", angle1 );
                    setRotation( ".piece:last-child", angle2 );

                    element.find( ".radial" ).toggleClass( "gtFifty", ( percent > 50 ) );
                };

                setStyle( attrs.percent );

                attrs.$observe( "percent", setStyle );
            }
        };
    } );
