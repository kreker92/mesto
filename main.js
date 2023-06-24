(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,n(o.key),o)}}function r(t,e,r){return(e=n(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function n(e){var r=function(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===t(r)?r:String(r)}var o=function(){function t(e,n,o,i,u,c){var a=this,l=e.name,s=e.link,f=e.likes,p=e._id,y=e.owner;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),r(this,"_card",null),r(this,"_cardLikeActiveClass","cards__like_active"),r(this,"remove",(function(){a._card.remove(),a._card=null})),r(this,"_toggleLike",(function(){a._likeEl.classList.toggle(a._cardLikeActiveClass),a._setLike()})),r(this,"_doIlikeIt",(function(){return a._likes.some((function(t){return t._id===a._currentUserId}))})),this._id=p,this._name=l,this._link=s,this._likes=f,this._template=n,this._handleLinkClick=o,this._setLike=i,this._ownerId=null==y?void 0:y._id,this._currentUserId=u,this._confirm=c}var n,o;return n=t,(o=[{key:"get",value:function(){return this._card||this._set(),this._card}},{key:"getId",value:function(){return this._id}},{key:"_set",value:function(){var t=this,e=this._name,r=this._link,n=this._template.querySelector(".cards__card").cloneNode(!0),o=n.querySelector(".cards__name"),i=n.querySelector(".cards__image-link"),u=n.querySelector(".cards__image"),c=n.querySelector(".cards__trash");this._likeEl=n.querySelector(".cards__like"),this._likeCountEl=n.querySelector(".cards__like-count"),o.textContent=e,u.setAttribute("alt",e),u.setAttribute("src",r),this._doIlikeIt()&&this._likeEl.classList.toggle(this._cardLikeActiveClass),i.addEventListener("click",(function(n){return t._handleLinkClick(n,{name:e,link:r})})),this._likeEl.addEventListener("click",this._toggleLike),this._likeCountEl.textContent=this._renderLikesCount(),this._currentUserId===this._ownerId?c.addEventListener("click",(function(){return t._confirm()})):c.remove(),this._card=n}},{key:"_renderLikesCount",value:function(){return this._likes.length?this._likes.length:""}}])&&e(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),t}();function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function c(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,l(n.key),n)}}function a(t,e,r){return(e=l(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function l(t){var e=function(t,e){if("object"!==i(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==i(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===i(e)?e:String(e)}var s=function(){function t(e){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),a(this,"_fetch",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({headers:r.headers},e);return fetch(t,n).then((function(t){return t.ok?t.json():Promise.reject(t.status)}))})),this._baseUrl=e.baseUrl,this._userUrl=e.userUrl,this.headers=e.headers}var e,r;return e=t,(r=[{key:"getInitialCards",value:function(t){return this._fetch("".concat(this._baseUrl,"/").concat(t))}},{key:"addCard",value:function(t,e){return this._fetch("".concat(this._baseUrl,"/").concat(t),{method:"POST",body:JSON.stringify(e)})}},{key:"delCard",value:function(t){return this._fetch("".concat(this._baseUrl,"/").concat(t),{method:"DELETE"})}},{key:"setLike",value:function(t,e){return this._fetch("".concat(this._baseUrl,"/").concat(t),e)}},{key:"getUserInfo",value:function(){return this._fetch(this._userUrl)}},{key:"setUserInfo",value:function(t,e){return this._fetch(e?"".concat(this._baseUrl,"/").concat(e):this._userUrl,{method:"PATCH",body:JSON.stringify(t)})}}])&&c(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function p(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,y(n.key),n)}}function y(t){var e=function(t,e){if("object"!==f(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===f(e)?e:String(e)}var b=function(){function t(e,r){var n,o,i,u=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,i=function(){u._inputList.forEach((function(t){u._hideInputError(t)}))},(o=y(o="resetFormValidation"))in n?Object.defineProperty(n,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[o]=i,this._formEl=r,this._selectors=e,this._buttonEl=this._formEl.querySelector(this._selectors.submitButtonSelector),this._inputList=Array.from(this._formEl.querySelectorAll(this._selectors.inputSelector))}var e,r;return e=t,(r=[{key:"_getErrorEl",value:function(t){return this._formEl.querySelector(".".concat(t.id,"-error"))}},{key:"_showInputError",value:function(t){var e=this._getErrorEl(t);e.classList.add(this._selectors.errorClass),e.textContent=t.validationMessage,t.classList.add(this._selectors.inputErrorClass)}},{key:"_hideInputError",value:function(t){var e=this._getErrorEl(t);e.classList.remove(this._selectors.errorClass),e.textContent="",t.classList.remove(this._selectors.inputErrorClass)}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"toggleButtonState",value:function(){this._inputList.some((function(t){return!t.validity.valid}))?(this._buttonEl.classList.add(this._selectors.inactiveButtonClass),this._buttonEl.disabled=!0):(this._buttonEl.classList.remove(this._selectors.inactiveButtonClass),this._buttonEl.disabled=!1)}},{key:"_setValidationEventListeners",value:function(){var t=this;this.toggleButtonState(),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t.toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setValidationEventListeners()}}])&&p(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function d(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==v(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==v(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===v(o)?o:String(o)),n)}var o}var m=function(){function t(e,r){var n=e.items,o=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._items=n,this._renderer=o,this._selector=r,this._wrapperEl=document.querySelector(r)}var e,r;return e=t,(r=[{key:"_clear",value:function(){this._wrapperEl.innerHTML=""}},{key:"setItems",value:function(t){var e=this;this._clear(),this._items.forEach((function(r){e.addItem(r,t)}))}},{key:"initItems",value:function(t){this._items=t}},{key:"addItem",value:function(t){var e;this._wrapperEl.prepend(this._renderer.apply(this,function(t){if(Array.isArray(t))return h(t)}(e=t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return h(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()))}}])&&d(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function g(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,w(n.key),n)}}function S(t,e,r){return(e=w(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function w(t){var e=function(t,e){if("object"!==_(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==_(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===_(e)?e:String(e)}var E=function(){function t(e){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),S(this,"close",(function(){r._popupEl.classList.remove(r._openedClass),document.removeEventListener("keydown",r._handleEscClose)})),S(this,"_handleEscClose",(function(t){"Escape"===t.key&&r.close()})),this._selector=e,this._popupEl=document.querySelector(this._selector),this._class="popup",this._openedClass="popup_opened",this._btnCloseClass="popup__close"}var e,r;return e=t,(r=[{key:"_renderLoading",value:function(t){t.textContent="Сохранение..."}},{key:"open",value:function(){this._popupEl.classList.add(this._openedClass),document.addEventListener("keydown",this._handleEscClose)}},{key:"_setEventListeners",value:function(){var t=this;this._popupEl.addEventListener("click",(function(e){var r=e.target.classList.contains(t._class),n=e.target.classList.contains(t._btnCloseClass);(r||n)&&t.close()}))}}])&&g(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function j(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==O(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==O(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===O(o)?o:String(o)),n)}var o}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=L(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},k.apply(this,arguments)}function P(t,e){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},P(t,e)}function L(t){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},L(t)}var C=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&P(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=L(n);if(o){var r=L(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===O(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t,_popupEl))._imageEl=e._popupEl.querySelector(".popup__slide-image"),e._titleEl=e._popupEl.querySelector(".popup__slide-title"),e}return e=u,(r=[{key:"setEventListeners",value:function(){k(L(u.prototype),"_setEventListeners",this).call(this)}},{key:"open",value:function(t){var e=t.name,r=t.link;this._imageEl.setAttribute("alt",e),this._imageEl.setAttribute("src",r),this._titleEl.textContent=e,k(L(u.prototype),"open",this).call(this)}}])&&j(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(E);function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function T(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,x(n.key),n)}}function R(){return R="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=U(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},R.apply(this,arguments)}function q(t,e){return q=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},q(t,e)}function D(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function U(t){return U=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},U(t)}function x(t){var e=function(t,e){if("object"!==I(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==I(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===I(e)?e:String(e)}var A=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&q(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=U(n);if(o){var r=U(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===I(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return D(t)}(this,t)});function u(t,e){var r,n,o,c;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),n=D(r=i.call(this,t)),c=function(){return Object.fromEntries(Array.from(r._inputList).map((function(t){return[t.name,t.value]})))},(o=x(o="_getInputValues"))in n?Object.defineProperty(n,o,{value:c,enumerable:!0,configurable:!0,writable:!0}):n[o]=c,r._handleSubmit=e,r._form=r._popupEl.querySelector(".popup__form"),r._inputList=r._form.querySelectorAll(".popup__input"),r}return e=u,(r=[{key:"setEventListeners",value:function(){var t=this;R(U(u.prototype),"_setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){var r=e.target.querySelector('button[type="submit"]'),n=r.textContent;t._renderLoading(r),t._handleSubmit(e,t._getInputValues(),(function(){r.textContent=n}))}))}}])&&T(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(E);function B(t){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function V(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==B(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==B(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===B(o)?o:String(o)),n)}var o}function F(){return F="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=N(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},F.apply(this,arguments)}function M(t,e){return M=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},M(t,e)}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}var H=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&M(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=N(n);if(o){var r=N(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===B(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),i.call(this,t,e)}return e=u,(r=[{key:"setObjToDel",value:function(t){this._objToDel=t}},{key:"setEventListeners",value:function(){var t=this;F(N(u.prototype),"_setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){var r=e.target.querySelector('button[type="submit"]'),n=r.textContent;t._renderLoading(r),t._handleSubmit(e,t._getInputValues(),(function(){r.textContent=n,t.close()}),t._objToDel)}))}}])&&V(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(A);function J(t){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},J(t)}function z(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==J(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==J(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===J(o)?o:String(o)),n)}var o}var $=function(){function t(e){var r=e.nameSelector,n=e.aboutSelector,o=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._nameEl=document.querySelector(r),this._rankEl=document.querySelector(n),this._avatarEl=document.querySelector(o),this._data=null}var e,r;return e=t,(r=[{key:"get",value:function(){return this._data}},{key:"getId",value:function(){var t;return null===(t=this._data)||void 0===t?void 0:t._id}},{key:"set",value:function(t){this._data=t;var e=this._data,r=e.name,n=e.about,o=e.avatar;this._nameEl.textContent=r,this._rankEl.textContent=n,o&&(this._avatarEl.src=o,this._avatarEl.classList.add("profile__avatar_loaded"))}}])&&z(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function G(t){return G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},G(t)}function K(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function Q(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?K(Object(r),!0).forEach((function(e){W(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function W(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==G(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==G(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===G(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var X={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Y=new s({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-69",userUrl:"https://nomoreparties.co/v1/cohort-69/users/me",headers:{authorization:"273f898a-668c-4a86-9498-3178bf3f9387","Content-Type":"application/json"}}),Z=document.forms["profile-info"],tt=new b(X,Z);tt.enableValidation();var et=new $({nameSelector:".profile__name",aboutSelector:".profile__about",avatarSelector:".profile__avatar"}),rt=Y.getUserInfo().then((function(t){et.set(t)})).catch((function(t){console.log("Ошибка: ".concat(t))})),nt=new A(".popup-profile",(function(t,e,r){t.preventDefault(),Y.setUserInfo(Q(Q({},et.get()),e)).then((function(t){et.set(t),r(),tt.toggleButtonState(),nt.close()})).catch((function(t){console.log("Ошибка: ".concat(t))}))}));nt.setEventListeners(),document.querySelector(".profile__edit").addEventListener("click",(function(){var t=et.get(),e=t.name,r=t.about;Z.elements.name.value=e,Z.elements.about.value=r,tt.resetFormValidation(),nt.open()}));var ot=document.forms["profile-avatar-edit"],it=new b(X,ot);it.enableValidation();var ut=new A(".popup-avatar-edit",(function(t,e,r){var n=e.avatar;t.preventDefault(),Y.setUserInfo({avatar:n},"/users/me/avatar").then((function(t){et.set(t),r(),ut.close()})).catch((function(t){console.log("Ошибка: ".concat(t))}))}));ut.setEventListeners(),document.querySelector(".profile__avatar-edit").addEventListener("click",(function(){var t=et.get().avatar;ot.elements.avatar.value=t,it.resetFormValidation(),it.toggleButtonState(),ut.open()}));var ct=new C(".popup_type_slide");function at(t,e){t.preventDefault(),ct.open(e)}ct.setEventListeners();var lt=document.querySelector("#card").content,st=new m({items:[],renderer:function(t,e){return new o(t,lt,at,(function(){var t=this;Y.setLike("cards/".concat(this._id,"/likes"),{method:this._likes.map((function(t){return t._id})).includes(this._currentUserId)?"DELETE":"PUT"}).then((function(e){t._likes=e.likes,t._likeCountEl.textContent=t._renderLikesCount()})).catch((function(t){console.log("Ошибка: ".concat(t))}))}),e,(function(){ft.setObjToDel(this),ft.open()})).get()}},".cards__list");rt.then((function(){Y.getInitialCards("cards").then((function(t){t.reverse(),st.initItems(t),st.setItems(et,et.getId())})).catch((function(t){console.log("Ошибка: ".concat(t))}))})).catch((function(t){console.log("Ошибка: ".concat(t))}));var ft=new H(".popup-confirm",(function(t,e,r,n){t.preventDefault(),Y.delCard("cards/".concat(n.getId())).then((function(){n&&n.remove(),r()})).catch((function(t){console.log("Ошибка: ".concat(t))}))}));ft.setEventListeners();var pt=document.forms["card-info"],yt=new b(X,pt);yt.enableValidation();var bt=new A(".popup-card",(function(t,e,r){t.preventDefault(),Y.addCard("cards",e).then((function(t){Object.keys(t).length&&(st.addItem(t,et.getId()),pt.reset(),yt.toggleButtonState()),bt.close(),r()})).catch((function(t){console.log("Ошибка: ".concat(t))}))}));bt.setEventListeners(),document.querySelector(".profile__add").addEventListener("click",(function(){yt.resetFormValidation(),bt.open()}))})();