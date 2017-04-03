<template>
  <div class="question">
      <div id="questionWrapper">
          <span class="questionLabel">Q</span>
          <div class="questionDescription">
              問題文問題文問題文問題文問題文問題文問題文問題文問題文
          </div>
      </div>

      <ul id="answerWrapper">
          <li class="answer" v-on:click="greet" value="1">
              <span class="number one">1</span>
              <span class="answerDescription">選択肢1</span>
          </li>
          <li class="answer" v-on:click="greet" value="2">
              <span class="number two">2</span>
              <span class="answerDescription">選択肢2</span>
          </li>
          <li class="answer" v-on:click="greet" value="3">
              <span class="number three">3</span>
              <span class="answerDescription">選択肢3</span>
          </li>
          <li class="answer" v-on:click="greet" value="4">
              <span class="number four">4</span>
              <span class="answerDescription">選択肢4</span>
          </li>
      </ul>
  </div>
</template>

<script>
    import * as $ from 'jquery';

    export default {
      name: 'question',
      self: this,

      data () {
        return {
          questionState: 0,
          msg: 'Welcome to Your Vue.js App'
        }
      },
      methods: {
        greet: function(e){
            console.log(e);
            if(this.questionState === 0){
                this.questionState = 1;
                let value = e.target.value;
                let date = new Date();
                date = this.formatTime(date);
                //  時間をアレする
                console.log(date);
                $.ajax('http://25.187.220.214:3000/steps/answer',{
                    method:'POST',
                    type:'POST',
                    cache:false
                })
                .done(function(json){
                    console.log(json);
                })
                .fail(function(err){});
                $('.question').addClass('done');
            }
            return false;
        },
        formatTime: function(date, format){
          if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
          format = format.replace(/YYYY/g, date.getFullYear());
          format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
          format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
          format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
          format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
          format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
          if (format.match(/S/g)) {
            var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
            var length = format.match(/S/g).length;
            for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
          }
          return format;
        }
      },
      mounted(){
          var userId = window.localStorage.getItem('userId');
          console.log(userId);
          if(userId == null){
              location.href="/";
          }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .question {
        font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 100px;
        background: linear-gradient(#03bffe, #090f94) fixed;
        min-height: 100vh;
        padding-top: 30px;
        padding-bottom: 4%;
        overflow: hidden;
    }

    .done {
        background-color: #333333;
        opacity: 0.4;
    }

    #questionWrapper {
        // margin: 30px;
        // margin-top: 40px;
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

        .questionLabel {
            // float: left;
        }

        .questionDescription {
            display: block;
            position: relative;
            top: -130px;
            right: -130px;
            width: 80%;
            background-color: #87bcfc;
            color: #000;
            padding: 20px;
            padding-bottom: 100px;
            font-size: 80px;

            /* border-radius */
            border-radius:33px;
            -moz-border-radius:33px;
            -webkit-border-radius:33px;
        }
    }

    #answerWrapper {
        margin-top: 100px;
        margin-left: 20px;
        margin-right: 20px;

        .number {
            padding: 10px 20px 10px 20px;
            margin-left: 20px;
            border-radius: 50px;
            background-color: #000;
            color: #fff;
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
            margin-bottom: 40px;

            /* border-radius */
            border-radius:33px;
            -moz-border-radius:33px;
            -webkit-border-radius:33px;

            .answerDescription {
                display: inline-block;
                position: relative;
                left: 170px;
            }
        }
        .answer:active {
            color: #cccccc;
        }
    }
</style>
