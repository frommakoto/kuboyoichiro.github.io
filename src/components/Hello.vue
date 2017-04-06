<template>
  <div class="hello">
      <img class="logo" src="../assets/logo_kemono.png" />
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
          var userId = window.localStorage.getItem('userId');
          console.log(userId);

          //   ログイン済であればログインページへは飛ばさない
          //   余力があればv-ifでアレしたい
          $('.logo').on('click', function(){
              if(!userId) {
                  location.href="#login";
                  return false;
              }
              else {
                  location.href="#ready"
                  return false;
              }
          });

          $(document).on('keyup', function(e){
              var key = e.keyCode;
              console.log(key);
              // Sキー
              // 問題一覧ページ（スクリーン）
              if(key === 83){
                  location.href="#screen";
                  return false;
              }
              //   Dキー
              // ローカルストレージ削除
              else if(key == 68){
                 window.localStorage.removeItem('userId');
                 window.localStorage.removeItem('userName');
                 location.reload();
                 return false;
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
