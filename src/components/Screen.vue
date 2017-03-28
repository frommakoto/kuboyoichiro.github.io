<template>
  <div class="screen">
      <ul class="imageWrapper" v-if="state==1">
          <li class="questionImage" v-for="n in 4">
              <div class="questionImageText">
                  <span class="index">{{ n }}</span>
                  <span class="choice">東京夜景</span>
                  <span class="selected">18</span>
              </div>
          </li>
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
            console.log($(window).height());

            if(this.state === 0){
                $('.count:eq(0)').css('background-color', '#8540bf');
                $('.count:eq(1)').css('background-color', '#fd0000');
                $('.count:eq(2)').css('background-color', '#00ff00');
                $('.count:eq(3)').css('background-color', '#f19149');
            }

            $(document).on('keydown', function(e){
                console.log(e.keyCode);
                var key = e.keyCode;

                // Sキー
                // 問題一覧ページ（スクリーン）
                if(key === 83){
                    location.href="#screen";
                }
                // Rキー
                else if(key === 82){
                  location.href="#ranking";
                }
                // Lキー
                else if(key === 76){
                    location.href="/";
                    return false;
                }
                else {
                    return false;
                }

                return false;
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
            // width: 100%;
            height: 40%;
            background-size: cover;
            background-image: url('../assets/question_sample.jpg');
            margin-right: 5%;
            margin-bottom: 10%;
            border-radius: 0.8em;
            border: solid 10px #d9e2f4;
            position: relative;

            .questionImageText {
                position: absolute;
                bottom: 0;
                z-index: 3;
                height: 15%;
                width: 100%;
                text-align: center;
                background: #000;
                color: #fff;

                .index {
                    font-size: 2.0rem;
                    position: absolute;
                    left: 0;
                    // line-height: 60px;
                    padding: 10px 20px 10px 20px;
                    margin-left: 20px;
                    border-radius: 50%;
                    background-color: red;
                    height: 40px;

                }
                .choice {
                    font-size: 3.0rem;
                    font-weight: bold;
                    line-height: 60px;

                }

                .selected {
                    position: absolute;
                    right: 0;
                    font-size: 2.0rem;
                    line-height: 60px;
                    background-color: #77c2ca;
                    margin-top: 5px;
                    margin-right: 5px;
                    padding-left: 50px;
                    padding-right: 10px;
                    border-radius: 0.5em;
                    height: 90%;
                    font-weight: bold;
                    color: #090a41;
                }
            }
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
                -webkit-border-radius: 50%;
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
        width: 150px;
        height: 700px;
        background: -webkit-linear-gradient(top, #1e5799 0%,#302689 1%,#302689 50%,#2989d8 80%,#2353e6 100%);
        opacity: 0.9;
        font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;
        border-radius: 0.8em;



        .questionLogo {
            // position: relative;
            // top: 3%;
            font-size: 6.0rem;
            text-align: center;
            color: #39fed5;
            font-weight: bold;
            opacity: 1.0;
        }

        .questionInnerText{
            position: relative;
            // top: 10%;
            background-color: #b6c5e0;
            color: #160087;
            font-weight: bold;
            margin: 5%;
            margin-left: auto;
            margin-right: auto;
            // margin-top: 20px;
            padding: 5% 20%;
            border-radius: 0.8em;
            -webkit-writing-mode: vertical-rl;
            -ms-writing-mode: tb-rl;
            writing-mode: vertical-rl;
            font-size: 2.5rem;
            text-align: center;
            opacity: 1.0;
        }

        .time {
            position: relative;
            // top: 10%;
            top: 0;
            left: 0;
            text-align: center;
            z-index: 2;
            font-size: 3.0rem;
            color: #f0f0f0;
            font-weight: bold;
            border: 10px solid #cdd2de;
            background-color: #940100;
            width: 150px;
            height: 150px;
            -webkit-border-radius: 50%;/* 50%でもOK */
            -moz-border-radius: 50%;
            border-radius: 50%;
            margin-left: auto;
            margin-right: auto;
            opacity: 1.0;

            span {
                font-size: 5.0rem;
                position: relative;
                top: 10%;
            }
        }
    }

    @media(min-height: 1200px){
        .questionText{
            height: 900px;
            width: 180px;
            .time {
                width: 200px;
                height: 200px;
                left: -20px;

                span {
                    top: 20%;
                }
            }
        }
        .questionInnerText{
            height: 550px;
        }
    }

    @media(max-height: 1000px) {
        .imageWrapper {
            .questionImage {
                .questionImageText {
                    .index {
                        height: 25px;
                        padding: 10px 10px 5px 10px;
                        line-height: 20px;
                    }

                    .choice {
                        font-size: 2.0rem;
                        line-height: 50px;
                    }

                    .selected {
                        line-height: 40px;
                    }
                }
            }
        }

        .questionText {
            top: 12%;
        }
    }

    @media(min-height: 800px){
        .imageWrapper {
            .questionText {
                height: 600px;
                .questionInnerText {
                    font-size: 1.5rem;
                }
            }
        }
    }
</style>
