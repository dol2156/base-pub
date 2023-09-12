const ori_proto_method_list = Object.getOwnPropertyNames(HTMLElement.prototype);

/**
 * 클래스 추가
 * @param className
 * ex)
 * el_target.addClass('Focus');
 */
HTMLElement.prototype.addClass = function (classNames) {
  var classes = classNames.split(' ');
  for (var i = 0; i < classes.length; i++) {
    this.classList.add(classes[i]);
  }
  return this;
};

/**
 * 클래스 제거
 * @param className
 */
HTMLElement.prototype.removeClass = function (classNames) {
  var classes = classNames.split(' ');
  for (var i = 0; i < classes.length; i++) {
    this.classList.remove(classes[i]);
  }
  return this;
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

let originalDisplayValues = new Map();

/**
 *
 */
HTMLElement.prototype.hide = function() {
    originalDisplayValues.set(this, this.style.display);
    this.style.display = 'none';
};

/**
 *
 */
HTMLElement.prototype.show = function() {
    if (originalDisplayValues.has(this)) {
        this.style.display = originalDisplayValues.get(this);
        originalDisplayValues.delete(this);
    } else {
        this.style.display = '';
    }
};

/**
 *
 * @param attributeName
 * @param value
 * @returns {HTMLElement|string}
 */
HTMLElement.prototype.attr = function (attributeName, value) {
  if (value === undefined) {
    // getter
    return this.getAttribute(attributeName);
  } else {
    // setter
    this.setAttribute(attributeName, value);
    return this;
  }
};

/**
 *
 * @param propertyName
 * @param value
 * @returns {HTMLElement|*}
 */
HTMLElement.prototype.css = function(propertyName, value) {
    if (value === undefined) {
        if (typeof propertyName === 'string') {
            // 일치하는 요소 집합 중 첫 번째 요소의 스타일 속성 값 가져오기.
            return getComputedStyle(this)[propertyName];
        } else if (typeof propertyName === 'object') {
            // 설정할 속성-값 쌍 객체.
            for (var key in propertyName) {
                this.style[key] = propertyName[key];
            }
        }
    } else {
        // 일치하는 모든 요소에 대해 하나 이상의 CSS 속성 설정하기.
        this.style[propertyName] = value;
    }
    return this;
};

/**
 *
 * @param newWidth
 * @returns {number}
 */
HTMLElement.prototype.width = function(newWidth) {
    if (newWidth === undefined) {
        // 일치하는 요소 집합 중 첫 번째 요소의 현재 계산된 너비를 가져옵니다.
        var style = getComputedStyle(this);
        return parseFloat(style.width);
    } else {
        // 일치하는 모든 요소에 대해 CSS 너비를 설정합니다.
        this.style.width = (typeof newWidth === 'number') ? `${newWidth}px` : newWidth;
    }
};


/**
 *
 * @param includeMargin
 * @returns {number}
 */
HTMLElement.prototype.outerWidth = function(includeMargin) {
    var width = this.offsetWidth;
    if (includeMargin) {
        var style = getComputedStyle(this);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    }
    return width;
};

/**
 *
 * @param newHeight
 * @returns {number}
 */
HTMLElement.prototype.height = function(newHeight) {
    if (newHeight === undefined) {
        // 일치하는 요소 집합 중 첫 번째 요소의 현재 계산된 높이를 가져옵니다.
        var style = getComputedStyle(this);
        return parseFloat(style.height);
    } else {
        // 일치하는 모든 요소에 대해 CSS 높이를 설정합니다.
        this.style.height = (typeof newHeight === 'number') ? `${newHeight}px` : newHeight;
    }
};


/**
 *
 * @param includeMargin
 * @returns {number}
 */
HTMLElement.prototype.outerHeight = function(includeMargin) {
    var height = this.offsetHeight;
    if (includeMargin) {
        var style = getComputedStyle(this);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    }
    return height;
};

/**
 *
 * @param newHtml
 * @returns {string}
 */
HTMLElement.prototype.html = function(newHtml) {
    if (newHtml === undefined) {
        // 일치하는 요소 집합 중 첫 번째 요소의 HTML 내용을 가져옵니다.
        return this.innerHTML;
    } else {
        // 일치하는 모든 요소에 대해 HTML 내용을 설정합니다.
        this.innerHTML = newHtml;

        // <script> 태그가 포함되어 있다면 재실행합니다.
        Array.from(this.getElementsByTagName('script')).forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes)
                .forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }
};


