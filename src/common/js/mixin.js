import {mapMutations,mapGetters} from 'vuex'

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
            loading:false, //下拉加载条是否开启
            pullup: true,
            beforeScroll: true, //判断是否开始滑动
            hasMore: true, //判断是否加载完
            showAlert:false, // alert是否显示
            timer:{},
        }
    },
    methods: {
        // 判断是否能继续加载
        _checkMore(data) {
            const song = data
            if(!song.length) {
              this.hasMore = false
              return
            }
            if(this.page == 5){
              this.hasMore = false
              return 
            }
            if(this.page > this.allPage) {
              this.hasMore = false
              return
            }
            if(this.page == this.allPage) {
              this.limit = (this.yuPage+this.allPage*this.limit+1)
              if(this.yuPage == 0) {
                 this.hasMore = false
              }
            }
          },   
        // 触底提示是否打开
        closeAlert() {
          this.showAlert = !this.showAlert
        }
    }
    // 计算属性参考
    // allPage() {
    //   return this.songComments ? parseInt(Math.floor(this.songComments.total/this.limit)) : 0
    // },
    // yuPage() {
    //   return this.songComments ? parseInt(this.songComments.total%this.limit) : 0
    // }
}

// 跳转歌单详情页面
export const seleItem = {
  methods: {
       ...mapMutations({
          SETLOADSHOW:'SETLOADSHOW'
       }),
      // 点击跳转到歌单详情页面
      seleRecomSong(id) {
        // 加载条显示
        this.SETLOADSHOW(true)
        window.localStorage.setItem("playListDetail",id);
        this.$router.push('/playListDetail/' + id);
      }
  }
}

// 跳转MV详情页面
export const seleMvItem = {
  methods: {
       ...mapMutations({
          SETLOADSHOW:'SETLOADSHOW'
       }),
      // 点击跳转到歌单详情页面
      seleMV(id) {
        // 加载条显示
        this.SETLOADSHOW(true)
        window.localStorage.setItem("MvListID",id);
        this.$router.push('/MvList/' + id)
      }
  }
}

// 双击事件
export const SeDbclick = {
  data() {
    return {
      clickNum: 0,
      timer: {}
    }
  },
  computed: {
    ...mapGetters([
      'singerID'
    ])
  },
  methods: {
      ...mapMutations({
        GETSINGERID:'GETSINGERID'
      }),
      //  获取歌单id (双击事件)
      selectAlbums(id) {
        console.log('点击了');
        this.clickNum ++
        clearTimeout(this.timer)
        if(this.clickNum==2) {
          this.clickNum = 0
          this.GETSINGERID(id)
        }
        this.timer = setTimeout(() => {
          this.clickNum = 0
        }, 300);
      }
  }
}


