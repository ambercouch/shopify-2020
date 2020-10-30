!function(e){function t(t){for(var n,o,u=t[0],c=t[1],s=t[2],l=0,p=[];l<u.length;l++)o=u[l],a[o]&&p.push(a[o][0]),a[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(d&&d(t);p.length;)p.shift()();return i.push.apply(i,s||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,u=1;u<r.length;u++){var c=r[u];0!==a[c]&&(n=!1)}n&&(i.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},a={6:0},i=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var u=window.shopifySlateJsonp=window.shopifySlateJsonp||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var s=0;s<u.length;s++)t(u[s]);var d=c;i.push([131,0,1]),r()}({11:function(e,t,r){"use strict";var n=s(r(26)),a=s(r(27)),i=r(37),o=r(36),u=r(10),c=r(16);function s(e){return e&&e.__esModule?e:{default:e}}var d="hide",l={submitButton:"[data-submit-button]",submitButtonText:"[data-submit-button-text]",comparePrice:"[data-compare-price]",comparePriceText:"[data-compare-text]",priceWrapper:"[data-price-wrapper]",imageWrapper:"[data-product-image-wrapper]",visibleImageWrapper:"[data-product-image-wrapper]:not(.hide)",imageWrapperById:function(e){return l.imageWrapper+"[data-image-id='"+e+"']"},productForm:"[data-product-form]",productPrice:"[data-product-price]",thumbnail:"[data-product-single-thumbnail]",thumbnailById:function(e){return"[data-thumbnail-id='"+e+"']"},thumbnailActive:"[data-product-single-thumbnail][aria-current]",variantNotice:"[data-variant-notice]"};(0,u.register)("product",{onLoad:function(){var e=this;return(0,a.default)(n.default.mark(function t(){var r;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=document.querySelector(l.productForm),t.next=3,e.getProductJson(r.dataset.productHandle);case 3:e.product=t.sent,e.productForm=new i.ProductForm(r,e.product,{onOptionChange:e.onFormOptionChange.bind(e)}),e.onThumbnailClick=e.onThumbnailClick.bind(e),e.onThumbnailKeyup=e.onThumbnailKeyup.bind(e),e.container.addEventListener("click",e.onThumbnailClick),e.container.addEventListener("keyup",e.onThumbnailKeyup);case 9:case"end":return t.stop()}},t,e)}))()},onUnload:function(){this.productForm.destroy(),this.removeEventListener("click",this.onThumbnailClick),this.removeEventListener("keyup",this.onThumbnailKeyup)},getProductJson:function(e){return fetch("/products/"+e+".js").then(function(e){return e.json()})},onFormOptionChange:function(e){console.log("onFormOptionChange Preorder test");var t=e.dataset.variant;this.renderImages(t),this.renderPrice(t),this.renderComparePrice(t),this.renderSubmitButton(t),this.renderVariantNotice(t),this.updateBrowserHistory(t);var r=window.location.search,n=new URLSearchParams(r).get("variant");$('[value="'+n+'"]').prop("selected",!0)},onThumbnailClick:function(e){var t=e.target.closest(l.thumbnail);t&&(e.preventDefault(),this.renderFeaturedImage(t.dataset.thumbnailId),this.renderActiveThumbnail(t.dataset.thumbnailId))},onThumbnailKeyup:function(e){if(13===e.keyCode&&e.target.closest(l.thumbnail)){var t=this.container.querySelector(l.visibleImageWrapper);(0,c.forceFocus)(t)}},renderSubmitButton:function(e){var t=this.container.querySelector(l.submitButton),r=this.container.querySelector(l.submitButtonText),n=e.id,a=this.container.querySelector('[data-variant-id="'+n+'"]');if(a)var i=a.dataset.variantQty,o=a.dataset.variantPolicy;else i=!1,o=!1;e?e.available&&i>0?(t.disabled=!1,r.innerText=theme.strings.addToCart):i<1&&"continue"==o?(t.disabled=!1,r.innerText="Pre-order"):(t.disabled=!0,r.innerText=theme.strings.soldOut):(t.disabled=!0,r.innerText=theme.strings.unavailable)},renderVariantNotice:function(e){var t=this.container.querySelector(l.variantNotice),r=e.id,n=this.container.querySelector('[data-variant-id="'+r+'"]');if(n)var a=n.dataset.variantQty,i=n.dataset.variantPolicy;else a=!1,i=!1;a<1&&"continue"==i?(t.classList.add("is-shown"),t.classList.remove("is-hidden")):(t.classList.remove("is-shown"),t.classList.add("is-hidden"))},renderImages:function(e){e&&null!==e.featured_image&&(this.renderFeaturedImage(e.featured_image.id),this.renderActiveThumbnail(e.featured_image.id))},renderPrice:function(e){var t=this.container.querySelector(l.productPrice);this.container.querySelector(l.priceWrapper).classList.toggle(d,!e),e&&(t.innerText=(0,o.formatMoney)(e.price,theme.moneyFormat))},renderComparePrice:function(e){if(e){var t=this.container.querySelector(l.comparePrice),r=this.container.querySelector(l.comparePriceText);t&&r&&(e.compare_at_price>e.price?(t.innerText=(0,o.formatMoney)(e.compare_at_price,theme.moneyFormat),r.classList.remove(d),t.classList.remove(d)):(t.innerText="",r.classList.add(d),t.classList.add(d)))}},renderActiveThumbnail:function(e){var t=this.container.querySelector(l.thumbnailById(e)),r=this.container.querySelector(l.thumbnailActive);t!==r&&(r.removeAttribute("aria-current"),t.setAttribute("aria-current",!0))},renderFeaturedImage:function(e){var t=this.container.querySelector(l.visibleImageWrapper),r=this.container.querySelector(l.imageWrapperById(e));t.classList.add(d),r.classList.remove(d)},updateBrowserHistory:function(e){var t=this.productForm.element.dataset.enableHistoryState;if(e&&"true"===t){console.log("some test");var r=(0,i.getUrlWithVariant)(window.location.href,e.id);window.history.replaceState({path:r},"",r)}}})},131:function(e,t,r){"use strict";var n=r(10);r(11),(0,n.load)("*")}});