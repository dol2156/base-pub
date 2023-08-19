/**
 * 스크롤 동작이 끝나면
 * scroll_end 커스텀 이벤트 발생
 */
(() => {
  let isScrolling;
  window.addEventListener(
    'scroll',
    (e) => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(
        () => {
          const event = new Event('scroll_end');
          window.dispatchEvent(event);
        },
        150,
        false,
      );
    },
    false,
  );
})();

/**
 * DOM 의 class 가 변경되면,
 * change_class 커스텀 이벤트 발생
 */
(() => {
  // 감지 옵션 (감지할 변경)
  const config = { attributes: true, subtree: true };

  // 변경 감지 시 실행할 콜백 함수
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        // class 변경 감지 후 target 으로 이벤트 발송
        const target = mutation.target;
        const event = new Event('change_class');
        target.dispatchEvent(event);
      }
    }
  };

  // 콜백 함수에 연결된 감지기 인스턴스 생성
  const observer = new MutationObserver(callback);

  // 설정한 변경의 감지 시작
  observer.observe(document.documentElement, config);

  // 이후 감지 중단 가능
  // observer.disconnect();
})();

/**
 * 자식이 1개일때 자식에게 FixedShell 클래스를 주면
 * 자식의 포지션이 공중에 뜨더라도 부모의 너비가 유지되도록 유지
 * <div class="RR relative">
 *   <div class="FixedShell absolute left-[0] top-[0] z-10">
 *     ...
 *   </div>
 * </div>
 */
function updateFixedShell() {
  const el_fs = [...document.querySelectorAll('.FixedShell')];
  el_fs.forEach((el, idx) => {
    const el_parent = el.parentElement;
    const fs_hei = el.offsetHeight;
    el_parent.style.setProperty('height', `${fs_hei}px`);
  });
}

/**
 * .StickyBox > .FixedShell 의 DOM 규칙을 갖고
 * .StickyBox 의 data-sticky-offset 의 값을 읽어와서 Sticky 처리함
 */
function updateStickyBox() {
  const el_list = [...document.querySelectorAll('.StickyBox')];

  el_list.forEach((el, idx) => {
    checkSticky(el);
  });

  function checkSticky(target) {
    const shell = target.querySelector(`:scope > .FixedShell`);
    if (!shell) return;
    const box_wid = target.offsetWidth;
    shell.style.setProperty('width', `${box_wid}px`);

    const y = target.getBoundingClientRect().y;
    let offset = parseInt(target.getAttribute(`data-sticky-offset`));
    if (isNaN(offset)) offset = 0;

    if (y >= offset) {
      target.classList.remove('Sticky');
      shell.style.removeProperty('position');
      shell.style.removeProperty('top');
    } else {
      target.classList.add('Sticky');
      shell.style.setProperty('position', 'fixed');
      shell.style.setProperty('top', `${offset}px`);
    }
  }
}

const UpdateDisplay = () => {
  updateFixedShell();
  updateStickyBox();
};

window.addEventListener('DOMContentLoaded', (event) => {
  UpdateDisplay();
});

window.addEventListener('resize', (evt) => {
  UpdateDisplay();
});

window.addEventListener('scroll', (evt) => {
  UpdateDisplay();
});