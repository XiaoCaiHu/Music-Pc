<template>
  <div class="alert-wrapper">
    <div class="alert">
      <div class="title">{{title}}</div>
      <div class="btn-wrapper">
          <div @click="alertBtn(true)" class="btn-item1">确定</div>
          <div @click="alertBtn(false)" class="btn-item2">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
      title: {
          type:String,
          default: '确定删除历史记录？'
      }
  },
  name:'alert',
  data(){
    return {
       
    }
  },
  methods: {
      alertBtn(a) {
          this.$emit('alertBtn',a)
      }
  }
}
</script>
<style scoped lang='scss' >
.alert-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; 
    background:rgba($color: #000000, $alpha: 0.5);
    .alert{
        position: relative;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        top: 50%;
        left: 50%;
        width: 3rem;
        height: 1.5rem;
        transform: translate(-1.5rem, -0.75rem);
        background: $color-main;
        box-shadow: 0 0 .1rem #fff;
        .title{
            position: absolute;
            top: .2rem;
            left: .3rem;
            margin-top: .2rem;
            color: #fff;
        }
        .btn-wrapper{
            display: flex;
            align-items: center;
            .btn-item1,.btn-item2{
                position: absolute;
                bottom: .3rem;
                left: .3rem;
                color: #fff;
                background: $color-text-d;
                padding: .1rem .2rem;
                border-radius: .05rem;
            }
            .btn-item2{
                left: 1.2rem;
            }
        }
    }
}
</style>