// 轮播图设置样式 
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
// 轮播图设置样式 
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style
// 设置兼容标签 (立即执行函数)
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
//  遍历transformNames,找到对应供应商
  for (let key in transformNames) {
    // 如果有返回,没有继续
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()
// 导出
export function prefixStyle(style) {
  // 供应商出错
  if (vendor === false) {
    return false
  }
// 有供应商
  if (vendor === 'standard') {
    return style
  }
// 返回拼接
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
