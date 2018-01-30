$(document).ready(function() {
    $(".navbar-nav .nav-item .nav-link").on("click", function(){
        $(".navbar-nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    // Automatic navigation active state.
    var sections = $('section'),
        nav = $('nav'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - nav_height - 85,
            bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
            }
        });
    });

    // Select all links with hashes
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

    // Responsive background image constructor.
    class ResponsiveBackgroundImage {

        constructor(element) {
            this.element = element;
            this.img = element.querySelector('.responsive');
            this.src = '';

            this.img.addEventListener('load', () => {
                this.update();
            });

            if (this.img.complete) {
                this.update();
            }
        }

        update() {
            let src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
            if (this.src !== src) {
                this.src = src;
                this.element.style.backgroundImage = 'url("' + this.src + '")';

            }
        }
    }

    // Create responsive background images.
    let elements = document.querySelectorAll('[data-image-type="responsive"]');
    for (let i=0; i<elements.length; i++) {
        new ResponsiveBackgroundImage(elements[i]);
    }