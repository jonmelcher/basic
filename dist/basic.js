(function()
{
    ////////////////////////////////
    // Wetfish Basic
    // Core functionality

    // A constructor for public functions
    var public = function(selector)
    {
        if (!(this instanceof public))
        {
            return new public(selector)
        }

        // If the selector is a string
        if(typeof selector == "string")
        {
            // Try matching some elements on the page
            this.elements = document.querySelectorAll(selector);
        }
        else
        {
            // Assume an element was passed (like the value of this in an event)
            this.elements = [selector];
        }

        return this;
    }

    // An object literal for private functions
    var private =
    {
        forEach: function(array, callback)
        {
            for(var i = 0, l = array.length; i < l; i++)
            {
                callback.call(public, i, array[i]);
            }
        }
    };

    ////////////////////////////////
    // Check how basic should be exported

    // Detect if we're in node or a browser
    if(typeof module !== 'undefined' && module.exports)
    {
        // We're in node or a CommonJS compatable environment
        module.exports = public;
    }
    else
    {
        // We're in a browser, so put everything into global variables
        this.$ = public;
        this.basic = public;
    }

    ////////////////////////////////
    // addClass() - add a class to all matched nodes
    // usage - $('.selector').addClass('example');

    public.prototype.addClass = function(className)
    {
        private.forEach(this.elements, function(index, element)
        {
            var classes = element.className.split(' ');
            var index = classes.indexOf(className);

            // Only add a class if it doesn't exist
            if(index == -1)
            {
                classes.push(className);
                element.className = classes.join(' ');
            }
        });
                
        return this;
    }

    ////////////////////////////////
    // removeClass() - remove a class from all matched nodes
    // usage - if($('.selector').hasClass('example')) { console.log('wow!'); }

    public.prototype.hasClass = function(className)
    {
        var match = false;

        // TODO: Break loop when match is found?
        private.forEach(this.elements, function(index, element)
        {
            var classes = element.className.split(' ');
            var index = classes.indexOf(className);

            if(index != -1)
            {
                match = true;
            }
        });

        return match;
    }

    ////////////////////////////////
    // noConflict() - returns public class
    // usage - var customVar = basic.noConflict();

    public.prototype.noConflict = function()
    {
        return public;
    }

    ////////////////////////////////
    // off() - remove an event from all matched elements
    // usage - $('.selector').off('click', callback);

    public.prototype.off = function(event, callback)
    {
        private.forEach(this.elements, function(index, element)
        {
            element.removeEventListener(event, callback);
        });

        return this;
    }

    ////////////////////////////////
    // on() - bind an event to all matched elements
    // usage - $('.selector').on('click', function() { console.log('you clicked!'); });

    public.prototype.on = function(event, callback)
    {
        private.forEach(this.elements, function(index, element)
        {
            element.addEventListener(event, callback);
        });

        return this;
    }

    ////////////////////////////////
    // removeClass() - remove a class from all matched nodes
    // usage - $('.selector').removeClass('example');

    public.prototype.removeClass = function(className)
    {
        private.forEach(this.elements, function(index, element)
        {
            var classes = element.className.split(' ');
            var index = classes.indexOf(className);

            // Only remove a class if it exists
            if(index != -1)
            {
                classes.splice(index, 1);
                element.className = classes.join(' ');
            }
        });

        return this;
    }

    ////////////////////////////////
    // size() - get the size of a specific node or all matched nodes
    // usage - var size = $('.single-selector').size(); // Returns an object containing the element's height and width
    // usage - var size = $('.multi-selector').size(); // Returns an array of objects containing the height and width of all matched elements 

    // Private function to determine element height
    private.height = function(element)
    {
        var style = element.currentStyle || window.getComputedStyle(element);
        var height =
        {
            inner: element.offsetHeight,
            outer: element.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom)
        };

        return height;
    }

    // Private function to determine element width
    private.width = function(element)
    {
        var style = element.currentStyle || window.getComputedStyle(element);
        var width =
        {
            inner: element.offsetWidth,
            outer: element.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight)
        };

        return width;
    }

    // Public function which generates size objects
    public.prototype.size = function()
    {
        var output = [];

        private.forEach(this.elements, function(index, element)
        {
            var size =
            {
                height: private.height(element),
                width: private.width(element)
            };
            
            output.push(size);
        });

        // If we were only checking the size of one element
        if(output.length == 1)
        {
            // Return only that element's size
            return output[0];
        }

        // Otherwise, return an array of sizes
        return output;
    }
})();