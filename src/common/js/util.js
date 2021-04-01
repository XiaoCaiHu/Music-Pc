const maxHis = 9

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

// 搜索历史
export function searchQueryHis(hisQuery, value) {
  // 最大保存数
   if(hisQuery.length>=maxHis) {
    hisQuery.splice(maxHis,1)
   }
   let findNum = hisQuery.findIndex((item) => {
     return item == value
   })
   if(findNum==-1) {
    hisQuery.unshift(value)
   }else {
     let nowNum =  hisQuery.splice(findNum,1)
     hisQuery.unshift(nowNum[0])
   }
}
