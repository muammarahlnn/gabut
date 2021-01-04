$(function() {
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
        if ($(window).scrollTop() !== 0)
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

});