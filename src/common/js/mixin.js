import {mapMutations} from 'vuex'

export const loadMixin = {
    methods: {
        ...mapMutations({
            SETLOADSHOW:'SETLOADSHOW'
        }),
    }
}
// 拉动加载
export const loadUp = {
    data() {
        return {
            limit:20,
            page:1,
            pullup: true,
            beforeScroll: true, //判断是否开始滑动
            hasMore: true, //判断是否加载完
            showAlert:false, // alert是否显示
            timer:{},
        }
    },
    methods: {
        // 判断是否能继续加载
        _checkMore(data,page) {
            const song = data
            if(this.page == 5){
              this.hasMore = false
              return 
            }
            if(page > this.allPage) {
              this.hasMore = false
              return
            }
            if(!song.length) {
              this.hasMore = false
              return
            }
            if(page == this.allPage) {
              this.limit = this.yuPage
              this.hasMore = false
              return
            }
          },   
          closeAlert() {
            this.showAlert = !this.showAlert
          }  
    }
}