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
  var element = this;
  
  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = duration + 'ms';
  element.style.display = 'block';
  element.style.overflow = 'hidden';
  
  // offsetHeight을 사용하여 최종 높이 계산
  var height = element.scrollHeight;

  // 초기 높이 설정 후 애니메이션 효과 적용
  element.style.height = '0';

  // setTimeout을 사용하여 다음 프레임에서 최종 높이로 애니메이션 효과 적용
  setTimeout(function () {
    element.style.height = height + 'px';
    // 애니메이션 완료 후 초기 스타일 복원 (선택 사항)
    // setTimeout(function () {
    //   element.removeAttribute('style');
    // }, duration);
  }, 0);
};

/**
 * 위로 접는 슬라이드 애니메이션
 * @param duration
 */
HTMLElement.prototype.slideUp = function (duration = 400) {
  var element = this;
  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = duration + 'ms';
  element.style.display = 'block';
  element.style.overflow = 'hidden';
  
  // 현재 높이를 가져옴
  var height = element.scrollHeight;

  // 현재 높이에서 애니메이션 효과 적용하여 숨김 처리
  requestAnimationFrame(function () {
    element.style.height = height + 'px';
    setTimeout(function () {
      element.style.height = '0';
      // setTimeout(function () {
      //   // 초기 스타일 복원 (선택 사항)
      //   element.removeAttribute('style');
      // }, duration);
    }, 0);
  });
};