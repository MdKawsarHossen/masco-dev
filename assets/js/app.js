"use strict";

(function ($) {
  "use strict";

  jQuery.fn.is_exist = function () {
    return this.length;
  };

  /*--------------------------------------------------------------
  MASCO STICKY MENU JS INIT
  --------------------------------------------------------------*/

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('#sticky-menu').addClass('sticky-menu');
    } else {
      $('#sticky-menu').removeClass('sticky-menu');
    }
  });

  /*--------------------------------------------------------------
  MASCO BRAND LOGO JS INIT
  --------------------------------------------------------------*/

  var masco_logo_slider = $('.masco-logo-slider');
  if (masco_logo_slider.is_exist()) {
    masco_logo_slider.slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      cssEase: 'linear',
      pauseOnHover: true,
      adaptiveHeight: true,
      responsive: [{
        breakpoint: 1199,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      }]
    });
  }

  /*--------------------------------------------------------------
  ZUZU TEXT SLIDER INIT
  --------------------------------------------------------------*/
  var masco_text_slider = $('.masco--text-slider');
  if (masco_text_slider.is_exist()) {
    masco_text_slider.slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      cssEase: 'linear',
      pauseOnHover: true,
      adaptiveHeight: true,
      responsive: [{
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
  }

  // magnific popup menu
  var popup_youtube = $('.masco--hero-playbtn');
  if (popup_youtube.is_exist()) {
    popup_youtube.magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade'
    });
  }
  $(window).on("resize", function () {}); // end window resize

  $(window).on("load", function () {
    var $masco_masonay_2column = $('#masco--2column-masonay');
    if ($masco_masonay_2column.is_exist()) {
      var $container = $($masco_masonay_2column),
        colWidth = function colWidth() {
          var w = $container.width(),
            columnNum = 1,
            columnWidth = 0;
          if (w > 1200) {
            columnNum = 2;
          } else if (w > 900) {
            columnNum = 2;
          } else if (w > 600) {
            columnNum = 1;
          } else if (w > 450) {
            columnNum = 1;
          } else if (w > 385) {
            columnNum = 1;
          }
          columnWidth = Math.floor(w / columnNum);
          $container.find('.masco--grid-item').each(function () {
            var $item = $(this),
              multiplier_w = $item.attr('class').match(/masco--grid-item-w(\d)/),
              multiplier_h = $item.attr('class').match(/masco--grid-item-h(\d)/),
              width = multiplier_w ? columnWidth * multiplier_w[1] : columnWidth,
              height = multiplier_h ? columnWidth * multiplier_h[1] * 0.4 - 12 : columnWidth * 0.5;
            $item.css({
              width: width
              // height: height
            });
          });

          return columnWidth;
        },
        isotope = function isotope() {
          $container.isotope({
            resizable: false,
            itemSelector: '.masco--grid-item',
            masonry: {
              columnWidth: colWidth(),
              gutterWidth: 0
            }
          });
        };
      isotope();
      $(window).resize(isotope);
      var $optionSets = $('.masco--portfolio-menu .option-set'),
        $optionLinks = $optionSets.find('li');
      $optionLinks.click(function () {
        var $this = $(this);
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.active').removeClass('active');
        $this.addClass('active');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
          // changes in layout modes need extra logic
          changeLayoutMode($this, options);
        } else {
          // creativewise, apply new options
          $container.isotope(options);
        }
        return false;
      });
    }
  }); // End window LODE
})(jQuery);