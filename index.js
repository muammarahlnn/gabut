$(function() {

    $(".carousel-link").stop().hover(
        function () {
          $(this).next().children('h1').stop(true, true).fadeOut();
          $(this).next().children('h1').fadeIn(1000);
      
        },
        function () {
          $(this).next().children('h1').fadeIn();
          $(this).next().children('h1').stop(true, true).fadeOut(1000);
        }
    );

    let isScrollingToTop = false;
    $(document).scroll(function () { 
        if ($(window).scrollTop() === 0) {
            $('.header').removeClass('header-scrolled');
            $('.header').addClass('header-onTop');
            isScrollingToTop = false;
        } else if ($(window).scrollTop() !== 0 && !isScrollingToTop) {
            $('.header').removeClass('header-onTop');
            $('.header').addClass('header-scrolled');      
        }
    });

    $('#btn-gabut').click(function (e) { 
        e.preventDefault();
    
        isScrollingToTop = true;
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 1200);

        if ($(window).scrollTop() !== 0) {
            $('.header').removeClass('header-scrolled');
            $('.header').addClass('header-onTop');
        }
    });

    $("#btn-skuy").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#content").offset().top - 50
        }, 1200);
        if ($(window).scrollTop() === 0) {
            $('.header').addClass('header-scrolled');
        }
    });

});