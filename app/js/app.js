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
  var whatItems = slideWhatEl.find('li');
  var whatSteps = [];

  slideWhat2.add(TweenMax.from(slideWhatEl.find('ul'), 1, {left: winWidth, opacity:0, ease: Ease.easeOut}));
  slideWhat2.add(TweenMax.fromTo(slideWhatEl.find('li:first-child'), 1, {left: winWidth},{left:0, ease: Ease.easeOut}));
  tl.add(slideWhat2);
  
  slideWhatEl.find('li').not(':first-child').each(function(i) {
    whatSteps[i] = new TimelineMax();
    whatSteps[i].add(TweenMax.fromTo(this, 1, {left: winWidth},{left:0, ease: Ease.easeOut}));
    tl.add(whatSteps[i]);
  });


  // intro.add(TweenMax.fromTo($('body'),0.5,{backgroundColor:'#fff'},{delay:0.5,backgroundColor:'#99cee2'}));

  var slideConcepts = new TimelineMax();
  var slideConceptsEl = $('#slide-concepts');

  // reverse order to move bottom li first
  // whatItems.reverse();
  // var whatItemsRev = whatItems.reverse();
  slideConcepts.add(TweenMax.to(slideWhatEl.find('header'), 1, {y: -100, opacity: 0, ease:Ease.easeIn}, .3));
  slideConcepts.add(TweenMax.staggerTo(_.reverse(whatItems), 1, {y: winHeight, opacity: 0, ease:Ease.easeIn}, 0.1));
  slideConcepts.add(TweenMax.to(slideWhatEl,0,{immediateRender:false,css:{display:'none'}}));
  // new
  slideConcepts.add(TweenMax.to(slideConceptsEl,0,{immediateRender:false,css:{display:'block'}}));
  slideConcepts.add(TweenMax.from(slideConceptsEl, 1, {left: -winWidth, opacity:1, ease: Ease.easeOut}));

  tl.add(slideConcepts);


  // Data Joins slide
  var slideJoins = new TimelineMax();
  var slideJoinsEl = $('#slide-joins');
  slideJoins.add(TweenMax.to(slideConceptsEl, 1, {left: -winWidth, opacity:0, ease: Ease.easeOut}));
  slideJoins.add(TweenMax.to(slideConceptsEl,0,{immediateRender:false,css:{display:'none'}}));

  // new
  slideJoins.add(TweenMax.to(slideJoinsEl,0,{immediateRender:false,css:{display:'block'}}));
  slideJoins.add(TweenMax.fromTo(slideJoinsEl, 1, {left: -winWidth, opacity:0}, {left: 0, opacity:1, ease: Ease.easeOut}));

  tl.add(slideJoins);

  // animate chart in seperate
  var slideJoins2 = new TimelineMax();
  slideJoins2.add(TweenMax.fromTo(slideJoinsEl.find('.chart-blank'), 1, {scale: .2, opacity:0}, {scale: 1, opacity:1, ease: Ease.easeOut}));
  tl.add(slideJoins2);

  var slideJoins3 = new TimelineMax();
  slideJoins3.add(TweenMax.fromTo(slideJoinsEl.find('h2.enter'), 1, {opacity:0}, {opacity:1, ease: Ease.easeOut}));
  tl.add(slideJoins3);

  // var slideJoinsUpdate = new TimelineMax();
  // slideJoinsUpdate.add(TweenMax.to(slideJoinsEl.find('h2.enter'), 1, {opacity:0, ease: Ease.easeOut, onComplete: function(){
  //   $(this.target).hide();
  // }}));
  // slideJoinsUpdate.add(TweenMax.fromTo(slideJoinsEl.find('h2.update'), 1, {opacity:0}, {opacity:1, ease: Ease.easeOut}));
  // tl.add(slideJoinsUpdate);

  // var slideJoinsExit = new TimelineMax();
  // slideJoinsExit.add(TweenMax.to(slideJoinsEl.find('h2.update'), 1, {opacity:0, ease: Ease.easeOut}));
  // slideJoinsExit.add(TweenMax.fromTo(slideJoinsEl.find('h2.exit'), 1, {opacity:0}, {opacity:1, ease: Ease.easeOut}));
  // tl.add(slideJoinsExit);

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


  // TODO: add activate deactivate animations per slide
  // function activate(d, i) {
  //   if (i === followIndex) mystack.on("scroll.follow", refollow);
  //   if (i === lorenzIndex) startLorenz();
  // }

  // function deactivate(d, i) {
  //   if (i === followIndex) mystack.on("scroll.follow", null);
  //   if (i === lorenzIndex) stopLorenz();
  // }

  // var lorenzInterval;

  // function startLorenz() {
  //   var δτ = 0.003,
  //       ρ = 28,
  //       σ = 10,
  //       β = 8 / 3,
  //       x = .5,
  //       y = .5,
  //       z = 10,
  //       n = 30;

  //   var width = 1280,
  //       height = 720;

  //   var canvas = d3.select("canvas")
  //       .style("position", "absolute")
  //       .style("top", 0)
  //       .style("left", 0)
  //       .style("width", "100%")
  //       .style("height", "100%")
  //       .attr("width", width)
  //       .attr("height", height);

  //   var color = d3.scale.linear()
  //       .domain([0, 20, 30, 50])
  //       .range(["yellow", "orange", "brown", "purple"])
  //       .interpolate(d3.interpolateHcl);

  //   var context = canvas.node().getContext("2d");

  //   context.lineWidth = .2;
  //   context.fillStyle = "rgba(0,0,0,.03)";

  //   d3.timer(function() {
  //     context.save();
  //     context.globalCompositeOperation = "lighter";
  //     context.translate(width / 2, height / 2);
  //     context.scale(12, 14);
  //     context.rotate(30);
  //     for (var i = 0; i < n; ++i) {
  //       context.strokeStyle = color(z);
  //       context.beginPath();
  //       context.moveTo(x, y);
  //       x += δτ * σ * (y - x);
  //       y += δτ * (x * (ρ - z) - y);
  //       z += δτ * (x * y - β * z);
  //       context.lineTo(x, y);
  //       context.stroke();
  //     }
  //     context.restore();
  //     return !lorenzInterval;
  //   });

  //   lorenzInterval = setInterval(function() {
  //     context.fillRect(0, 0, width, height);
  //   }, 100);
  // }

  // function stopLorenz() {
  //   lorenzInterval = clearInterval(lorenzInterval);
  // }



})(jQuery);