//when the dom is ready...
window.addEvent('domready',function() {
	
	document.ondragstart = function () { return false; }; //IE drag hack
	
	//for every dragable image...
	$$('.dragable').each(function(drag) {
		
		//make it dragable, and set the destination divs
		new Drag.Move(drag, { 
			droppables: '.droppable',
			onDrop: function(el,droppable) {
				if(droppable.get('rel') != 'filled')
				{
					//inject into current parent
					el.inject(droppable).addClass('locked');
					el.setStyles({'left':0,'top':0,'position':'relative','margin':0}); //hack -- wtf?
					droppable.set('rel','filled');
					this.detach();
				}
			},
			onEnter: function(el,droppable) {
				//colors!
				droppable.addClass('mo');
			},
			onLeave: function(el,droppable) {
				droppable.removeClass('mo');
			}
		});
		
		drag.setStyles({ 'top':0, 'left':0, 'margin-right':'20px' });
		
	});
});