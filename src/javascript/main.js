let navbar = $(".navbar");
$(window).scroll(function () {
  // get the complete hight of window
  let oTop = $(".section-1").offset().top - window.innerHeight;
  if ($(window).scrollTop() > oTop) {
    navbar.addClass("sticky");
  } else {
    navbar.removeClass("sticky");
  }
});

// To hide the collapse navbar after a link is clicked
$('.navbar-nav>li>a').on('click', function(){
  $('.navbar-collapse').collapse('hide');
});

