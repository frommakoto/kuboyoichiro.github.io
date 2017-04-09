<template>
  <div class="ready">
      <div class="point">
         あなたの獲得したポイント: {{userPoint}}
      </div>
      <div class="reset">
        りせっと
      </div>
      <div class="goAnswerButton">
          <span class="message">{{message}}</span>
      </div>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    import url from '../assets/url.js';
    import statusUrl from '../assets/url.js';
    import * as flip from '../assets/jquery.flip.min.js';

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


        $.get('http://' + self.url + '/users/' + userId)
        .done(function(json){
            var data = json;
            self.userPoint = data.user_point;
            return false;
        });

          $.get('http://' + self.statusUrl + '/isCheck')
          .done(function(json){
            //   console.log(json);
              var isAnswer = json.isAnswer;
              var isSpecial = json.isSpecial;
              if(answerFlg == 'false'){
                  //   特例問題か？
                    if(isSpecial == true && isAnswer == true){
                        window.localStorage.setItem('answerFlg', false);
                        answerFlg = 'false';
                        self.message = "回答開始！"
                    }
                    else if(isAnswer == true){
                        self.message = "回答開始！"
                    }
                    else {
                        self.message = "回答開始！"
                    }
              }
              else {
                  if(isSpecial == true && isAnswer == true){
                      window.localStorage.setItem('answerFlg', false);
                      answerFlg = 'false';
                      self.message = "回答開始！"
                  }
                  else {
                    self.message = "不正解でした。次のチャンスまでお待ち下さい。";
                  }
                //   alert('回答できるまでしばらくお待ち下さい');
              }
          });

        //   ボタンクリックイベント
          $('.goAnswerButton').on('click', function(){
              $.get('http://' + self.statusUrl + '/isCheck')
              .done(function(json){
                //   console.log(json);
                  var isAnswer = json.isAnswer;
                  var isSpecial = json.isSpecial;
                  if(answerFlg == 'false'){
                      //   特例問題か？
                        if(isSpecial == true && isAnswer == true){
                            window.localStorage.setItem('answerFlg', false);
                            answerFlg = 'false';
                            // self.message = "回答開始！"
                            location.href="#question";
                        }
                        else if(isAnswer == true){
                            // self.message = "回答開始！"
                            location.href="#question";
                        }
                        else {
                            self.message = "回答開始！"
                            alert('回答できるまでしばらくお待ち下さい');
                        }
                  }
                  else {
                      if(isSpecial == true && isAnswer == true){
                          window.localStorage.setItem('answerFlg', false);
                          answerFlg = 'false';
                          self.message = "回答開始！"
                      }
                      else {
                          self.message = "不正解でした。次のチャンスまでお待ち下さい。";
                          alert('回答できるまでしばらくお待ち下さい');
                      }
                  }
              });
          });
          $('.reset').on('click', function(){
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('userName');
            window.localStorage.removeItem('answerFlg');
            alert('ローカルの情報をリセットしました.移動後リロードしてください．');
            location.href = '#';
          })
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
        position: relative;
    }

    .goAnswerButton {
        height: 80px;
        border: solid 1px #fff;
        border-radius: 0.5em;
        background-color: yellow;
        color: #333333;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50%;
    }

    .point{
        margin-top: 10%;
        font-weight: bold;
    }

    .reset {
      // position: absolute;
      // bottom: 100px;
      padding: 10px 20px 10px 20px;
      // width: 80%;
      background: #dddddd;
      color: #333333;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
</style>
