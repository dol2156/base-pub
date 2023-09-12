const ori_proto_method_list = Object.getOwnPropertyNames(HTMLElement.prototype);

/**
 * 클래스 추가
 * @param className
 * ex)
 * el_target.addClass('Focus');
 */
HTMLElement.prototype.addClass = function (className) {
  // 클래스 이름을 추가하는 로직 작성
  // 예시로 classList.add를 사용하여 클래스 이름 추가
  this.classList.add(className);
};

/**
 * 클래스 제거
 * @param className
 */
HTMLElement.prototype.removeClass = function (className) {
  // 클래스 이름을 제거하는 로직 작성
  // 예시로 classList.remove를 사용하여 클래스 이름 제거
  this.classList.remove(className);
};

/**
 * 클래스 소유 여부 반환
 * @param className
 * @returns {boolean}
 */
HTMLElement.prototype.hasClass = function (className) {
  return this.classList.contains(className);
};

/**
 * 형제 요소 반환
 * @param selector
 * @returns {*[]}
 */
HTMLElement.prototype.siblings = function (selector) {
  var siblings = [];
  var currentNode = this.parentNode.firstChild;

  while (currentNode) {
    if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode !== this) {
      if (!selector || currentNode.matches(selector)) {
        siblings.push(currentNode);
      }
    }

    currentNode = currentNode.nextSibling;
  }

  return siblings;
};

/**
 * display block
 */
HTMLElement.prototype.show = function () {
  this.style.display = 'block';
};

/**
 * display none
 */
HTMLElement.prototype.hide = function () {
  this.style.display = 'none';
};

/**
 * 아래로 펼치는 슬라이드 애니메이션
 * @param duration
 */
HTMLElement.prototype.slideDown = function (duration = 400) {
  // var element = this;
  //
  // element.style.display = 'block';
  // var height = element.scrollHeight + 'px'; // Get it's height
  // element.style.height = '0px'; // Reset to zero
  //
  // setTimeout(function () {
  //   element.style.transitionProperty = 'height';
  //   element.style.transitionDuration = duration + 'ms';
  //   element.style.height = height;
  // }, 0);
};

/**
 * 위로 접는 슬라이드 애니메이션
 * @param duration
 */
HTMLElement.prototype.slideUp = function (duration = 400) {
  // var element = this;
  // setTimeout(function () {
  //   element.style.transitionProperty = 'height';
  //   element.style.transitionDuration = duration + 'ms';
  //   element.style.height = '0px';
  // }, 0);
  //
  // setTimeout(function () {
  //   // when transition finished hide it all
  //   element.style.display = 'none';
  // }, duration);
};
