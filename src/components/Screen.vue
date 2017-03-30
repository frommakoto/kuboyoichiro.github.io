<template>
  <div class="screen">
      <ul class="imageWrapper">
          <li class="questionImage question1">
              <div class="questionImageText">
                  <span class="index one">1</span>
                  <span class="choice">東京夜景</span>
                  <span class="selected">18</span>
              </div>
          </li>
          <li class="questionImage question2">
              <div class="questionImageText">
                  <span class="index two">2</span>
                  <span class="choice">東京夜景</span>
                  <span class="selected">18</span>
              </div>
          </li>
          <li class="questionImage question3">
              <div class="questionImageText">
                  <span class="index three">3</span>
                  <span class="choice">東京夜景</span>
                  <span class="selected">18</span>
              </div>
          </li>
          <li class="questionImage question4">
              <div class="questionImageText">
                  <span class="index four">4</span>
                  <span class="choice">東京夜景</span>
                  <span class="selected">18</span>
              </div>
          </li>
      </ul>
      <div class="questionText">
          <div class="questionLogo">Q</div>
          <div class="questionInnerText">
              <span>問題文問題文問題文問題文</span>
          </div>
          <div class="time">
              <span>{{timer}}</span>
          </div>
      </div>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    export default {
        data () {
            return {
                timer: 10,
                text: '選択肢',
                startCountDown: '',
                answer: 1
            }
        },
        methods: {
            countDown: function(){
                this.timer -= 1;
                if(this.timer === 0){
                    // alert('over');
                    $('.screen').addClass('done');
                    clearInterval(this.startCountDown);
                }
                return false;
            }
        },
        mounted () {
            // console.log($(window).height());
            var self = this;
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
                // Tキー
                // カウントダウンスタート
                else if(key === 84){
                    self.startCountDown = setInterval(self.countDown, 1000);
                }
                // Yキー
                // DONEクラスremove
                else if(key === 89){
                    $('.screen').removeClass('done');
                }

                // Aキー
                // 答えオープン
                else if(key === 65){
                    if(self.answer === 1){
                        $('.question2').addClass('done');
                        $('.question3').addClass('done');
                        $('.question4').addClass('done');
                    }
                }

                // Oキー
                // 問題表示
                else if(key === 79){
                    $('.imageWrapper').css('display', 'block');
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

    .done {
        background-color: #333333;
        opacity: 0.4;
    }

    .imageWrapper {
        position: absolute;
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
            // height: 40%;
            height: 43%;
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
                height: 20%;
                width: 100%;
                text-align: center;
                background: #000;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;

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
                    margin-right: 5px;
                    // padding-left: 50px;
                    padding-left: 5%;
                    padding-right: 10px;
                    border-radius: 0.5em;
                    font-weight: bold;
                    color: #090a41;
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
            }
        }
    }

    .questionText {
            position: absolute;
            top: 13%;
            left: 83%;
            width: 200px;
            min-height: 500px;
            height: 70%;
            background: -webkit-linear-gradient(top, #1e5799 0%,#302689 1%,#302689 50%,#2989d8 80%,#2353e6 100%);
            opacity: 0.9;
            font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;
            border-radius: 0.8em;

            .questionLogo {
                font-size: 6.0rem;
                text-align: center;
                color: #39fed5;
                font-weight: bold;
                opacity: 1.0;
            }

            .questionInnerText{
                // position: relative;
                // // top: 10%;
                position: absolute;
                // top: 15%;
                top: 20%;
                left: -33%;
                background-color: #b6c5e0;
                color: #160087;
                font-weight: bold;
                margin: 5%;
                margin-left: auto;
                margin-right: auto;
                min-width: 90px;
                width: 40%;
                min-height: 100px;
                height: 65%;
                padding: 5% 20%;
                border-radius: 0.8em;
                -webkit-writing-mode: vertical-rl;
                -ms-writing-mode: tb-rl;
                writing-mode: vertical-rl;
                font-size: 2.5rem;
                text-align: center;
                opacity: 1.0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

                .time {
                    position: absolute;
                    top: 90%;
                    // left: -10%;
                    left: -5%;
                    text-align: center;
                    z-index: 2;
                    font-size: 3.0rem;
                    color: #f0f0f0;
                    font-weight: bold;
                    border: 10px solid #cdd2de;
                    background-color: #940100;
                    // max-width: 150px;
                    // max-height: 150px;
                    width: 200px;
                    height: 200px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    margin-left: auto;
                    margin-right: auto;
                    opacity: 1.0;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    span {
                        // font-size: 5.0rem;
                        font-size: 80px;
                        // position: absolute;
                        // top: 20%;
                        // left: 25%;
                    }
                }
    }

    // .imageWrapper {
    //     display: none;
    //     position: relative;
    //     top: 15%;
    //     left: 10%;
    //     width: 70%;
    //     height: 80%;
    //
    //     -moz-column-count: 2;
    //     -webkit-column-count: 2;
    //     column-count: 2;
    //     -moz-column-gap: 1em;
    //     -webkit-column-gap: 1em;
    //     column-gap: 1em;
    //
    //     .questionImage {
    //         // width: 100%;
    //         height: 40%;
    //         background-size: cover;
    //         background-image: url('../assets/question_sample.jpg');
    //         margin-right: 5%;
    //         margin-bottom: 10%;
    //         border-radius: 0.8em;
    //         border: solid 10px #d9e2f4;
    //         position: relative;
    //
    //         .questionImageText {
    //             position: absolute;
    //             bottom: 0;
    //             z-index: 3;
    //             height: 20%;
    //             width: 100%;
    //             text-align: center;
    //             background: #000;
    //             color: #fff;
    //
    //             .index {
    //                 font-size: 2.0rem;
    //                 position: absolute;
    //                 left: 0;
    //                 // line-height: 60px;
    //                 padding: 10px 20px 10px 20px;
    //                 margin-left: 20px;
    //                 border-radius: 50%;
    //                 background-color: red;
    //                 height: 40px;
    //
    //             }
    //             .choice {
    //                 font-size: 3.0rem;
    //                 font-weight: bold;
    //                 line-height: 60px;
    //
    //             }
    //
    //             .selected {
    //                 position: absolute;
    //                 right: 0;
    //                 font-size: 2.0rem;
    //                 line-height: 60px;
    //                 background-color: #77c2ca;
    //                 margin-top: 5px;
    //                 margin-right: 5px;
    //                 padding-left: 50px;
    //                 padding-right: 10px;
    //                 border-radius: 0.5em;
    //                 height: 90%;
    //                 font-weight: bold;
    //                 color: #090a41;
    //             }
    //
    //             .one {
    //                 background-color: #8540bf;
    //             }
    //
    //             .two {
    //                 background-color: #fd0000;
    //             }
    //
    //             .three {
    //                 background-color: #00ff00;
    //             }
    //
    //             .four {
    //                 background-color: #f19149;
    //             }
    //         }
    //     }
    // }
    //
    //
    // .textWrapper {
    //     position: relative;
    //     top: 15%;
    //     left: 20%;
    //     width: 60%;
    //     // height: 80%;
    //     font-size: 3.0rem;
    //     font-weight: bold;
    //
    //     .questionProblem {
    //         margin-bottom: 10%;
    //         background-color: #fbf8d0;
    //         -webkit-border-radius: 1.0rem;
    //         -moz-border-radius: 1.0rem;
    //         border-radius: 1.0rem;
    //         text-align: center;
    //         padding-top: 2%;
    //         padding-bottom: 2%;
    //         font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;
    //
    //         .count {
    //             display: inline-block;
    //             position: relative;
    //             left: -38%;
    //             color: #ffffff;
    //             width: 80px;
    //             height: 80px;
    //             -webkit-border-radius: 50%;
    //             -moz-border-radius: 50%;
    //             border-radius: 50%;
    //             background-color: #000;
    //         }
    //     }
    // }
    //
    // .questionText{
    //     position: absolute;
    //     top: 15%;
    //     left: 85%;
    //     width: 150px;
    //     // height: 700px;
    //     min-height: 500px;
    //     height: 70%;
    //     background: -webkit-linear-gradient(top, #1e5799 0%,#302689 1%,#302689 50%,#2989d8 80%,#2353e6 100%);
    //     opacity: 0.9;
    //     font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;
    //     border-radius: 0.8em;
    //
    //
    //
    //     .questionLogo {
    //         font-size: 6.0rem;
    //         text-align: center;
    //         color: #39fed5;
    //         font-weight: bold;
    //         opacity: 1.0;
    //     }
    //
    //     .questionInnerText{
    //         position: relative;
    //         // top: 10%;
    //         background-color: #b6c5e0;
    //         color: #160087;
    //         font-weight: bold;
    //         margin: 5%;
    //         margin-left: auto;
    //         margin-right: auto;
    //         min-width: 90px;
    //         width: 40%;
    //         min-height: 100px;
    //         height: 65%;
    //         padding: 5% 20%;
    //         border-radius: 0.8em;
    //         -webkit-writing-mode: vertical-rl;
    //         -ms-writing-mode: tb-rl;
    //         writing-mode: vertical-rl;
    //         font-size: 2.5rem;
    //         text-align: center;
    //         opacity: 1.0;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //     }
    //
    //     .time {
    //         position: absolute;
    //         top: 90%;
    //         left: -10%;
    //         text-align: center;
    //         z-index: 2;
    //         font-size: 3.0rem;
    //         color: #f0f0f0;
    //         font-weight: bold;
    //         border: 10px solid #cdd2de;
    //         background-color: #940100;
    //         // max-width: 150px;
    //         // max-height: 150px;
    //         width: 150px;
    //         height: 150px;
    //         -webkit-border-radius: 50%;
    //         -moz-border-radius: 50%;
    //         border-radius: 50%;
    //         margin-left: auto;
    //         margin-right: auto;
    //         opacity: 1.0;
    //
    //         span {
    //             // font-size: 5.0rem;
    //             font-size: 60px;
    //             position: absolute;;
    //             top: 20%;
    //             left: 25%;
    //         }
    //     }
    // }

    // @media(max-height: 960px){
    //
    // }
</style>
