/**
 * Created by Richard on 19/09/2016.
 */

console.log('ACSHOPIFY test collection');
const ACSHOPIFY = {
  common: {
    init: function() {
      jQuery('body').addClass('ac-jquery-loaded');
      'use strict';
      //uncomment to debug

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
        console.log('data-control found');
        const containerId = $(this).attr('data-control');

        console.log('containerId');
        console.log(containerId);

        const controlSelector = (containerId != '' )? '[data-control='+ containerId + ']' : this;

        const control = $(controlSelector);

        const controlGroupId = control.attr('data-state-group');

        const containerSelector = (containerId != '' )? '[data-container='+ containerId + ']' : '[data-container]';

        const container = $(containerSelector);

        control.off('click');

        control.on('click',  function (e) {
          console.log('clickered');
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
      console.log('pages');
    }
  },
  collection: {
    init: function() {
      // uncomment to debug
      console.log('collection');
    },
    bundles: function() {
      // uncomment to debug
      console.log('collection bundles');

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
      let elOffPageBundleNoticeb = document.getElementById('offPageBundleNotice');
      let elCartBtn =$('.c-btn--buy-bundle');

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

          elBundleList.append('<div class="bundle-cart__item" id="bundleItem'+ obj.variantId +'" ><p><span class="bundle-cart__title--shortName">' + obj.productShortName + '</span><span class="bundle-cart__title">' + obj.productTitle + '</span><br><small>'+obj.variantTitle +' </small>' + '</p></div>');

          $('#bundleItem' + obj.variantId).append('<input data-variant-id="'+ obj.variantId +'" class="bundle-item-qty" type=number min="0" value=' + obj.qty + '>')


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
      function bundleAddItem(variantId, variantTitle, variantPrice, productTitle, productShortName, qty){
        qty = (typeof qty == 'undefined') ? 1 : qty;
        bundledProducts[variantId] =  bundledProducts[variantId] || {};
        bundledProducts[variantId].variantTitle = variantTitle;
        bundledProducts[variantId].variantId = variantId;
        bundledProducts[variantId].productTitle  = productTitle;
        bundledProducts[variantId].variantPrice  = variantPrice;
        bundledProducts[variantId].productShortName  = productShortName;
        if (bundledProducts[variantId].hasOwnProperty('qty')){
          bundledProducts[variantId].qty  = bundledProducts[variantId].qty + qty;
        }else{
          bundledProducts[variantId].qty  = qty;
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
          elOffPageBundleNoticeb.classList.remove('is-open');
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
          $(elCartBtn).prop("disabled", false)
        }else{
          $(elCartBtn).prop("disabled", true)
        }
      }



      $(document).on('click', '.l-off-page__tab', function(){
        console.log('tab clicked class added')
        elOffPageBundleNoticeb.classList.add('is-open');
      });

      $(document).on('click', '.is-open .l-off-page__tab', function(){
        console.log('tab clicked class added')
        elOffPageBundleNoticeb.classList.remove('is-open');
      });

      $(document).on('click', '.l-off-page__close', function(){
        console.log('tab clicked class added')
        elOffPageBundleNoticeb.classList.remove('is-open');
        //elOffPageBundleNoticeb.classList.add('is-close-quick');
      });

      // $(document).on('mouseover', '.l-off-page__tab', function(){
      //     console.log('tab hovered')
      //     elOffPageBundleNoticeb.classList.add('is-open');
      //     //elOffPageBundleNoticeb.classList.remove('is-close-quick');
      // });





      // Add a new item to the bundle
      $('.c-product-form__form').submit(function (e) {
        e.preventDefault();
        elOffPageBundleNoticeb.classList.remove('is-close-quick');
        elOffPageBundleNoticeb.classList.add('is-open');
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
        let productShortName = $('input[name=productShortName]',this).val();

        console.log('variantPrice');
        console.log(variantPrice);

        bundleAddItem(variantId, variantTitle, variantPrice, productTitle, productShortName );

        const entries = Object.entries(bundledProducts);

        updateBundleList(entries);
        updateBundleQty(entries);

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

        updateElCartBtn();


      });


      //add bundle to cart
      $(document).on('click', '#AddBundleToCartHeader, #AddBundleToCartFooter, #AddBundleToCartOffPage', function () {
        let entries = Object.entries(bundledProducts);
        let values = {};

        window.onbeforeunload = true;

        console.log('#AddBundleToCartHeader jQuery post updates')

        for (const [product, obj] of entries) {
          values[obj.variantId] = obj.qty;
        }

        $.ajax({
          type: "POST",
          url: '/cart/update.js',
          data: {updates: values},
          dataType: 'json',
          success: function () {
            window.location.href = "https://bibado.co.uk/cart";
          },
          error: function () {
            console.log('we have and error');
          }
        });

      })

      //on update bundle item quantity
      $(document).on('change', '.bundle-item-qty', function(e){
        e.preventDefault();
        elOffPageBundleNoticeb.classList.remove('is-close-quick');
        elOffPageBundleNoticeb.classList.add('is-open');
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
      console.log('product');
      // add the is-last-block to element for styling
      $('.l-page__content-block--product').last().addClass('is-last-block');
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
    console.log('element');
    console.log(element);
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
    const  template = body.getAttribute('data-template');
    const  handle = body.getAttribute('data-template-type');

    UTIL.exec('common');
    UTIL.exec(template);
    UTIL.exec(template, handle);
  }
};
$(window).on('load', UTIL.init);
