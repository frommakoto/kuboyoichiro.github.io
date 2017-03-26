<template>
  <div class="screen">
      <ul class="imageWrapper" v-if="state==1">
          <li class="questionImage" v-for="n in 4"></li>
      </ul>
      <ul class="textWrapper" v-for="n in 4" v-if="state==0">
          <li class="questionProblem">
              <span class="count">{{n}}</span> {{text}}{{n}}
          </li>
      </ul>
      <div class="questionText">
          <div class="questionLogo">Q</div>
          <div class="questionInnerText">
              <span>問題文問題文問題文問題文</span>
          </div>
          <div class="time">
              <span>10</span>
          </div>
      </div>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    export default {
        data () {
            return {
                count: 4,
                state: 1,
                text: '選択肢'
            }
        },
        mounted () {
            if(this.state === 0){
                $('.count:eq(0)').css('background-color', '#8540bf');
                $('.count:eq(1)').css('background-color', '#fd0000');
                $('.count:eq(2)').css('background-color', '#00ff00');
                $('.count:eq(3)').css('background-color', '#f19149');
            }

            $(document).on('keydown', function(e){
                console.log(e.keyCode);
                var key = e.keyCode;
                if(key === 65){
                    location.href="#question";
                }
            });
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .screen{
        font-size: 100%;
        width: 100%;
        height: 100%;
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
        overflow: hidden;
    }

    .imageWrapper {
        position: relative;
        top: 15%;
        left: 10%;
        width: 70%;
        height: 80%;

        -moz-column-count: 2;
        -webkit-column-count: 2;
        column-count: 2;
        -moz-column-gap: 1em;
        -webkit-column-gap: 1em;
        column-gap: 1em;

        .questionImage {
            width: 100%;
            height: 40%;
            background-size: cover;
            background-image: url('../assets/question_sample.jpg');
            margin-right: 5%;
            margin-bottom: 10%;
        }
    }


    .textWrapper {
        position: relative;
        top: 15%;
        left: 20%;
        width: 60%;
        // height: 80%;
        font-size: 3.0rem;
        font-weight: bold;

        .questionProblem {
            margin-bottom: 10%;
            background-color: #fbf8d0;
            -webkit-border-radius: 1.0rem;
            -moz-border-radius: 1.0rem;
            border-radius: 1.0rem;
            text-align: center;
            padding-top: 2%;
            padding-bottom: 2%;
            font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;

            .count {
                display: inline-block;
                position: relative;
                left: -38%;
                color: #ffffff;
                width: 80px;
                height: 80px;
                -webkit-border-radius: 50%;/* 50%でもOK */
                -moz-border-radius: 50%;
                border-radius: 50%;
                background-color: #000;
            }
        }
    }

    .questionText{
        position: absolute;
        top: 15%;
        left: 85%;
        width: 10%;
        height: 70%;
        background-color: #7f3db7;
        font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;

        .questionLogo {
            position: relative;
            top: 3%;
            font-size: 3.0rem;
            text-align: center;
            color: #ffffff;
            font-weight: bold;
        }

        .questionInnerText{
            position: relative;
            top: 10%;
            background-color: #bfbfbf;
            color: #fefdff;
            font-weight: bold;
            margin: 5%;
            margin-left: auto;
            margin-right: auto;
            padding: 5% 20%;
            border-radius: 0.5em;
            -webkit-writing-mode: vertical-rl;
            -ms-writing-mode: tb-rl;
            writing-mode: vertical-rl;
            font-size: 3.0rem;
            text-align: center;
        }

        .time {
            position: relative;
            top: 10%;
            text-align: center;
            z-index: 2;
            font-size: 3.0rem;
            color: #ffffff;
            font-weight: bold;
            border: 3px s0lid #333333;
            background-color: #ff0000;
            width: 200px;
            height: 200px;
            -webkit-border-radius: 50%;/* 50%でもOK */
            -moz-border-radius: 50%;
            border-radius: 50%;
            margin-left: auto;
            margin-right: auto;

            span {
                font-size: 5.0rem;
                position: relative;
                top: 20%;
            }
        }
    }
</style>
