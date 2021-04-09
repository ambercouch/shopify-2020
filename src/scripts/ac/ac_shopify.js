
/**
 * Created by Richard on 19/09/2016.
 */

console.log('ACSHOPIFY 31032021 filckty test');
const ACSHOPIFY = {
  common: {
    init: function() {

      $(document).on('click', function(){
        // console.log('clicked the document');
      });

      if (window.navigator.cookieEnabled) {
        document.documentElement.className = document.documentElement.className.replace(
          'supports-no-cookies',
          'supports-cookies',
        );
      }

      // URL Param test
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      const version = urlParams.get('acabv');
      const cartPreDiscountNotice = urlParams.get('acabcartpdc');
      const cartprecheckout = urlParams.get('acabprecheckout');

      if (version == null){
        jQuery("[class*=l-main__content-block--]").first().removeClass("is-hidden");

      }else{
        jQuery("[class*=l-main__content-block--"+version+"]").removeClass("is-hidden");
      }

      if (cartPreDiscountNotice != 'true' ){
        jQuery("body").addClass('is-cartpdn-hidden').removeClass('is-cartpdn-show');
      }else {
        jQuery("body").removeClass('is-cartpdn-hidden').addClass('is-cartpdn-show');
      }

      if (cartprecheckout == null || cartprecheckout == 'continue'){
        jQuery('[data-acab-pre-checkout=cart-continue]').removeClass('u-hidden');
        jQuery('[data-acab-pre-checkout=cart-bundle]').addClass('u-hidden');
      }else{
        jQuery('[data-acab-pre-checkout=cart-continue]').addClass('u-hidden');
        jQuery('[data-acab-pre-checkout=cart-bundle]').removeClass('u-hidden');
      }


      // add js class
      $('body')
        .addClass('js').removeClass('no-js');

      jQuery('body').addClass('ac-jquery-loaded');
      'use strict';

      //uncomment to debug

      fitvids();

      $(document).on('click', '.c-content-block__icon--scroll, [data-js-scroll-down]', function() {
        let target = $(this).parent();
        $('html, body').animate({
          scrollTop: target.offset().top + target.outerHeight(),
        }, 1000);
      });

      // $(document).on('click', '[data-js-scroll-top]', function() {
      //
      //   $('html, body').animate({
      //     scrollTop: 0
      //   }, 1000);
      //   return false;
      // });
     // console.log('[data-js-sticky-bottom]');
     // console.log($('[data-js-sticky-bottom]'));

      // scroll top
      $("a[href='#top']").click(function() {
        console.log("scroll top");
        $('html, body').animate({ scrollTop: 0 }, 1000 );
        return false;
      });

      //content for index add class to shopify sections
      $('[class*=l-main--] .shopify-section').each(function() {
        console.log('section found');
        let desk50 = $('.is-block-width-50', this).length;
        console.log('desk50 ' + desk50);
        if (desk50){
          $(this).addClass('is-section-width-50');
        }
        let desk33 = $('.is-block-width-33', this).length;
        console.log('desk33 ' + desk33);
        if (desk33){
          $(this).addClass('is-section-width-33');
        }
      });

      // Facebook reviews script
        setTimeout(function(){
          if ($(window).width() > 899){
            $('.wprevpro_t1_outer_div:nth-child(3n)').append($('.c-cta--reviews').removeClass('hide'));
          }else{
            $('.c-cta--reviews').removeClass('hide').appendTo('.w3_wprs-col:nth-child(3n)');
          }

        }, 3000);

        // Quote flickity script
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

      // Product gallery flickity script for thumbs
     // let elemProductThumb = document.querySelector('.c-product-gallery__list--thumb');
      //let elemProductThumb = $('.c-product-gallery__list--thumb');
      // if(elemProductThumb){
      //   let flktyProductThumb = new Flickity( elemProductThumb, {
      //     // options
      //     cellAlign: 'left',
      //     contain: true,
      //     prevNextButtons: false,
      //     // imagesLoaded: true,
      //     pageDots: false,
      //   });
      // }else{
      //   console.log('No .c-quote-list__list');
      // }

      // elemProductThumb.flickity({
      //   // options
      //   cellAlign: 'left',
      //   contain: true,
      //   prevNextButtons: false,
      //
      //   pageDots: false,
      // });




      /*
      Radio toggle controls
       */
      //get all the radio control Ids
      let aRadioIds = [];
      $('[data-control-radio]').each(function(){
        let radioId = $(this).attr('data-control-radio');
        aRadioIds.indexOf(radioId) === -1 ? aRadioIds.push(radioId) : '';
      });

      $.each(aRadioIds, function(i) {
        // console.log('[data-control-radio]');
        // console.log(aRadioIds[i]);
        currentRadioId = aRadioIds[i];
        const controls = $('[data-control-radio=' + currentRadioId + '][data-control]');
        const containers = $('[data-container-radio=' + currentRadioId + '][data-container]');
        $.each(controls, function(i) {
          // console.log('[data-control-radio] control');
          // console.log(this);
          // console.log('[data-control-radio=' + currentRadioId + '][data-control]');
          // console.log(this);
          const containerId = $(this).attr('data-control');
          const containerParentId = $(this).attr('data-container-parent');

          const containerSelector = (containerId != '' )? '[data-container='+ containerId + ']' : '[data-container]';
          const containerParentSelector = (containerParentId != '' )? '[data-container='+ containerParentId + ']': null ;
          const controleParentSelector = (containerParentId != '' )? '[data-control='+ containerParentId + ']': null ;

          const container = $(containerSelector);
          const containerParent = $(containerParentSelector);

          const control = $(this);
          const controlParent = $(controleParentSelector);

          // $(document).on('click', function(){
          //   console.log('radio document click + clicker');
          //   console.log( clickerId);
          // });

          // $(document).off('click', '#'+this.id);

          // select via ID or this
          //$('#'+this.id).on('click',  function(e)
          //select via document
          $(document).on('click',  '#'+this.id, function(e) {
            // console.log('[data-control-radio] this clicker log ');
            // console.log('#'+this.id);
            //console.log(clickerId);
            e.preventDefault();
            const state = control.attr('data-state');

            // toggle state of this controller
            ACSHOPIFY.fn.actStateToggleSelect(control, state);

            // toggle state of this container
            ACSHOPIFY.fn.actStateToggleSelect(container, state);

            // toggle off all other container
              containers.not(container).not(containerParent).each(function() {
              ACSHOPIFY.fn.actStateToggleSelect($(this), 'on');
            });

            // toggle off all other controllers
            controls.not(control).not(controlParent).each(function() {
              ACSHOPIFY.fn.actStateToggleSelect($(this), 'on');
            });
          });
        });
      });

      $('[data-control]:not([data-control-radio])').each(function() {
        // console.log('[data-control]:not([data-control-radio])');
        const containerId = $(this).attr('data-control');

        const controlSelector = (containerId != '' )? '[data-control='+ containerId + ']' : this;

        const control = $(controlSelector);

        const controlGroupId = control.attr('data-state-group');

        const containerSelector = (containerId != '' )? '[data-container='+ containerId + ']' : '[data-container]';

        const container = $(containerSelector);

        $(document).off('click', controlSelector );

        $(document).on('click', controlSelector, function (e) {
          // console.log('clickered clicked');
          const state = control.attr('data-state');
          e.preventDefault();
          ACSHOPIFY.fn.actStateToggleSelect(control, state);

          if (controlGroupId){
            console.log('clickered group');
            ACSHOPIFY.fn.actStateToggleGroup(control, controlGroupId, state);
            ACSHOPIFY.fn.actStateToggleSelect(container, state);
            //ACSHOPIFY.fn.actStateToggleGroup(container, controlGroupId);

          }else{
            console.log('clickered not group');
            // ACTIMBER.fn.actStateToggle(container, control);
            ACSHOPIFY.fn.actStateToggleSelect(container, state);
          }
        });

      });

      // Nav menu flickity script
      // let elemNavlist = document.querySelectorAll('.c-nav-menu__list--mobile-sub-list .c-nav-menu__list--mobile-sub-list');
      //
      $(document).on('click', '[data-control].has-1-levels', function(){
        console.log('is filckrty > .c-nav-menu__list');
        let controlParent = $(this).parent();
        console.log($(this));
        let elemMenuList = $('.c-nav-menu__list--mobile-sub', controlParent);

        elemMenuList.flickity({
          // options
          cellAlign: 'left',
          contain: true,
          prevNextButtons: false,

          pageDots: false,
        });


      });

      $(document).on('click', '[data-control].has-2-levels', function() {
        console.log('is filckrty .c-product-type-list');
        console.log( $(this));
        let controlParent = $(this)
          .parent();
        let elemMenuList = $('.c-product-type-list__list--mobile-sub', controlParent);

        elemMenuList.flickity({
          // options
          cellAlign: 'left',
          contain: true,
          prevNextButtons: false,

          pageDots: false,
        });
      });



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
        // console.log('add click');
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
  index: {
    init: function() {
      //console.log('index');

      let browserHeight = $(window).height();
      let mastheadHeight = $('#masthead').outerHeight();
      let heroHeight = browserHeight -  mastheadHeight;
      $('[class*=c-content-block--].is-full-height').css('height', heroHeight);

        // $(function () {
        //   $('a[href*="#"]:not([href="#"])').click(function () {
        //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        //       let target = $(this.hash);
        //       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        //       if (target.length) {
        //         $('html, body').animate({
        //           scrollTop: target.offset().top,
        //         }, 1000);
        //         return false;
        //       }
        //     }
        //   });
        // });




    },
  },
  page: {
    init: function() {
      // uncomment to debug
      console.log('pages');
    },
    ac_gallery: function(){
      console.log('acGallery scripts');
      // Product gallery flickity script for thumbs
      let elemGallery = document.querySelector('.c-gallery__list');
      if(elemGallery ){
        let flktyProductThumb = new Flickity( elemGallery, {
          // options
          cellAlign: 'center',
          prevNextButtons: true,
          imagesLoaded: true,
          pageDots: false,
          wrapAround: true,
        });
      }else{
        console.log('No .c-quote-list__list');
      }
    }
  },
  collection: {
    init: function() {
      // uncomment to debug
      console.log('some collection');
    },
    bundles: function() {

      $(document).on('click', '#bundleDiscountCode', function() {
        var element = this;
        ACSHOPIFY.fn.actCopyToClipBoard(element);
      });
      // uncomment to debug
      console.log('collection bundles test 2020');
      console.log('collection bundles timer confirm exit');

      const bundledProducts = {};
      let elBundlenNoticeCurrentDiscount = document.getElementById('bundleNoticeTextCurrentDiscount');
      let elBundlenNoticeNextDiscount = document.getElementById('bundleNoticeTextNextDiscount');
      let elBundlenNoticeNextDiscountItem = document.getElementById('bundleNoticeTextNextDiscountItem');
      let elBundleNoticeTextCurrentSaving = $('#bundleNoticeTextCurrentSaving');
      let elBundleSaving = document.getElementById('bundleSaving');
      let elBundleDiscountCode = document.getElementById('bundleDiscountCode');
      let elFullPrice =  document.getElementById('fullPrice');
      let elBundlePrice =  document.getElementById('bundlePrice');
      let elOffPageBundleNotice = document.getElementById('offPageBundleNotice');
      let elCartBtn = $('.c-btn--buy-bundle, .c-btn--buy-bundle-popout');
      //let elBundleLinkImage =  document.getElementById('linkBundleImage');
      //let elBundleLinkTitle =  document.getElementById('linkBundleTitle');

      let bundleNoticeTextCurrentDiscount = elBundlenNoticeCurrentDiscount.textContent;
      let bundleNoticeTextNextDiscount = elBundlenNoticeNextDiscount.textContent;


      let bundleNoticeNoDiscount = "You don't have enough product in your bundle to get our bundle discount";
      let bundleNotice20Percent = "Add your bundle to the cart and get 20% off when you checkout";
      let bundleNotice25Percent = "Add your bundle to the cart and get 25% off when you checkout";
      let bundleNotice30Percent = "Add your bundle to the cart and get 30% off when you checkout";

      let bundlenNoticeNext0 = "Add 3 items to get our 20% bundle discount.";
      let bundlenNoticeNext1 = "Add 2 more items to get our 20% bundle discount.";
      let bundlenNoticeNext2 = "Add 1 more item to get our 20% bundle discount.";
      let bundlenNoticeNext3 = "Add 1 more items to get our 25% bundle discount.";
      let bundlenNoticeNext4 = "Add 2 more items to get our 30% bundle discount.";
      let bundlenNoticeNext5 = "Add 1 items to get our 30% bundle discount.";
      let bundlenNoticeNext6 = "";

      let bundleNoticeSaving1 = 'You will save ';
      let bundleNoticeSaving2 = 'when you use discount code';
      let bundleNoticeSaving3 = 'at checkout.';
      let discountCode1 = '3BIB20';
      let discountCode2 = '4BIB25';
      let discountCode3 = '6BIB30';




      let elTextQty = document.getElementById('bundleNoticeTextQty');
      let elTextUnit = document.getElementById('bundleNoticeTextUnitLabel');
      let textUnitSingle = 'item';
      let textUnit = 'items';
      let elBundleList = $('#bundleProductList');
      let bundleCount = 0;
      let bundleTotal = 0;
      let bundleDiscount = 0;
      let bundleDiscountPercent = 0;
      let bundleSaving = 0;
      let bundleSavingMoney = 0;

      let remodArray = {};

      $('[data-remodal-id]').each(function(i){
        let dataRemodalId = $(this).attr('data-remodal-id');
        let inst = $(this).remodal();
        remodArray[dataRemodalId] = inst;
        console.log('remod found');
        console.log(dataRemodalId);
      });



      console.log('remodArray');
      console.log(remodArray);

      $(document).on('click', '#linkBundleImage', function(e) {
        let productId = $(this).attr('data-product-id');
        let remodalId = 'modal' + productId;
        console.log('image click');
        e.preventDefault();
        remodArray[remodalId].open();
      });

      $(document).on('click', '#linkBundleTitle', function(e) {
        console.log('title click');
        e.preventDefault();
      });

      // $(document).on('click', elBundleLinkTitle, function(e) {
      //   console.log('title click');
      //   e.preventDefault();
      // });

      window.onbeforeunload = confirmExit;

      function confirmExit()
      {

        if(bundleCount > 0){

          return true;
        }else {

          return;
        }
      }

      // Create our number formatter.
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
      });

      function bundleFormatSaving(){
        bundleSavingMoney = formatter.format(bundleSaving / 100);
      }


      function updateElBundleSaving() {
        elBundleSaving.textContent = bundleSavingMoney;
      }

      function updateElBundlePrice() {
        elBundlePrice.textContent = formatter.format((bundleTotal / 100) - (bundleDiscount / 100) );
      }

      function updateElFullPrice() {
        elFullPrice.textContent = formatter.format(bundleTotal / 100    );
      }

      function setBundleDiscount() {

        bundleDiscount = ((bundleTotal / 100) * bundleDiscountPercent);
      }

      function updateElBundleDiscountCode() {
        if(bundleCount == 3 ){
          elBundleDiscountCode.textContent = discountCode1;
        }else if(bundleCount >3 && bundleCount <= 5){
          elBundleDiscountCode.textContent = discountCode2;
        }else {
          elBundleDiscountCode.textContent = discountCode3;
        }

      }




      function updateBundleNoticeSavingDisplay() {
        if (bundleCount >= 3){
          elBundleNoticeTextCurrentSaving.show();
        }else{
          elBundleNoticeTextCurrentSaving.hide()
        }
      }


      //update item text
      function updateItemtext(){
        if(bundleCount == 1){
          elTextUnit.textContent = textUnitSingle;
        } else {
          elTextUnit.textContent = textUnit;
        }

        elTextQty.textContent = bundleCount;
      }

      //update bundle notice text
      function updateBundleText(text, el) {
        el.textContent = text;
      }

      function updateBundleNotice() {
        if(bundleCount < 3){
          elBundlenNoticeCurrentDiscount.textContent = bundleNoticeNoDiscount
        }else if(bundleCount == 3){
          elBundlenNoticeCurrentDiscount.textContent = bundleNotice20Percent
        }else if(bundleCount > 3 && bundleCount <= 5){
          elBundlenNoticeCurrentDiscount.textContent = bundleNotice25Percent
        }else{
          elBundlenNoticeCurrentDiscount.textContent = bundleNotice30Percent
        }
      }

      function updateBundleNoticeNext() {
        console.log('bundleCount');
        console.log(bundleCount);

        let el = elBundlenNoticeNextDiscountItem;
        if(bundleCount == 0){
          showElement(el);

          elBundlenNoticeNextDiscount.textContent = bundlenNoticeNext0;
        }else if(bundleCount == 1){
          showElement(el);

          elBundlenNoticeNextDiscount.textContent = bundlenNoticeNext1;
        }else if(bundleCount == 2){
          showElement(el);

          elBundlenNoticeNextDiscount.textContent = bundlenNoticeNext2;
        }else if(bundleCount == 3){
          showElement(el);

          elBundlenNoticeNextDiscount.textContent = bundlenNoticeNext3;
        }else if(bundleCount == 4){
          showElement(el);

          elBundlenNoticeNextDiscount.textContent = bundlenNoticeNext4;
        }else if(bundleCount == 5){
          showElement(el);

          elBundlenNoticeNextDiscount.textContent = bundlenNoticeNext5;
        }else if(bundleCount == 6){

          hideElement(el)
          elBundlenNoticeNextDiscount.textContent = bundlenNoticeNext6;
        }else{

          hideElement(el)
        }

      }


      //update bundle list
      function updateBundleList(entries) {
        elBundleList.empty();

        for (const [product, obj] of entries) {

          const elTemp = `
                <div class="l-cart-list__item"  >
                <div class="l-cart-list__product-thumb">
                <div class="c-product-thumb--cart" id="bundleItem${obj.variantId}">
                
                <div class="c-product-thumb__feature-image--cart">
                   <img class="c-product-thumb__img--cart" src="${obj.variantImg}" alt="${obj.productTitle}">
                 </div>
                
                <div class="c-product-thumb__content--cart">
                
                   <div class="c-product-thumb__cart-remove">
                     <div class="c-cart-remove cart-remove">
                      <button data-id="${obj.variantId}" class="c-btn--cart-remove">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="c-icon--close" viewBox="0 0 20 20"><path d="M15.89 14.696l-4.734-4.734 4.717-4.717c.4-.4.37-1.085-.03-1.485s-1.085-.43-1.485-.03L9.641 8.447 4.97 3.776c-.4-.4-1.085-.37-1.485.03s-.43 1.085-.03 1.485l4.671 4.671-4.688 4.688c-.4.4-.37 1.085.03 1.485s1.085.43 1.485.03l4.688-4.687 4.734 4.734c.4.4 1.085.37 1.485-.03s.43-1.085.03-1.485z"/></svg>
                       </button>
                     </div>
                   </div>
                 <h4 class="c-product-thumb__heading--cart">
                     <span class="c-product-thumb__title">${obj.productShortName}</span>
                 </h4>
                 
                  <div class="c-product-thumb__wrapper--cart-qty">
                   <div class="c-product-thumb__variant">
                   <span class="c-product-thumb__variant-title">${obj.variantTitle}</span>
                   </div>
                
                  
                   <div class="c-product-thumb__qty-sep">
                       X
                     </div>
                      <div class="c-product-thumb__qty" id="qty${obj.variantId}"></div>
                        </div>
                  
                      
                
                </div>
                </div>
                </div>
          `;

          elBundleList.append(elTemp);
         // elBundleList.append('<div class="bundle-cart__item" id="bundleItem'+ obj.variantId +'" ><p><span class="bundle-cart__title--shortName">' + obj.productShortName + '</span><span class="bundle-cart__title">' + obj.productTitle + '</span><br><small>'+obj.variantTitle +' </small>' + '</p></div>');

          $('#qty' + obj.variantId).append('<input data-variant-id="'+ obj.variantId +'" class="bundle-item-qty c-product-thumb__input--qty " type=text min="0" value=' + obj.qty + '>')


        }

      }

      //update bundle list
      function updateBundleQty(entries) {

        for (const [product, obj] of entries) {

          bundleCountAdd(obj.qty);
          bundleTotalAdd(obj.variantPrice * obj.qty);
        }

      }

      function setBundleDiscountPercent() {
        if (bundleCount < 3){
          bundleDiscountPercent = 0
        } else if (bundleCount == 3){
          bundleDiscountPercent = 20;
        }else if (bundleCount > 3 && bundleCount < 6){
          bundleDiscountPercent = 25;
        }else{
          bundleDiscountPercent = 30;
        }

      }

      function updateBundleSaving() {
        bundleSaving = (bundleTotal / 100) * bundleDiscountPercent;
      }

      //update bundle qty
      function bundleCountAdd(qty){
        bundleCount = parseInt(bundleCount) + parseInt(qty);
      }

      //update bundle Total
      function bundleTotalAdd(price) {
        bundleTotal = parseInt(bundleTotal) + parseInt(price);
      }
      //add item to bundle
      function bundleAddItem(variantId, variantTitle, variantPrice, productTitle, productShortName, qty, variantImg){
        qty = (typeof qty == 'undefined') ? 1 : qty;
        bundledProducts[variantId] =  bundledProducts[variantId] || {};
        bundledProducts[variantId].variantTitle = variantTitle;
        bundledProducts[variantId].variantId = variantId;
        bundledProducts[variantId].productTitle  = productTitle;
        bundledProducts[variantId].variantPrice  = variantPrice;
        bundledProducts[variantId].productShortName  = productShortName;
        bundledProducts[variantId].variantImg  = variantImg;
        if (bundledProducts[variantId].hasOwnProperty('qty')){
          bundledProducts[variantId].qty  = bundledProducts[variantId].qty + parseInt(qty);
        }else{
          bundledProducts[variantId].qty  = parseInt(qty);
        }

        //return bundledProducts
      }

      function bundleAddQty(variantId){

        if (bundledProducts[variantId].hasOwnProperty('qty')){
          bundledProducts[variantId].qty  = bundledProducts[variantId].qty + 1;
        }else{
          bundledProducts[variantId].qty  = 1;
        }

        //return bundledProducts
      }
      function closeDrawer(timer = 1000){

        clearTimeout(window.acTimer);
        window.acTimer = setTimeout(function () {
          elOffPageBundleNotice.classList.remove('is-open');
          elOffPageBundleNotice.setAttribute('data-state', 'off');
        }, timer);
      }

      closeDrawer(0);

      function toggleElementState(el, hideClass = 'is-hidden'){
        if (el.classList.contains(hideClass)) {
          el.classList.remove(hideClass)
        }else{
          el.classList.add(hideClass);
        }
      }

      function hideElement(el, hideClass = 'is-hidden'){

        el.classList.add(hideClass);

      }

      function showElement(el, hideClass = 'is-hidden'){

        el.classList.remove(hideClass);

      }

      function updateElCartBtn(){
        if(bundleCount > 2){
          $(elCartBtn).prop("disabled", false);
        }else{
          $(elCartBtn).prop("disabled", true);
        }
      }



      // $(document).on('click', '.l-off-page__tab', function(){
      //   console.log('tab clicked class added');
      //   elOffPageBundleNotice.classList.add('is-open');
      // });
      //
      // $(document).on('click', '.is-open .l-off-page__tab', function(){
      //   console.log('tab clicked class added')
      //   elOffPageBundleNotice.classList.remove('is-open');
      // });
      //
      // $(document).on('click', '.l-off-page__close', function(){
      //   console.log('tab clicked class added');
      //   elOffPageBundleNotice.classList.remove('is-open');
      //   elOffPageBundleNotice.classList.add('is-close-quick');
      // });

      // $(document).on('mouseover', '.l-off-page__tab', function(){
      //     console.log('tab hovered')
      //     elOffPageBundleNotice.classList.add('is-open');
      //     //elOffPageBundleNotice.classList.remove('is-close-quick');
      // });



      // Add a new item to the bundle
      $('.c-product-form__form').submit(function (e) {
        e.preventDefault();
        elOffPageBundleNotice.classList.remove('is-close-quick');
        elOffPageBundleNotice.classList.add('is-open');
        elOffPageBundleNotice.setAttribute('data-state', 'on');
        closeDrawer(4000);
        $('[data-remodal-action=close]').trigger("click");

        bundleCount = 0;
        bundleTotal = 0;
        bundleDiscountPercent = 0;

        let productId = $('input[name=productId]',this).val();
        let productTitle = $('input[name=productTitle]',this).val();
        let variantId = $('option:selected',this).val();
        let variantTitle = $('option:selected',this).text().trim();
        let variantPrice = $('option:selected', this).attr('data-variant-price');
        let variantImg = $('option:selected', this).attr('data-variant-image');
        let productShortName = $('input[name=productShortName]',this).val();
        let qty = $('[name="quantity"]', this).val();

        console.log('variantPrice');
        console.log(variantPrice);
        console.log('qty');
        console.log(qty);

        bundleAddItem(variantId, variantTitle, variantPrice, productTitle, productShortName, qty, variantImg );

        const entries = Object.entries(bundledProducts);

        updateBundleList(entries);
        updateBundleQty(entries);

        updateItemtext();

        setBundleDiscountPercent();

        updateBundleSaving();

        bundleFormatSaving();

        updateBundleNotice();
        updateBundleNoticeNext();
        updateBundleNoticeSavingDisplay();
        updateElBundleSaving();
        updateElBundleDiscountCode();
        setBundleDiscount();
        updateElBundlePrice();
        updateElFullPrice();

        updateElCartBtn();


      });


      //add bundle to cart
      $(document).on('click', '#AddBundleToCartHeader, #AddBundleToCartFooter, #AddBundleToCartOffPage', function () {
        let entries = Object.entries(bundledProducts);
        let values = {};
        let $body = $(document.body);

        window.onbeforeunload = true;

        console.log('#AddBundleToCartHeader jQuery post updates');

        for (const [product, obj] of entries) {
          values[obj.variantId] = obj.qty;
        }

        $.ajax({
          type: "POST",
          url: '/cart/update.js',
          data: {updates: values},
          dataType: 'json',
          success: function () {
            //window.location.href = "/cart";
            console.log('we have success so open up and load');
            //timber.RightDrawer.open();
            //ajaxCart.load();
            window.location.href = "/cart";
          },
          error: function () {
            console.log('we have and error');
          },
          complete: function(jqxhr, text) {
            $body.trigger('completeAddItem.ajaxCart', [this, jqxhr, text]);
          }
        });

      })

      //on update bundle item quantity
      $(document).on('change', '.bundle-item-qty', function(e){
        e.preventDefault();
        elOffPageBundleNotice.classList.remove('is-close-quick');
        elOffPageBundleNotice.classList.add('is-open');
        elOffPageBundleNotice.setAttribute('data-state', 'on');
        closeDrawer(4000);
        $('[data-remodal-action=close]').trigger("click");


        bundleCount = 0;
        bundleTotal = 0;
        bundleDiscountPercent = 0;



        let varId = $(this).attr('data-variant-id');
        let varQty = parseInt($(this).val());
        bundledProducts[varId].qty = varQty;
        // console.log('bundledProducts[varId].qty');
        // console.log(bundledProducts[varId].qty);

        //bundleAddQty(varId);

        const entries = Object.entries(bundledProducts);
        for (const [product, obj] of entries) {
          //  bundleCountAdd(obj.qty);
        }

        updateBundleQty(entries)

        updateItemtext();

        setBundleDiscountPercent();

        updateBundleSaving()

        bundleFormatSaving();

        updateBundleNotice();
        updateBundleNoticeNext()
        updateBundleNoticeSavingDisplay();
        updateElBundleSaving();
        updateElBundleDiscountCode();
        setBundleDiscount();
        updateElBundlePrice()
        updateElFullPrice()

        updateElFullPrice()

        updateElCartBtn();

      })
    }
  },
  product: {

    init: function() {

      // uncomment to debug
      console.log('Product gallery freeScroll: true');

      // Product Gallery
      // Moved form product.js due to issues caused by slow connection speeds .
      $(document).on('click', '[data-product-single-thumbnail]', function(e){

        e.preventDefault();

        let currentImage = $('[data-product-image-wrapper]:not(".hide")');

        let thumbId = $(this).attr('data-thumbnail-id');

        let activeImage = $('[data-product-image-wrapper][data-image-id=' + thumbId + ']' )

        currentImage.addClass('hide');

        activeImage.removeClass('hide');

      });
      // /Product Gallery

      // Product flickity thumbs

      // Product gallery flickity script for thumbs

      // let elemProductThumb = $(document).find('.c-product-gallery__list--thumb');
      // elemProductThumb.flickity({
      //   // options
      //   freeScroll: true,
      //   cellAlign: 'left',
      //   contain: true,
      //   prevNextButtons: false,
      //   pageDots: false,
      // });

      //let elemProductThumb = document.querySelector('.c-product-gallery__list--thumb');
      // if(elemProductThumb){
      //   let flktyProductThumb = new Flickity( elemProductThumb, {
      //     // options
      //     cellAlign: 'left',
      //     contain: true,
      //     prevNextButtons: false,
      //     // imagesLoaded: true,
      //     pageDots: false,
      //   });
      // }else{
      //   console.log('No .c-quote-list__list');
      // }






      let productTagsArray = JSON.parse(document.body.dataset.productTags);

      let productTags = productTagsArray.join();


      $('.c-product-footer__btn').addClass('submit btn');
      $(document).on('click', '.c-product-footer__btn', function() {
        $('[data-product-form]').submit();
        console.log('clicked');
      });

      if (productTags.indexOf("BOGO:") >= 0){

        // if ($("input:radio[name='acceptBogo']").is(":checked")){
        //   alert('dont disable')
        //   $('.c-btn--product-form-submit').prop('disabled', false);
        //   $('.c-btn--product-form-submit').removeAttr('disabled','disabled');
        //   $('.c-btn--product-form-submit').addClass('ac-not-disabled');
        //   $('.c-btn--product-form-submit').removeClass('ac-disabled');
        // } else {
        //   alert('yes disable');
        //   $('.c-btn--product-form-submit').prop('disabled', true);
        //   $('.c-btn--product-form-submit').attr('disabled','disabled');
        //   $('.c-btn--product-form-submit').attr('data-test-attr','some value');
        //   $('.c-btn--product-form-submit').addClass('ac-disabled');
        //   $('.c-btn--product-form-submit').removeClass('ac-not-disabled');
        // }
        //
        // $(document).on('change', "input:radio[name='acceptBogo']", function() {
        //   alert('dont disable')
        //   $('.c-btn--product-form-submit').prop('disabled', false);
        //   $('.c-btn--product-form-submit').removeAttr('disabled');
        //   $('.c-btn--product-form-submit').addClass('ac-not-disabled');
        //   $('.c-btn--product-form-submit').removeClass('ac-disabled');
        // })

        $('body').addClass('is-bogo');



        let acceptBogoStatus = false;

        const acceptBogo = $('#acceptBogo');
        const declineBogo = $('#declineBogo');
        const $bogoAddressPropety = $('#bogoAddressProperty');

        let propertyAddressName = '';
        let propertyAddressVal = '';

        let aAddressIsValid = true;

        // Check for valid address
        $('.c-contact-form--additional-address input').filter('[required]').each(function(){
          if ($(this).val() === '') {
            aAddressIsValid = false;
          }
        });

        if( ! $("input:radio[name='acceptBogo']").is(":checked")){
          bogoIsValid = false;
          $('[data-submit-button], .c-product-form__select--color').prop('disabled', true).addClass("is-disabled");
        }else{
          bogoIsValid = true;
          $('[data-submit-button], .c-product-form__select--color').prop('disabled', false).removeClass("is-disabled");
        }

        // if(aAddressIsValid == true){
        //   $('.c-product-form').addClass('has-address-valid').removeClass('has-address-not-valid');
        //   $('[data-submit-button]').prop('disabled', false).removeClass("is-disabled");
        // }else{
        //   $('.c-product-form').addClass('has-address-not-valid').removeClass('has-address-valid');
        //   $('[data-submit-button]').prop('disabled', true).addClass("is-disabled");
        //   $('[data-submit-button]').prop('disabled', false).removeClass("is-disabled");
        // }
        //
        //
        // // On load check if bogo is already accepted
        // if (acceptBogo.is(':checked')){
        //   $('.c-product-form').addClass('is-accept-bogo');
        //   acceptBogoStatus = true;
        // }else{
        //   $('.c-product-form').removeClass('is-accept-bogo');
        //   acceptBogoStatus = false;
        //
        // }

        $(document).on('submit', '[data-product-form]', function(e) {
          let variantProperty = '';
          if (acceptBogoStatus == true && aAddressIsValid == true){
            $('.c-contact-form--additional-address input, .c-contact-form--additional-address select').each(function(i){
              let addressLine = $(this).val();
              let inputName = $(this).attr('name');
              let addressSep = ' : ';


              if (inputName == 'propertycolour'){
                variantProperty = 'Colour' + addressSep + addressLine;
              }
              else if (addressLine != '' && i < 1){
                  propertyAddressName += addressLine ;
              }

              else if (addressLine != '' && i >= 1){
                propertyAddressVal += addressLine + addressSep;
              }

            });

            if(variantProperty == ''){
              propertyAddressVal = propertyAddressVal.slice(0, -3)
            }

            $bogoAddressPropety.attr('name', 'properties[' +propertyAddressName+']');
            $bogoAddressPropety.val(propertyAddressVal + variantProperty );


          }
        })

        // On change check if bogo is already accepted
        $(document).on('change click', 'input:radio[name=acceptBogo]', function(e){
          if (acceptBogo.is(':checked')){
            console.log('BOGO Accepted');
            console.log(e);
            acceptBogoStatus = true;
            $('.c-product-form').addClass('is-accept-bogo');

            $('.c-contact-form--additional-address input').filter('[required]').each(function(){
              if ($(this).val() === '') {
                aAddressIsValid = false;
              }
            });

            if(aAddressIsValid == true){

              $('.c-product-form').addClass('has-address-valid').removeClass('has-address-not-valid');

              $('[data-submit-button], .c-product-form__select--color').prop('disabled', false).removeClass("is-disabled");
            }else{
              console.log('BOGO Accepted');
              console.log(e);
              $('.c-product-form').addClass('has-address-not-valid').removeClass('has-address-valid');

              $('[data-submit-button], .c-product-form__select--color').prop('disabled', true).addClass("is-disabled");
              $('[data-submit-button], .c-product-form__select--color').prop('disabled', false).removeClass("is-disabled");
            }

          }
          else{
            console.log('Bogo Declined');
            acceptBogoStatus = false;
            $('.c-product-form').removeClass('is-accept-bogo');
            $('[data-submit-button], .c-product-form__select--color').prop('disabled', false).removeClass("is-disabled");
          }
        });

        $(document).on('keyup', '.c-contact-form__input--additional-address', function() {
          console.log('type that address test');
          aAddressIsValid = true;
          // Check for valid address
          $('.c-contact-form--additional-address input').filter('[required]').each(function(){
            if ($(this).val() === '') {
              aAddressIsValid = false;
            }
          });

          if(aAddressIsValid == true){
            $('.c-product-form').addClass('has-address-valid').removeClass('has-address-not-valid');
            $('[data-submit-button], .c-product-form__select--color').prop('disabled', false).removeClass("is-disabled");
          }else{
            $('.c-product-form').addClass('has-address-not-valid').removeClass('has-address-valid');
            $('[data-submit-button], .c-product-form__select--color').prop('disabled', true).addClass("is-disabled");
            $('[data-submit-button], .c-product-form__select--color').prop('disabled', false).removeClass("is-disabled");
          }
        });
      }

      let remodArray = {};

      $('[data-remodal-id]').each(function(i){
        let dataRemodalId = $(this).attr('data-remodal-id');
        let inst = $(this).remodal();
        remodArray[dataRemodalId] = inst;
      });

      $(document).on('click', '[data-ac-target]', function(e) {
        let remodalId = $(this).attr('data-ac-target');
        e.preventDefault();
        remodArray[remodalId].open();
      });



      $('.single-option-selector').on( 'change', function() {

        console.log('option changed removed');

        // var searchArray = window.location.search;
        //   const urlParams = new URLSearchParams(searchArray);
        //   let urlVariant = urlParams.get('variant');
        //
        //   $('[value="'+ urlVariant +'"]').prop('selected', true);
        //
        //   console.log('urlVariant');
        //   console.log(urlVariant );


      }
      );


      // // add the is-last-block to element for styling
      // $('[data-remodal-id]').each(function(i){
      //   let dataRemodalId = $(this).attr('data-remodal-id');
      //   let inst = $(this).remodal();
      //   remodArray[dataRemodalId] = inst;
      //   console.log('remod found');
      //   console.log(dataRemodalId);
      // });
      //
      //
      //
      // console.log('remodArray');
      // console.log(remodArray);
      //
      // $(document).on('click', '#linkBundleImage', function(e) {
      //   let productId = $(this).attr('data-product-id');
      //   let remodalId = 'modal' + productId;
      //   console.log('image click');
      //   e.preventDefault();
      //   remodArray[remodalId].open();
      // });
      $('.l-page__content-block--product').last().addClass('is-last-block');
      $(document).on('click', '.c-video-popup__link', function() {
        console.log('vid click open');
        inst.open();
      })
    },
    weaning_bundle: function() {
      console.log('properties bundle updated sometest');
      console.log('properties bundle');
      $(document).on('click', '[data-product-single-thumbnail]', function(event) {
        let thumbnail = this;
        let visibleImageWrapper = '[data-product-image-wrapper]:not(hide)';

        $(visibleImageWrapper).addClass('hide');
        $('[data-product-image-wrapper][data-image-id=' + thumbnail.dataset.thumbnailId + ']').removeClass('hide');

        console.log('onThumbnailClick');
        console.log('thumbnail.dataset.thumbnailId');
        console.log(thumbnail.dataset.thumbnailId);
        event.preventDefault();
      });

    },
    ac_landing: function(){
      console.log('ac_landing produst js ql-editor');
      $(document).on('click', '.ql-editor p span',function() {
        var element = this;
        var noteAfter = true;
        ACSHOPIFY.fn.actCopyToClipBoard(element, noteAfter);
      });
}
  },
  cart:{
    init: function() {
      console.log('Some Cart Page ajax');

      let $jsWaiting = $('.is-waiting-for-js-cart');
      $jsWaiting.removeClass('is-waiting-for-js-cart');

      let bogoTotal = 0;
      let additionalShipping = 0;
      jQuery.ajax({
        url: '/cart.js',
        dataType: 'json'
      })
        .done(function(data) {

          let cartItems = data.items;

          $.each(cartItems, function(i,item) {
            let itemId = item.id;
            let itemQty = item.quantity;
            let itemProps = item.properties;
            let itemPropFirst = ' : ';

            if (typeof itemProps === 'object' && itemProps !== null){
              itemPropFirst = itemProps[Object.keys(itemProps)[0]];
            }

            let itemPropFirstArray = [];

            if (itemPropFirst !== undefined){
              itemPropFirstArray = itemPropFirst.split(' : ');
            }

            if(itemPropFirstArray.length > 2){
              bogoTotal += itemQty;
              $jsWaiting.addClass('is-waiting-for-js-cart');
            }

            if(itemId == '32995425976363'){
              additionalShipping += itemQty;
              console.log('This is shipping ' + additionalShipping);
            }


          });


          if (bogoTotal != additionalShipping){
            $.ajax({
              url: '/cart/change.js',
              dataType: 'json',
              method: 'POST',
              data: {
                'id': 32995425976363,
                'quantity': 0
              }
            })
              .done(function() {



                $.ajax({
                  url: '/cart/add.js',
                  dataType: 'json',
                  method: 'POST',
                  data: {
                    'id': 32995425976363,
                    'quantity': bogoTotal
                  }
                })
                  .done(function() {
                    location.reload();
                  });

              });
          }
          else {
            $jsWaiting.removeClass('is-waiting-for-js-cart');
          }


        });



      // if (itemId == '32995425976363'){
      //   console.log('Got shipping - Remove please');
      //   console.log(item)
      //   $.ajax({
      //     url: '/cart/change.js',
      //     dataType: 'json',
      //     method: 'POST',
      //     data: {
      //       'id': 32995425976363,
      //       'quantity': 0
      //     }
      //   })
      //     .done(function(){
      //         location.reload();
      //       }
      //
      //     );
      // }

    },
  },
  search: {
    init: function() {
      // uncomment to debug
      console.log('search page');
      $('#searchFormMain').attr('data-state', 'on' );
    }
  },
  fn: {
    actStateToggleGroup : function (control, stateGroupId, state){
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
    // console.log('actStateToggleSelect element');
    // console.log(element);
    // console.log('actStateToggleSelect state');
    //   console.log(state);
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
        // console.log('elState');
        // console.log(this);
        //
        // console.log(elState);

        if ('off' === elState ) {
          // console.log('click on');
          $(this).attr('data-state', 'on');
          $(container).attr('data-state', 'on');
          $(parent).attr('data-state', 'on');
          $(container).addClass('ac-on');
          document.body.className += ' ' + 'container-is-open';
          window.dispatchEvent(eventActOpen);

        } else {
          // console.log('click off');
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

        // console.log('click off');
        showButton.attr('data-state', 'off');
        closeButton.attr('data-state', 'off');
        $(container).attr('data-state', 'off');
        $(container).removeClass('ac-on');
        document.querySelector('body').classList.remove('container-is-open');

        window.dispatchEvent(eventActClose);

      });
    },
    actCopyToClipBoard: function(element, noteAfter = false){

      var $temp = $("<input>");

      $(element).addClass("u-pos-r");
      $("body").append($temp);
      $temp.val($(element).text()).select();
      document.execCommand("copy");
      $temp.remove();


      if (noteAfter != true){
        var $note = $("<span>").addClass('c-tool-tip--copied').delay( 800 ).fadeOut("slow", function(){
          $note.remove();
        });
        $(element).append($note);
        $note.text('Copied');
      }else{
        $(element).addClass("is-copied");
      }



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
    const  template = body.getAttribute('data-template');
    const  handle = body.getAttribute('data-template-type');

    UTIL.exec('common');
    UTIL.exec(template);
    UTIL.exec(template, handle);
  }
};
$(window).on('load', UTIL.init);
