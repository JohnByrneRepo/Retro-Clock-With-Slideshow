$(document).ready( function() {

	var updateTime = function() {
		var d = new Date();
		var s = zeroFill(d.getHours(), 2) + ':' + zeroFill(d.getMinutes(), 2) + ':' + zeroFill(d.getSeconds(), 2);
		$('.retroClock-input').val(s).trigger('change');
	};

	updateTime();
	setInterval(updateTime, 1000);
	retroClock.init('.retroClock', '.retroClock-input');

});


/* RetroClock - by Script.ist (http://script.ist/demo/clock) */
retroClock = {};
retroClock.src = $('');
retroClock.clock = $('');
retroClock.init = function(clock, src) {
	retroClock.clock = clock = $(clock);
	retroClock.src = src = $(src);
	clock.html('<div class="gc-top"> \
					<div><span></span></div> \
					<div><span></span></div> \
					<div><span></span></div> \
				</div> \
				<div class="gc-bottom"> \
					<div><span></span></div> \
					<div><span></span></div> \
					<div><span></span></div> \
				</div>');
	retroClock.update(true);
	src.change( retroClock.update );
}
retroClock.update = function(instant) {
	clock = retroClock.clock;
	src = retroClock.src;
	v = src.val();
	a = v.split(':');
	var i = 0;
	clock.children('.gc-top').children().each( function() {
		if ($(this).text() != a[i])
			retroClock.change(i, a[i], (instant === true));
		i++;
	});
}
retroClock.change = function(i, v, instant) {
	var f1 = clock.children('.gc-top').children(':not(.gc-anim)').slice(i, i+1);
	var f2 = clock.children('.gc-bottom').children(':not(.gc-anim)').slice(i, i+1);
	if (instant) {
		f1.children().text(v);
		f2.children().text(v);
		return;
	}
	var f1a = f1.clone();
	f1a.css(f1.getStyleObject()).css({
		left:f1.position().left,
		'z-index':100,
		'transform-origin':'bottom'
	}).addClass('gc-anim');
	f1.after(f1a);
	f1.children().text(v);
	f1a.transition(
		{
			perspective: '100px',
			rotateX: '-90deg',
			'background':'#2a2a2a'
		}, 
		300, 
		'in', 
		function() {
			f1a.remove();
			var f2a = f2.clone();
			f2a.css(f2.getStyleObject()).css({
				left:f2.position().left,
				'z-index':100,
				'transform-origin':'top',
				rotateX: '90deg',
			}).addClass('gc-anim')
			.children().text(v);
			f2.after(f2a);
			f2a.transition(
				{
					perspective: '100px',
					rotateX: '0deg'
				}, 300, 'out', function() {
					f2.children().text(v);
					f2a.remove();
				}
			);
		}
	);
}

$.fn.getStyleObject = function(){
    var dom = this.get(0);
    var style;
    var returns = {};
    if(window.getComputedStyle){
        var camelize = function(a,b){
            return b.toUpperCase();
        };
        style = window.getComputedStyle(dom, null);
        for(var i = 0, l = style.length; i < l; i++){
            var prop = style[i];
            var camel = prop.replace(/\-([a-z])/g, camelize);
            var val = style.getPropertyValue(prop);
            returns[camel] = val;
        };
        return returns;
    };
    if(style = dom.currentStyle){
        for(var prop in style){
            returns[prop] = style[prop];
        };
        return returns;
    };
    if(style = dom.style){
      for(var prop in style){
        if(typeof style[prop] != 'function'){
          returns[prop] = style[prop];
        };
      };
      return returns;
    };
    return returns;
}

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}