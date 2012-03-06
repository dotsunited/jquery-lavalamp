/*!
 * jQuery Lavalamp Plugin
 * https://github.com/dotsunited/.de/jquery-lavalamp
 *
 * Copyright 2012, Dots United GmbH
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * or GPL Version 2 (http://www.opensource.org/licenses/gpl-2.0.php) licenses.
 */
;(function($, window) {
    var Lavalamp = function(element, options) {
        if (!this._init) {
            return new Lavalamp(element, options);
        }

        this.element = $(element).data('lavalamp', this).addClass('lavalamp');
        this.options = $.extend({}, this.options, options);

        this._init();
    };

    Lavalamp.prototype = {
        options: {
            current: '.current',
            items: '>li',
            bubble: '<li class="lavalamp-bubble"></li>',
            animation: 500
        },
        element: null,
        current: null,
        items: null,
        bubble: null,
        _bubbleAppended: false,
        _init: function() {
            var resizeTimer,
                self = this;

            this.onWindowResize = function() {
                if (resizeTimer) {
                    clearTimeout(resizeTimer);
                }

                resizeTimer = setTimeout(function() {
                    self._position();
                }, 100);
            };

            $(window).bind('resize.lavalamp', this.onWindowResize);

            this.reload();
        },
        reload: function() {
            if (this.bubble && this._bubbleAppended) {
                this.bubble.remove();
            }

            this.bubble  = $.isFunction(this.options.items)
                               ? this.options.bubble.call(this.element)
                               : $(this.options.bubble);
            this.items   = $.isFunction(this.options.items)
                               ? this.options.items.call(this.element)
                               : this.element.find(this.options.items);
            this.current = $.isFunction(this.options.current)
                               ? this.options.current.call(this.element)
                               : this.element.find(this.options.current);

            if (this.current.size() === 0) {
                this.current = this.items.eq(0);
            }

            this._position();
            
            if (this.element.find(this.bubble).size() === 0) {
                this._bubbleAppended = true;
                this.element.prepend(this.bubble);
            }

            var self = this;

            this.items
                .not(this.bubble)
                .unbind('.lavalamp')
                .bind('mouseover.lavalamp', function() {
                    if (self.current.index(this) >= 0) {
                        return;
                    }

                    self.current.trigger('lavalampblur');
                    self._move($(this));
                });

            this.element
                .unbind('.lavalamp')
                .bind('mouseout.lavalamp', function() {
                    self.current.trigger('lavalampfocus');
                    self._move(self.current);
                });
        },
        destroy: function() {
            if (this._bubbleAppended) {
                this.bubble.remove();
            }

            this.items.unbind('.lavalamp');
            this.element.unbind('.lavalamp');
            $(window).unbind('resize.lavalamp', this.onWindowResize);
        },
        _position: function() {
            this.bubble.css({
                left:  this.current.position().left + 'px',
                width: this.current.width()- (this.bubble.outerWidth(true) - this.bubble.innerWidth()) + 'px'
            });
        },
        _move: function(el) {
            var properties = {
                left:  el.position().left + 'px',
                width: el.width() - (this.bubble.outerWidth(true) - this.bubble.innerWidth()) + 'px'
            };

            if (!this.options.animation) {
                this.bubble.css(properties);
            } else {
                if ($.isFunction(this.options.animation)) {
                    this.options.animation.call(this, properties);
                } else {
                    var options = typeof this.options.animation === 'object'
                                      ? this.options.animation
                                      : {duration: this.options.animation};

                    this.bubble.stop(true, false).animate(properties, options);
                }
            }
        }
    };

    $.fn.lavalamp = function(options) {
        if (typeof options === 'string') {
            var instance = $(this).data('lavalamp');
            return instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
        } else {
            return this.each(function() {
                var instance = $(this).data('lavalamp');

                if (instance) {
                    $.extend(instance.options, options || {});
                    instance.reload();
                } else {
                    Lavalamp(this, options);
                }
            });
        }
    };
})(jQuery, window);
