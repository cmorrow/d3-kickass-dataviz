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
  var slideTitleEl = $('#slide-title');
  intro.add(TweenMax.to(slideTitleEl,0,{immediateRender:false,css:{display:'block'}}));
  intro.add(TweenMax.from($('#kickass'), 1, {css:{top: (-600)}, ease: Ease.easeOut}),.5);
  intro.add(TweenMax.from(slideTitleEl.find('h1'), 1, {css:{top: (-600)}, ease: Ease.easeOut}),.5);
  // $('#title-slide h1 span').css({position:'relative'}).each(function() {
  //   intro.add(TweenMax.from(this, 2, {css:{top: Math.random()*200+600, left: (Math.random()*winWidth)-500, rotation:Math.random()*720-360}, ease:Back.easeOut}),1.25);
  // });
  intro.add(TweenMax.from(slideTitleEl.find('.author,.d3-logo'), 1, {css: {position:'relative', top: winHeight + 200}, opacity:0}),.5);

  tl.add(intro);

  var slideWhat = new TimelineMax();
  var slideWhatEl = $('#slide-what');
  slideWhat.add(TweenMax.to(slideTitleEl.find('.d3-logo-wrapper'), 0.5, {opacity:0}));
  slideWhat.add(TweenMax.to(slideTitleEl.find('h1'), 0.5, {opacity:0, ease: Ease.easeOut}),.5);
  slideWhat.add(TweenMax.to(slideTitleEl.find('.kickass'), 1, {scale: 7, left: winWidth/2, transformOrigin: '30% 10%', opacity: 0, ease: Ease.easeIn}),.5);
  slideWhat.add(TweenMax.to(slideTitleEl,0,{immediateRender:false,css:{display:'none'}}));
  // new elements
  slideWhat.add(TweenMax.to(slideWhatEl,0,{immediateRender:false,css:{display:'block'}}),1);
  slideWhat.add(TweenMax.fromTo(slideWhatEl.find('header'), 1, {opacity:0 }, {opacity:1, ease: Ease.easeIn}));

  tl.add(slideWhat);


  var slideWhat2 = new TimelineMax();

  slideWhat2.add(TweenMax.fromTo(slideWhatEl.find('ul'), 1, {opacity:0 }, {opacity:1, ease: Ease.easeOut}));
  slideWhat2.add(TweenMax.from(slideWhatEl.find('li:first-child'), 1, {left: winWidth, ease: Ease.easeOut}));

  tl.add(slideWhat2);

  var whatItems = [];
  slideWhatEl.find('li').not(':first-child').css({position:'relative'}).each(function(i) {
    whatItems[i] = new TimelineMax();
    whatItems[i].add(TweenMax.from(this, 1, {left: winWidth, ease: Ease.easeOut}));
    tl.add(whatItems[i]);
  });

  // slideAgenda.add(TweenMax.to(agendaSlide.find('ul'), 0.5, {opacity:1, ease: Ease.easeIn}));

  // ntro.add(TweenMax.fromTo($('body'),0.5,{backgroundColor:'#fff'},{delay:0.5,backgroundColor:'#99cee2'}));

  var slideConcepts = new TimelineMax();
  var slideConceptsEl = $('#slide-concepts');

  slideConcepts.add(TweenMax.to(slideConceptsEl,0,{immediateRender:false,css:{display:'block'}}));
  slideConcepts.add(TweenMax.staggerTo(slideWhatEl.find('.step'), 1, {css:{position:'relative'}, left: -winWidth, opacity: 1, ease: Ease.easeIn}, .25));
  slideConcepts.add(TweenMax.to(slideWhatEl,0,{immediateRender:false,css:{display:'none'}}));
  // new
  slideConcepts.add(TweenMax.from(slideConceptsEl, 1, {left: winWidth, ease: Ease.easeOut}));
  // slideWhatEl.find('.step').each(function(){
  //   slideJoins.add(TweenMax.to(this, 1, {left: -winWidth, ease: Ease.easeIn}));
  // });

  
  // new els
  

  tl.add(slideConcepts);


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