/**
 * Created by lenovo on 2017/5/9.
 */
//3D效果
'use strict';

var activeIndex = 0;
var limit = 0;
var disabled = false;
var $stage = undefined;
var $controls = undefined;
var canvas = false;

var SPIN_FORWARD_CLASS = 'js-spin-fwd';
var SPIN_BACKWARD_CLASS = 'js-spin-bwd';
var DISABLE_TRANSITIONS_CLASS = 'js-transitions-disabled';
var SPIN_DUR = 1000;

var appendControls = function appendControls() {
  for (var i = 0; i < limit; i++) {
    $('.carousel__control').append('<a href="#" data-index="' + i + '"></a>');
  }


  var height = $('.carousel__control').children().last().outerHeight();

  $('.carousel__control').css('height', 30 + limit * height);
  $controls = $('.carousel__control').children();
  $controls.eq(activeIndex).addClass('active');
};

var setIndexes = function setIndexes() {
  $('.spinner').children().each(function (i, el) {
    $(el).attr('data-index', i);
    limit++;
  });
};

var duplicateSpinner = function duplicateSpinner() {
  var $el = $('.spinner').parent();
  var html = $('.spinner').parent().html();
  $el.append(html);
  $('.spinner').last().addClass('spinner--right');
  $('.spinner--right').removeClass('spinner--left');
};

var paintFaces = function paintFaces() {
  $('.spinner__face').each(function (i, el) {
    var $el = $(el);
    var color = $(el).attr('data-bg');
    $el.children().css('backgroundImage', 'url(' + getBase64PixelByColor(color) + ')');
  });
};

var getBase64PixelByColor = function getBase64PixelByColor(hex) {
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.height = 1;
    canvas.width = 1;
  }
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, 1, 1);
    return canvas.toDataURL();
  }
  return false;
};

var prepareDom = function prepareDom() {
  setIndexes();
  paintFaces();
  duplicateSpinner();
  appendControls();
};

var spin = function spin() {
  var inc = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

  if (disabled) return;
  if (!inc) return;
  activeIndex += inc;
  disabled = true;

  if (activeIndex >= limit) {
    activeIndex = 0;
  }

  if (activeIndex < 0) {
    activeIndex = limit - 1;
  }

  var $activeEls = $('.spinner__face.js-active');
  var $nextEls = $('.spinner__face[data-index=' + activeIndex + ']');
  $nextEls.addClass('js-next');

  if (inc > 0) {
    $stage.addClass(SPIN_FORWARD_CLASS);
  } else {
    $stage.addClass(SPIN_BACKWARD_CLASS);
  }

  $controls.removeClass('active');
  $controls.eq(activeIndex).addClass('active');

  setTimeout(function () {
    spinCallback(inc);
  }, SPIN_DUR, inc);
};

var spinCallback = function spinCallback(inc) {

  $('.js-active').removeClass('js-active');
  $('.js-next').removeClass('js-next').addClass('js-active');
  $stage.addClass(DISABLE_TRANSITIONS_CLASS).removeClass(SPIN_FORWARD_CLASS).removeClass(SPIN_BACKWARD_CLASS);

  $('.js-active').each(function (i, el) {
    var $el = $(el);
    $el.prependTo($el.parent());
  });
  setTimeout(function () {
    $stage.removeClass(DISABLE_TRANSITIONS_CLASS);
    disabled = false;
  }, 100);
};

var attachListeners = function attachListeners() {

  document.onkeyup = function (e) {
    switch (e.keyCode) {
      case 38:
        spin(-1);
        break;
      case 40:
        spin(1);
        break;
    }
  };

  $controls.on('click', function (e) {
    e.preventDefault();
    if (disabled) return;
    var $el = $(e.target);
    var toIndex = parseInt($el.attr('data-index'), 10);
    spin(toIndex - activeIndex);
  });
};

var assignEls = function assignEls() {
  $stage = $('.carousel__stage');
};

var init = function init() {
  assignEls();
  prepareDom();
  attachListeners();
};

$(function () {
  init();
});