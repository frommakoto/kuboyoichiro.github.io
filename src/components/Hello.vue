<template>
  <div class="hello">
      <router-link to="/question">
          <img class="logo" src="../assets/logo_kemono.png" />
      </router-link>
    <!-- <router-link to="/question">
        <img class="logo" src="../assets/logo_kemono.png" />
    </router-link> -->
    <!-- <a href="http://kemono-friends.jp/">
        <img src="../assets/serval.jpg" />
    </a> -->
  </div>
</template>

<script>
    import * as $ from 'jquery';
    export default {
      name: 'hello',
      data () {
        return {
          msg: 'ようこそジャパリパークへ！'
        }
      },
      mounted () {
          $(document).on('keydown', function(e){
              var key = e.keyCode;
              // Sキー
              // 問題一覧ページ（スクリーン）
              if(key === 83){
                  location.href="#screen";
              }
              return false;
          });
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .hello {
        height: 100%;
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
        overflow: hidden;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo {
        display: block;
        margin: auto;
    }
</style>
