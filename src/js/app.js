(function($){
	// requires parent container to have absolute or relative positioning and overflow:hidden
  function fitImage($container) {
    $container.imageFill();
  }

  // create a timeline
  var tl = new TimelineMax();
  var winWidth = window.innerWidth,
  winHeight = window.innerHeight;


  // ---------------------------------------
  // Add animation for each step
  // ---------------------------------------

  var i;

  // INTRO (plays automatically, pauses at end)
  // $('#title-slide h1').lettering();
  var intro = new TimelineMax();
  intro.add(TweenMax.to($('#slide-title'),0,{immediateRender:false,css:{display:'block'}}));
  intro.add(TweenMax.from($('#kickass'), 1, {css:{top: (-600)}, ease: Ease.easeOut}),.5);
  intro.add(TweenMax.from($('#slide-title h1'), 1, {css:{top: (-600)}, ease: Ease.easeOut}),.5);
  // $('#title-slide h1 span').css({position:'relative'}).each(function() {
  //   intro.add(TweenMax.from(this, 2, {css:{top: Math.random()*200+600, left: (Math.random()*winWidth)-500, rotation:Math.random()*720-360}, ease:Back.easeOut}),1.25);
  // });
  intro.add(TweenMax.from($('#slide-title').find('.author,.d3-logo'), 1, {css: {position:'relative', top: winHeight + 200}, opacity:0}),.5);

  tl.add(intro);

  var slideAgenda = new TimelineMax();
  var agendaSlide = $('#slide-agenda');
  slideAgenda.add(TweenMax.to($('#slide-title .d3-logo-wrapper'), 0.5, {opacity:0}));
  slideAgenda.add(TweenMax.to($('#slide-title h1'), 0.5, {opacity:0, ease: Ease.easeOut}),.5);
  slideAgenda.add(TweenMax.to($('#slide-title .kickass'), 1, {scale: 7, left: winWidth/2, transformOrigin: '30% 10%', opacity: 0, ease: Ease.easeIn}),.5);
  slideAgenda.add(TweenMax.to($('#slide-title'),0,{immediateRender:false,css:{display:'none'}}));
  // new elements
  slideAgenda.add(TweenMax.to(agendaSlide,0,{immediateRender:false,css:{display:'block'}}),1);
  slideAgenda.add(TweenMax.fromTo(agendaSlide.find('header'), 1, {opacity:0 }, {opacity:1, ease: Ease.easeIn}));


  var slideAgenda2 = new TimelineMax();
  slideAgenda2.add(TweenMax.fromTo(agendaSlide.find('ul'), 1, {opacity:0 }, {opacity:1, ease: Ease.easeIn}));
  // slideAgenda.add(TweenMax.to(agendaSlide.find('ul'), 0.5, {opacity:1, ease: Ease.easeIn}));

  // ntro.add(TweenMax.fromTo($('body'),0.5,{backgroundColor:'#fff'},{delay:0.5,backgroundColor:'#99cee2'}));

  tl.add(slideAgenda);
  tl.add(slideAgenda2);


  // send the timeline into TweenDeck - DONE!
  var deck = $.tweendeck(tl);

  // add scroll event control via jQuery mousewheel - https://github.com/brandonaaron/jquery-mousewheel#readme
  var mwThrottle = false;
  // $('body').mousewheel(function(event, delta, deltaX, deltaY) {
  //   if (!mwThrottle) {
  //     setTimeout(function() { mwThrottle = false; }, 1000);
  //     mwThrottle = true;
  //     if (delta > 0) {
  //       deck.prev();
  //     } else {
  //       deck.next();
  //     }
  //   }
  // });

  $('#btn-prev').on('click',function() {
    deck.prev();
  });
  $('#btn-next').on('click',function() {
    deck.next();
  });



})(jQuery);