function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 洗牌函数
export function shuffle(arr) {
  // 防止改变原来的数组(歌曲 )
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
// 节流函数
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

//  随机歌曲
export function ranSing(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}