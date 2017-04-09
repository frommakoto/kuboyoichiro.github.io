<template>
  <div class="hello">
      <!-- <img class="logo" src="../assets/logo_kemono.png" /> -->
      <img class="logo" src="../assets/allstar_logo_top.png" />
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

          var ua = navigator.userAgent.toLowerCase();

          // iPhone
          var isiPhone = (ua.indexOf('iphone') > -1);
          // iPad
          var isiPad = (ua.indexOf('ipad') > -1);
          // Android
          var isAndroid = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1);
          // Android Tablet
          var isAndroidTablet = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1);

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
                  if(isiPhone || isiPad || isAndroid || isAndroidTablet){
                    return false;
                  }
                  location.href="#screen";
                  return false;
              }
              // Rキー
              else if(key === 82){
                  if(isiPhone || isiPad || isAndroid || isAndroidTablet){
                    return false;
                  }
                  location.href="#ranking";
              }
              //   Mキー
              // ローカルストレージ削除
              else if(key == 77){
                if(isiPhone || isiPad || isAndroid || isAndroidTablet){
                  return false;
                }
                 window.localStorage.removeItem('userId');
                 window.localStorage.removeItem('userName');
                 window.localStorage.removeItem('answerFlg');
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
        // width: 60%;
        width: 90%;
    }
</style>
