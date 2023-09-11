/**
 * addClass 메서드 정의
 * @param className
 * ex)
 * el_target.addClass('Focus');
 */
HTMLElement.prototype.addClass = function(className) {
  // 클래스 이름을 추가하는 로직 작성
  // 예시로 classList.add를 사용하여 클래스 이름 추가
  this.classList.add(className);
};

/**
 * removeClass 메서드 정의
 * @param className
 */
HTMLElement.prototype.removeClass = function(className) {
  // 클래스 이름을 제거하는 로직 작성
  // 예시로 classList.remove를 사용하여 클래스 이름 제거
  this.classList.remove(className);
};