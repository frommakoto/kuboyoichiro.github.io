<template>
  <div class="ready">
      <div class="point">
         あなたの獲得したポイント: {{userPoint}}
      </div>
      <div class="goAnswerButton">
          <!-- <router-link to="/question">
              回答開始！
          </router-link> -->
          <span class="message">{{message}}</span>
      </div>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    import url from '../assets/url.js';
    import statusUrl from '../assets/url.js';

    export default {
      name: 'hello',
      data () {
        return {
          timer: 3,
          startCountDown: '',
          userPoint: '',
          msg: 'ようこそジャパリパークへ！',
          message: '',
          url: window.url,
          statusUrl: window.statusUrl
        }
      },
      methods: {
      },
      mounted () {
          var self = this;
          var answerFlg = window.localStorage.getItem('answerFlg');
          var userId = window.localStorage.getItem('userId');
          console.log(userId);
          console.log(answerFlg);

        $.get('http://' + self.url + '/users/' + userId)
        .done(function(json){
            var data = json;
            self.userPoint = data.user_point;
        });

          if(answerFlg === false){
            //   $.get('http://' + statusUrl + '/isAnswer')
            //   .done(function(json){
            //       if(json === true)
            //   })
              self.message = "回答開始！"
          }
          else {
              self.message = "回答できるまでお待ち下さい";
          }

        //   ボタンクリックイベント
          $('.goAnswerButton').on('click', function(){
              if(answerFlg === false){
                  location.href="#question";
              }
              else {
                 alert('回答可能になるまでお待ち下さい！');
              }
          });
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
        width: 90%;
        height: 80px;
        border: solid 1px #fff;
        border-radius: 0.5em;
        background-color: yellow;
        color: #333333;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .point{
        position: absolute;
        top: 100px;
        width: 90%;
        font-weight: bold;
    }
</style>
