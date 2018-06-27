'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleAnalytics = function () {
	function GoogleAnalytics() {
		_classCallCheck(this, GoogleAnalytics);

		this.id = 'UA-XXXXXX-X';
	}

	_createClass(GoogleAnalytics, [{
		key: 'init',
		value: function init() {
			console.info('Initing Google Analytics with ID: ' + this.id);
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', this.id);
		}
	}]);

	return GoogleAnalytics;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scrollAnimations = function () {
    function scrollAnimations() {
        _classCallCheck(this, scrollAnimations);

        // animations
        // these are where your elements should start the animation
        this.fadeIn = { opacity: 0 };
        this.fadeUp = { opacity: 0, y: 30 };
        this.fadeDown = { opacity: 0, y: -30 };
        this.fadeLeft = { opacity: 0, x: 30 };
        this.fadeLeftLg = { opacity: 0, x: 50 };
        this.fadeRight = { opacity: 0, x: -30 };
        this.fadeRightLg = { opacity: 0, x: -50 };

        this.mobile = 560;
    }

    _createClass(scrollAnimations, [{
        key: 'init',
        value: function init() {
            console.log('scroll init');
            this.initScroll();
        }

        /*
        Scroll Classes - to set on animating elements
        ---------------------------------------------
              scroll-animation = class - REQUIRED - (if using stagger put this on the parent container otherwise it goes on the element)
              rotate-animation = class - use when animating rotation
        stagger         = class - use when you want to stagger the elements inside the same container - put this on the container w/ the scrollAnimation class
        stagger-element      = class - used on individual stagger element (Required for stagger animations)
        overlay-stagger  = class - used if staggering in images with the overlay (uses different timeline)
        	Data Objects - to set on animating element
        -------------------------------------------
        data-scroll-animation = data object to use for the animation - beginning styles are set in css for now
        options:
            // TODO: make these used in the js
            // update these if need to per project
        	fadeIn        - simple opacity from 0 to 1 (default)
        	fadeUp        - simple opacity fade in and up (in to place)
        	fadeLeft      - simple opacity fade in and to the left
        	fadeRight     - simple opacity in and to the right
        	overlayReveal - used for image overlays
        		data-scroll-duration  = time of animation
        	data-scroll-delay     = delay before animation starts
        	data-stagger-duration = delay between stagger elements
        	data-scroll-trigger   = where the animation should start
        	data-trigger-hook     = where the trigger hook should start (see scroll magic docs)
        	data-scroll-ease      = easing of animation - see gsap easing docs
        */

    }, {
        key: 'initScroll',
        value: function initScroll() {
            var c = this;
            var controller = new ScrollMagic.Controller();

            $('.scroll-animation').each(function () {
                // set duration
                var duration = $(this).data('scroll-duration') ? $(this).data('scroll-duration') : 1;

                // delay option
                var delay = $(this).data('scroll-delay') ? $(this).data('scroll-delay') : 0;

                // set trigger element
                var trigger = $(this).data('scroll-trigger') ? $(this).data('scroll-trigger') : this;

                // stagger duration
                var staggerDuration = $(this).data('stagger-duration') ? $(this).data('stagger-duration') : 0.1;

                // easing
                var scrollEase = $(this).data('scroll-ease') ? $(this).data('scroll-ease') : 'Power4.easeOut';

                // rotation
                var scrollRotation = $(this).data('rotation') ? $(this).data('rotation') : 0;

                // trigger hook
                var hook = $(this).data('trigger-hook') ? $(this).data('trigger-hook') : 0.5;

                // set proper animation variable
                var animation = $(this).data('scroll-animation') ? $(this).data('scroll-animation') : 'fadeIn';
                // TODO: see if there's a better way to check for stagger instead of multiple if statements

                if ($(this).hasClass('stagger')) {
                    // Set the small scroll animation if it exists
                    if ($(window).width() < this.mobile && $(this).find('.stagger-element').attr('data-scroll-animation-sm')) {
                        animation = $(this).data('scroll-animation-sm') ? $(this).data('scroll-animation-sm') : 'fadeIn';
                    } else {
                        animation = $(this).find('.stagger-element').data('scroll-animation') ? $(this).find('.stagger-element').data('scroll-animation') : 'fadeIn';
                    }
                } else {
                    // Set the small scroll animation if it exists
                    if ($(window).width() < this.mobile && $(this).attr('data-scroll-animation-sm')) {
                        animation = $(this).data('scroll-animation-sm') ? $(this).data('scroll-animation-sm') : 'fadeIn';
                    } else {
                        animation = $(this).data('scroll-animation') ? $(this).data('scroll-animation') : 'fadeIn';
                    }
                }

                // set starting position based on global animation constructors
                if ($(this).hasClass('stagger')) {
                    TweenMax.set($(this).find('.stagger-element'), c[animation]);
                } else {
                    TweenMax.set($(this), c[animation]);
                }

                // create tweens - stagger or not
                // always animate to 'end state'
                var tween = new TimelineMax();

                if ($(this).hasClass('stagger')) {
                    tween.staggerTo($(this).find('.stagger-element'), duration, { opacity: 1, x: 0, y: 0, ease: scrollEase, delay: delay }, staggerDuration);
                } else {
                    tween.to($(this), duration, { opacity: 1, x: 0, y: 0, ease: scrollEase, delay: delay });
                }

                // create scroll magic scene
                var scene = new ScrollMagic.Scene({
                    triggerElement: trigger,
                    triggerHook: hook,
                    reverse: false
                });

                scene.setTween(tween).addTo(controller).addIndicators().setClassToggle($(this)[0], 'animated');
            });
        }
    }]);

    return scrollAnimations;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Global = function () {
	function Global() {
		_classCallCheck(this, Global);

		this.ga = new GoogleAnalytics();
		this.sa = new scrollAnimations();
	}

	_createClass(Global, [{
		key: "init",
		value: function init() {
			this.ga.init();
			this.sa.init();
		}
	}]);

	return Global;
}();

var global = new Global();
global.init();
//# sourceMappingURL=bundle.js.map
