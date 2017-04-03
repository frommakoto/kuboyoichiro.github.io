<template>
  <div class="ready">
      <div class="goAnswerButton">
          <router-link to="/question">
              回答開始！
          </router-link>
      </div>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    export default {
      name: 'hello',
      data () {
        return {
          timer: 3,
          startCountDown: '',
          msg: 'ようこそジャパリパークへ！'
        }
      },
      methods: {
      },
      mounted () {
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .ready {
        height: 100%;
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
        overflow: hidden;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .goAnswerButton {
        width: 80%;
        border: solid 1px #fff;
        border-radius: 0.5em;
        background-color: yellow;
        color: #333333;
        font-size: 100px;
    }
</style>
