$.fn.extend({
  wait: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
})


$.fn.extend({
  animateCss: function(animationName) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));


    return new Promise(() => {
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      })
    });
  },
});
