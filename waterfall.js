;(function($, window, document, undefined){

    var default_options = {

    }

    $.fn.WaterFall = function(options){

        var $container = this

        var _options = $.extend({}, default_options, options)


        var _init = function(){

            containerWidth = $container.width()

            console.log('container\'s width is', containerWidth)

            var children = $('.grid')

            var gridWidth = children.eq(0).width() + parseInt(children.eq(0).css('margin-left'))
                             + parseInt(children.eq(0).css('margin-right')) + parseInt(children.eq(0).css('padding-left'))
                             + parseInt(children.eq(0).css('padding-right'))
            
            var columns = Math.floor( containerWidth / gridWidth )
            
            var leftSpace = containerWidth - gridWidth * columns

            var offsetArray = []

            console.log(columns)

            children.each(function(index, item){

                var _height = children.eq(index).height() + parseInt(children.eq(index).css('margin-top'))
                             + parseInt(children.eq(index).css('margin-bottom')) + parseInt(children.eq(index).css('padding-top'))
                             + parseInt(children.eq(index).css('padding-bottom'))

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
                    console.log(minIndex)
                    $(item).css({
                        'position': 'absolute',
                        'top': minHeight,
                        'left': children.eq(minIndex).position().left
                    })

                    offsetArray[minIndex] += _height

                }
                console.log(offsetArray)
            })
        }

        _init()

        $(window).resize(function(){
            _init()
        })

    }


})(jQuery, window, document)