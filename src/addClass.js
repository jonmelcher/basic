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