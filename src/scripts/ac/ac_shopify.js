/**
 * Created by Richard on 19/09/2016.
 */

console.log('ACSHOPIFY');
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

      // var elem = document.querySelector('.c-gallery-slider');
      // var flkty = new Flickity( elem, {
      //   // options
      //   cellAlign: 'left',
      //   contain: true,
      //   imagesLoaded: true,
      //   pageDots: false,
      //   autoPlay: 4000
      // });

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
