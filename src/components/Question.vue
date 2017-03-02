<template>
  <div class="question">
      <div id="questionWrapper">
          <span class="questionLabel">Q</span>
          <div class="questionDescription">
              問題文問題文問題文問題文問題文問題文問題文問題文問題文
          </div>
      </div>

      <ul id="answerWrapper">
          <li class="answer" v-on:click="greet">
              <span class="number one">1</span>
              <span class="answerDescription">選択肢1</span>
          </li>
          <li class="answer" v-on:click="greet">
              <span class="number two">2</span>
              <span class="answerDescription">選択肢2</span>
          </li>
          <li class="answer" v-on:click="greet">
              <span class="number three">3</span>
              <span class="answerDescription">選択肢3</span>
          </li>
          <li class="answer" v-on:click="greet">
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
          msg: 'Welcome to Your Vue.js App'
        }
      },
      methods: {
        greet: function(e){
          console.log(e);
          $('.question').addClass('done');
          return false;
        }
      },
      mounted () {
        console.log('mount');
        console.log($('.question'));
        console.log(self);
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
