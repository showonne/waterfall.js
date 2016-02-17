;(function($, window, document, undefined){

    var default_options = {

    }

    $.fn.WaterFall = function(options){

        var $container = this

        var _options = $.extend({}, default_options, options)

        var isRendering = false

        function _init(){

            containerWidth = $container.width()

            var children = $('.grid')

            var gridWidth = children.eq(0).outerWidth(true)
            
            var columns = Math.floor( containerWidth / gridWidth )
            
            var leftSpace = containerWidth - gridWidth * columns

            var offsetArray = []

            children.each(function(index, item){

                var _height = children.eq(index).outerHeight(true)

                if(index < columns){
                    $(item).css({
                        'position': 'absolute',
                        'left': index * gridWidth + leftSpace / 2,
                        'top': children.eq(0).css('margin-top')
                    })
                    offsetArray[index] = _height
                }else{

                    var minHeight = Math.min.apply(Math, offsetArray),
                        minIndex = $.inArray(minHeight, offsetArray)
                    $(item).css({
                        'position': 'absolute',
                        'top': minHeight,
                        'left': children.eq(minIndex).position().left
                    })

                    offsetArray[minIndex] += _height

                }

            })
        }

        _init()

        var timer

        $(window).resize(function(){
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(function(){
                _init()
            }, 300)
        })

    }


})(jQuery, window, document)