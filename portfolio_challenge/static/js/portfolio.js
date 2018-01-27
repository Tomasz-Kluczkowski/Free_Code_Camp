

// Select all links with hashes
$(document).ready(function() {
    $(".navbar-nav .nav-item .nav-link").on("click", function(){
    $(".navbar-nav").find(".active").removeClass("active");
    $(this).addClass("active");
    });

//    ADD SECTIONS TO THE HTML TO BIND EVENT TO STATE CHANGE
//    CHECK WHAT SELECTORS NEED TO BE USED !!!
//     var sections = $('section'),
//         nav = $('nav'),
//         nav_height = nav.outerHeight();
//
//     $(window).on('scroll', function () {
//         var cur_pos = $(this).scrollTop();
//
//     sections.each(function() {
//         var top = $(this).offset().top - nav_height,
//         bottom = top + $(this).outerHeight();
//
//     if (cur_pos >= top && cur_pos <= bottom) {
//       nav.find('a').removeClass('active');
//       sections.removeClass('active');
//
//       $(this).addClass('active');
//       nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
//     }
//   });
// });

    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    });
                }
            }
        });
    });