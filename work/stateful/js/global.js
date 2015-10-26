$(function(){
    var checkboxes = $('input:checkbox');
    var triggers = $('[data-toggle-class]');  
    triggerToggles(triggers);
    setCheckboxes(checkboxes);
    /*=======================================
    super snazzy css-animations on header ;)
    (toggle turns them on and off constantly, 
    so used addClass and removeClass instead)
    ========================================*/
    var gh = $("#ghostHeader");  
    $(window).scroll(function() {
        if ($(window).scrollTop() > 45) {
            gh.addClass("collapse");
            gh.removeClass("grow");
        }   else {
            gh.removeClass("collapse");
            gh.addClass("grow");
        }
    });
});


/*==============================================================================================================================
the event.preventDefault() was causing a problem with elements that should change their own state by default (e.g. checkboxes). 
if an element should both 1) trigger a state change of some other element, and 2) follow through with their default behavior, 
event.preventDefault() has to be bypassed.
my solution for right now is to implement a class - "defaultOK" - which keeps default behavior intact.
===============================================================================================================================*/
function triggerToggles(triggers) {
    $.each(triggers, function(index, trigger){
        var trigger   = $(trigger);
        var element   = $('.' + trigger.data('toggle-element'));
        var eventName = (trigger.data('toggle-event')) ? trigger.data('toggle-event') : 'click';
        var className = trigger.data('toggle-class');
        className = (className.length) ? className : 'on';
        trigger.on(eventName, function(event){
            if (!$(this).hasClass("defaultOK"))
            {
                event.preventDefault();
            }
            if (!element.length) trigger.toggleClass(className); // don't toggleClass on the trigger if it has a toggle-element
            if (element.length) element.toggleClass(className);  
        });
    });
};

/*=====================================================================
every time page is loaded, reset vehicle-type checkboxes to checked
======================================================================*/
function setCheckboxes(checkboxes) {
    $.each(checkboxes, function() {
        $(this).prop("checked", "yes");
    });
}

