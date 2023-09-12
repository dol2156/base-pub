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

