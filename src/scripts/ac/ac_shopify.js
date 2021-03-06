/**
 * Created by Richard on 19/09/2016.
 */

console.log('ACSHOPIFY state toggle multi control');
ACSHOPIFY = {
  common: {
    init: function() {
      'use strict';
      //uncomment to debug

      let elem = document.querySelector('.c-quote-list__list');
      let flkty = new Flickity( elem, {
        // options
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
      });

      $('[data-control]').each(function() {

        console.log('data-state');

        let containerId = $(this).attr('data-control');

        let controlSelector = (containerId != '' )? '[data-control='+ containerId + ']' : this;

        let control = $(controlSelector);
        console.log(control);
        let controlGroupId = control.attr('data-state-group');

        let containerSelector = (containerId != '' )? '[data-container='+ containerId + ']' : '[data-container]';
        let container = $(containerSelector);
        control.off('click');
        control.on('click',  function (e) {

          let state = control.attr('data-state');
          console.log('state');
          console.log(state);
          e.preventDefault();

          ACSHOPIFY.fn.actStateToggleSelect(control, state);

          if (controlGroupId){

            ACSHOPIFY.fn.actStateToggleGroup(control, controlGroupId);

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
  fn:{
    actStateToggleGroup : function (control, stateGroupId){
      $('[data-state-group='+stateGroupId+']').not(control).attr('data-state', 'off');
    },
    actStateToggleSelect : function (control, state) {
      if('off' === state ){
        control.attr('data-state', 'on');
      }
      if('on' === state){
        control.attr('data-state', 'off')
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
