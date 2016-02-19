;(function($, window, document, undefined){

    var defaults = {
        animate: {
            open: false,
            type: 'ease',
            duration: 500
        }
    }

    $.fn.WaterFall = function(options){

        if(Object.prototype.toString.call(options) !== "[object Object]"){
            throw new Error('options should be a object.')
        }

        var $container = this,
            children = $('.grid')

        var _options = $.extend({}, defaults, options)

        function _init(){
            children.each(function(index, item){
                $(item).css('position', 'absolute')
            })
        }

        function _layout(){

            var containerWidth = $container.width(),
                gridWidth = children.eq(0).outerWidth(true),
                columns = Math.floor( containerWidth / gridWidth )
            
            var leftSpace = containerWidth - gridWidth * columns

            var offsetArray = [], leftArray = []

            children.each(function(index, item){

                var _height = children.eq(index).outerHeight(true)

                if(index < columns){
                    if(_options.animate.open){
                        $(item).animate({
                            'left': index * gridWidth + leftSpace / 2,
                            'top': children.eq(0).css('margin-top')
                        }, options.animate.duration)
                    }else{
                        $(item).css({
                            'left': index * gridWidth + leftSpace / 2,
                            'top': children.eq(0).css('margin-top')
                        })
                    }
                

                    offsetArray[index] = _height
                    leftArray[index] = index * gridWidth + leftSpace / 2

                }else{

                    var minHeight = Math.min.apply(Math, offsetArray),
                        minIndex = $.inArray(minHeight, offsetArray)

                    if(_options.animate.open){
                        $(item).animate({
                            'top': minHeight,
                            'left': leftArray[minIndex]
                        }, options.animate.duration)
                    }else{
                        $(item).css({
                            'top': minHeight,
                            'left': leftArray[minIndex]
                        })
                    }

                    offsetArray[minIndex] += _height

                }

            })
        }

        _init()
        _layout()

        var timer

        $(window).resize(function(){
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(function(){
                _layout()
            }, 300)
        })

    }


})(jQuery, window, document)