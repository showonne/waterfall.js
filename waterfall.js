;(function($, window, document, undefined){

    var defaults = {

    }

    $.fn.WaterFall = function(options){

        var $container = this,
            children = $('.grid')

        var _options = $.extend({}, defaults, options)

        function _init(){

            console.log('init@')

            var containerWidth = $container.width(),
                gridWidth = children.eq(0).outerWidth(true),
                columns = Math.floor( containerWidth / gridWidth )
            
            var leftSpace = containerWidth - gridWidth * columns

            var offsetArray = [], leftArray = []

            console.log('containerWidth is:', containerWidth, ', gridWidth is :', gridWidth, 'columns is :', columns)

            children.each(function(index, item){

                var _height = children.eq(index).outerHeight(true)

                if(index < columns){
                    $(item).css({
                        'position': 'absolute',
                        'left': index * gridWidth + leftSpace / 2,
                        'top': children.eq(0).css('margin-top')
                    })

                    offsetArray[index] = _height
                    leftArray[index] = index * gridWidth + leftSpace / 2

                }else{

                    var minHeight = Math.min.apply(Math, offsetArray),
                        minIndex = $.inArray(minHeight, offsetArray)

                    $(item).css({
                        'position': 'absolute',
                        'top': minHeight,
                        'left': leftArray[minIndex]
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