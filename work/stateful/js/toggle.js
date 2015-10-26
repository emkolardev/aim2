$(function(){
  var triggers = $('[data-toggle-class]');

  $.each(triggers, function(index, trigger){
    var trigger   = $(trigger);
    var element   = $('.' + trigger.data('toggle-element'));
    var eventName = (trigger.data('toggle-event')) ? trigger.data('toggle-event') : 'click';
    var className = trigger.data('toggle-class');

    className = (className.length) ? className : 'on';

    trigger.on(eventName, function(event){
        event.preventDefault();
        if (trigger.length) trigger.toggleClass(className);
        if (element.length) element.toggleClass(className);  
    });
  });
});
