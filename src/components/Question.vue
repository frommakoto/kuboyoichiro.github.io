<template>
  <div class="question">
      <div id="questionWrapper">
          <span class="questionLabel">Q</span>
          <div class="questionDescription">
              {{question}}
          </div>
      </div>

      <ul id="answerWrapper">
          <li class="answer" v-on:click="greet('1')" value="1">
              <span class="number one" value="1">1</span>
              <span class="answerDescription" value="1">{{answer1}}</span>
          </li>
          <li class="answer" v-on:click="greet('2')" value="2">
              <span class="number two"  value="2">2</span>
              <span class="answerDescription"  value="2">{{answer2}}</span>
          </li>
          <li class="answer" v-on:click="greet('3')" value="3">
              <span class="number three" value="3">3</span>
              <span class="answerDescription" value="3">{{answer3}}</span>
          </li>
          <li class="answer" v-on:click="greet('4')" value="4">
              <span class="number four" value="4">4</span>
              <span class="answerDescription" value="4">{{answer4}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    import url from '../assets/url.js';

    export default {
      name: 'question',
      self: this,

      data () {
        return {
          timer: 10,
          startCountDown: '',
          startCountUp: '',
          responseTime: 0,
          questionState: 0,
          msg: 'Welcome to Your Vue.js App',
          userId: '',
          url: 'http://' + window.url,
          question: '',
          answer1: '',
          answer2: '',
          answer3: '',
          answer4: '',
          questionAnswer: 0
        }
      },
      methods: {
        greet: function(value){
            var self = this;
            if(this.questionState === 0){
                this.questionState = 1;
                // 成否内部判定
                if(value != self.questionAnswer){
                    window.localStorage.setItem('answerFlg', true);
                }

                $.ajax(self.url + '/steps/answer?user_id=' + self.userId + '&select_answer_id=' + value + '&push_time=' + self.responseTime, {
                    method: 'POST',
                    type: 'POST',
                    cache: false
                })
                .done(function(json){
                    // console.log(json);
                    $('#questionWrapper').css('display', 'none');
                    $('#answerWrapper').css('display', 'none');
                    $('.question').addClass('done');
                    clearInterval(this.startCountUp);
                })
                .fail(function(err){});
            }
            return false;
        },
        countDown: function(){
              this.timer -= 1;
              if(this.timer === 0){
                  $('.question').addClass('done');
                  $('#questionWrapper').css('display', 'none');
                  $('#answerWrapper').css('display', 'none');
                  clearInterval(this.startCountDown);
                  alert('回答時間終了です！');
                  location.href="#ready";
              }
              return false;
        },
        countUp: function(){
            var self = this;
            self.responseTime += 0.0001;
            // console.log(self.responseTime);
            if(self.responseTime >= 0.25){
                clearInterval(this.startCountUp);
            }
        }
      },
      mounted(){
          var self = this;
          var userId = window.localStorage.getItem('userId');
          self.responseTime = 0;
          this.userId = userId;
          if(userId == null){
              location.href="/";
          }
          $.ajax(self.url + '/steps/getProblem?user_id=' + self.userId, {
              method: 'POST',
              type: 'POST',
              cache: false
          })
          .done(function(json){
              var data = json;
              self.question = data.problem.problem_text;
              $.each(data.answers, function(i){
                  if(data.answers[i].answer_flg == true){
                      self.questionAnswer = i + 1;
                  }

                var answer = data.answers[i].answer_text
                if(i === 0){
                  self.answer1 = answer;
                }
                else if(i === 1){
                  self.answer2 = answer;
                }
                else if(i === 2){
                  self.answer3 = answer;
                }
                else if(i === 4){
                  self.answer4 = answer;
                }
            });
              self.startCountDown = setInterval(self.countDown, 1000);
              self.startCountUp = setInterval(self.countUp, 0.1);
          });
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .question {
        font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 18px;
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
        min-height: 100vh;
        padding-top: 30px;
        overflow: hidden;
    }

    .done {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #questionWrapper {
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 30px;
        background-color: #00479d;
        padding: 20px;
        max-height: 900px;

        /* box-shadow */
        box-shadow:0px 3px 11px 2px #121211;
        -moz-box-shadow:0px 3px 11px 2px #121211;
        -webkit-box-shadow:0px 3px 11px 2px #121211;

        /* border-radius */
        border-radius:33px;
        -moz-border-radius:33px;
        -webkit-border-radius:33px;

        /* border */
        border:1px solid #cccccc;

        color: #1aa1ee;


        .questionDescription {
            display: block;
            position: relative;
            width: 80%;
            background-color: #87bcfc;
            color: #000;
            padding: 20px;
            padding-bottom: 100px;
            font-size: 18px;

            /* border-radius */
            border-radius:33px;
            -moz-border-radius:33px;
            -webkit-border-radius:33px;
        }
    }

    #answerWrapper {
        margin-top: 20px;
        margin-left: 30px;
        margin-right: 30px;


        .number {
            padding: 10px;
            border-radius: 50px;
            background-color: #000;
            color: #fff;
            position: absolute;
            height: 50%;
        }
        .one {
            background-color: #8540bf;
        }

        .two {
            background-color: #fd0000;
        }

        .three {
            background-color: #00ff00;
        }

        .four {
            background-color: #f19149;
        }

        .answer {
            background-color: #fbf8d0;
            margin-bottom: 20px;
            height: 40px;

            /* border-radius */
            border-radius:33px;
            -moz-border-radius:33px;
            -webkit-border-radius:33px;
            position: relative;


            .answerDescription {
                display: inline-block;
                position: absolute;
                top: 10%;
                left: 20%;
            }
        }
        .answer:active {
            color: #cccccc;
        }
    }

    .button {
        width: 80%;
        border: solid 1px #fff;
        border-radius: 0.5em;
        background-color: yellow;
        color: #333333;
        font-size: 90px;
        display: none;
    }
</style>
