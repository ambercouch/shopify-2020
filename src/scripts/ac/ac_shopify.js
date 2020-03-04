/**
 * Created by Richard on 19/09/2016.
 */

console.log('ACSHOPIFY ajax cart reviews ');
const ACSHOPIFY = {
  common: {
    init: function() {
      jQuery('body').addClass('ac-jquery-loaded');
      'use strict';
      //uncomment to debug


        setTimeout(function(){
          if ($(window).width() > 899){
            $('.wprevpro_t1_outer_div:nth-child(3n)').append($('.c-cta--reviews').removeClass('hide'));
          }else{
            $('.c-cta--reviews').removeClass('hide').appendTo('.w3_wprs-col:nth-child(3n)');
          }

        }, 3000);



      let elemQuote = document.querySelector('.c-quote-list__list');
      if(elemQuote){
        let flktyQuote = new Flickity( elemQuote, {
          // options
          cellAlign: 'left',
          contain: true,
          prevNextButtons: false,
        });
      }else{
        console.log('No .c-quote-list__list');
      }


      let elemProductThumb = document.querySelector('.c-product-gallery__list--thumb');
      if(elemProductThumb){
        let flktyProductThumb = new Flickity( elemProductThumb, {
          // options
          cellAlign: 'left',
          contain: true,
          prevNextButtons: false,
          imagesLoaded: true
        });
      }else{
        console.log('No .c-quote-list__list');
      }

      $('[data-control-radio]').each(function(){
          console.log('radio-control');
      });
      $('[data-control]').each(function() {

        const containerId = $(this).attr('data-control');

        const controlSelector = (containerId != '' )? '[data-control='+ containerId + ']' : this;

        const control = $(controlSelector);

        const controlGroupId = control.attr('data-state-group');

        const containerSelector = (containerId != '' )? '[data-container='+ containerId + ']' : '[data-container]';
        const container = $(containerSelector);
        control.off('click');
        control.on('click',  function (e) {

          const state = control.attr('data-state');
          e.preventDefault();
          ACSHOPIFY.fn.actStateToggleSelect(control, state);

          if (controlGroupId){

            ACSHOPIFY.fn.actStateToggleGroup(control, controlGroupId, state);
            ACSHOPIFY.fn.actStateToggleSelect(container, state);
            //ACSHOPIFY.fn.actStateToggleGroup(container, controlGroupId);

          }else{

            // ACTIMBER.fn.actStateToggle(container, control);
            ACSHOPIFY.fn.actStateToggleSelect(container, state);
          }
        });

      });

      // add js class
      $('body')
        .addClass('js');

      // Fit Vids
      // $("[data-fitvid]").fitVids();

      console.log('ajax cart');
      function refreshCart(cart) {
        var $cartBtn = $("[data-button-cart]");
        // console.log('$cartBtn');
        // console.log($cartBtn);
        // console.log('cart');
        // console.log(cart);
        if ($cartBtn) {
          var $cartCount = $cartBtn.find('[data-cart-count]');
          if(cart.item_count == 0) {

          } else if ($cartCount.length) {
            $cartCount.text(cart.item_count);
          }
        }
      }

      $(document).on('click', '[data-close=continue-shopping-helper]' ,function (e) {
        e.preventDefault();
        // $('.continue-shopping-helper').addClass('animated fadeOutRight');
        //  setTimeout(function(){
        //      $('.continue-shopping-helper').hide().removeClass('fadeOutRight');
        //  }, 1000);
        window.history.back();
        console.log('back button');
        //$('.continue-shopping-helper').unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
      });

      $('.add-form__form').submit(function(e) {
        console.log('add click');
        e.preventDefault();
        var $addToCartForm = $(this);
        var $addToCartBtn = $addToCartForm.find('.add-form__submit-btn');

        $.ajax({
          url: '/cart/add.js',
          dataType: 'json',
          type: 'post',
          data: $addToCartForm.serialize(),
          beforeSend: function() {
            $addToCartBtn.attr('disabled', 'disabled').addClass('disabled');
            //$addToCartBtn.find('span').text('Adding').removeClass("zoomIn").addClass('animated zoomOut');
          },
          success: function(itemData) {
            //$addToCartBtn.find('span').text('Added to your Cart').removeClass('zoomOut').addClass('fadeIn');
            // $addToCartForm.find('.add-form__submit-btn').show().addClass('animated fadeInLeft');
            $addToCartForm.find('.continue-shopping-helper').show().addClass('animated fadeInDown');

            window.setTimeout(function(){
              $addToCartBtn.removeAttr('disabled').removeClass('disabled');
              $addToCartBtn.find('span').addClass("fadeOut").text($addToCartBtn.data('label')).removeClass('fadeIn').removeClass("fadeOut").addClass('zoomIn');
            }, 2500);




            $.getJSON("/cart.js", function(cart) {
              refreshCart(cart);
            });
          },
          error: function(XMLHttpRequest) {
            var response = eval('(' + XMLHttpRequest.responseText + ')');
            response = response.description;
            // $('.warning').remove();

            var warning = '<p>' + response.replace('All 1 ', 'All ') + '</p>';

            // $('.continue-shopping-helper__notice').addClass(' warning animated bounceIn ');
            $('.continue-shopping-helper__notice-content').html(warning);
            $addToCartForm.find('.continue-shopping-helper').show();
            $('.continue-shopping-helper__notice--added, .continue-shopping-helper__notice--warning').removeClass('continue-shopping-helper__notice--added animated bounceIn').addClass('continue-shopping-helper__notice--warning animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              $(this).removeClass('animated bounceIn');
            });
            $addToCartBtn.removeAttr('disabled').removeClass('disabled');
            //$addToCartBtn.find('span').text("Add to Cart").removeClass('zoomOut').addClass('zoomIn');
          }
        });

        return false;
      });
    },
  },
  page: {
    init: function() {
      // uncomment to debug
      // console.log('pages');
    }
  },
  post: {
    init: function() {
      // uncomment to debug
      // console.log('posts');
    }
  },
  fn:{actStateToggleGroup : function (control, stateGroupId, state){
        $('[data-state-group='+stateGroupId+']').not(control).each(function(){
          if ('off' === $(this).attr('data-state') ) {
            $(this).attr('data-state', 'on');
          } else if ('on' === $(this).attr('data-state') ) {
            $(this).attr('data-state', 'off');
          } else{
            console.log('compfail');
            console.log($(this).attr('data-state'));
          }
        })

    },
    actStateToggleSelect : function (element, state) {
      if('off' === state ){
        element.attr('data-state', 'on');
      }
      if('on' === state){
        element.attr('data-state', 'off');
      }
    },
    actStateToggle: function (container, showButton, parent, listParent) {
      var elState = showButton.attr('data-state');
      var eventActOpen = new Event('actOpen');
      var eventActClose = new Event('actClose');
      showButton.on('click', function(e){
        e.preventDefault();
        elState = $(this).attr('data-state');
        console.log('elState');
        console.log(this);

        console.log(elState);

        if ('off' === elState ) {
          console.log('click on');
          $(this).attr('data-state', 'on');
          $(container).attr('data-state', 'on');
          $(parent).attr('data-state', 'on');
          $(container).addClass('ac-on');
          document.body.className += ' ' + 'container-is-open';
          window.dispatchEvent(eventActOpen);

        } else {
          console.log('click off');
          $(this).attr('data-state', 'off');
          $(container).attr('data-state', 'off');
          $(parent).attr('data-state', 'off');
          $(container).removeClass('ac-on');
          document.querySelector('body').classList.remove('container-is-open');

          window.dispatchEvent(eventActClose);
        }
      });
    },
    actStateClose: function (container, showButton, closeButton) {
      var elState = closeButton.attr('data-state');

      var eventActClose = new Event('actClose');

      // var eventActOpen = document.createEvent('Event');
      // eventActOpen.initEvent('actOpen', true, true);
      // var eventActClose = document.createEvent('Event');
      // eventActClose.initEvent('actClose', true, true);


      closeButton.on('click', function(e){
        e.preventDefault();
        elState = $(this).attr('data-state');

        console.log('click off');
        showButton.attr('data-state', 'off');
        closeButton.attr('data-state', 'off');
        $(container).attr('data-state', 'off');
        $(container).removeClass('ac-on');
        document.querySelector('body').classList.remove('container-is-open');

        window.dispatchEvent(eventActClose);

      });
    }
  }
};

UTIL = {
  exec: function(template, handle) {
    const ns = ACSHOPIFY;
    handle = (handle === undefined) ? "init" : handle;

    if (template !== '' && ns[template] && typeof ns[template][handle] === 'function') {
      ns[template][handle]();
    }
  },
  init: function() {
    const body = document.body;
    const  template = body.getAttribute('data-post-type');
    const  handle = body.getAttribute('data-post-slug');

    UTIL.exec('common');
    UTIL.exec(template);
    UTIL.exec(template, handle);
  }
};
$(window).on('load', UTIL.init);
