<template>
  <div class="screen">
      <ul class="imageWrapper">
          <li class="questionImage question1">
              <div class="questionImageText">
                  <span class="index one">1</span>
                  <span class="choice">{{answer1}}</span>
                  <span class="selected">18</span>
              </div>
          </li>
          <li class="questionImage question2">
              <div class="questionImageText">
                  <span class="index two">2</span>
                  <span class="choice">{{answer2}}</span>
                  <span class="selected">18</span>
              </div>
          </li>
          <li class="questionImage question3">
              <div class="questionImageText">
                  <span class="index three">3</span>
                  <span class="choice">{{answer3}}</span>
                  <span class="selected">18</span>
              </div>
          </li>
          <li class="questionImage question4">
              <div class="questionImageText">
                  <span class="index four">4</span>
                  <span class="choice">{{answer4}}</span>
                  <span class="selected">18</span>
              </div>
          </li>
      </ul>
      <div class="questionText">
          <div class="questionLogo">Q</div>
          <div class="questionInnerText">
              <span>{{problemText}}</span>
          </div>
          <div class="time">
              <span>{{timer}}</span>
          </div>
      </div>
      <div class="timeupText">
          <img src="../assets/4_title_timeUp.png" />
      </div>
      <!-- openQuestion -->
      <!-- <audio id="openQuestion" preload="auto">
        <source src="../assets/audio/openQuestion.wav" type="audio/wav">
      </audio> -->
       <!-- <vue-audio :file="audio"></vue-audio> -->
       <!-- <audio v-el:audio :src="audio" preload="auto"></audio> -->

       <audio id="openQuestion">
           <source v-bind:src="openQuestion">
            Your browser does not support the audio element.
        </audio>
        <audio id="timeUpSound">
            <source v-bind:src="timeUpSound">
             Your browser does not support the audio element.
         </audio>
         <audio id="answering">
             <source v-bind:src="answering">
              Your browser does not support the audio element.
          </audio>
          <audio id="openAnswer">
              <source v-bind:src="openAnswer">
               Your browser does not support the audio element.
           </audio>
           <audio id="quizStart">
               <source v-bind:src="quizStart">
                Your browser does not support the audio element.
            </audio>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    import url from '../assets/url.js';
    import statusUrl from '../assets/url.js';
    // import VueAudio from 'vue-audio';

    export default {
        data () {
            return {
                timer: 10,
                text: '選択肢',
                startCountDown: '',
                answer: 1,
                url: 'http://' + window.url,
                statusUrl: window.statusUrl,
                problemText: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                image1: '',
                image2: '',
                image3: '',
                image4: '',
                imageDefault: '../assets/question_sample.jpg',
                keySafety: 0,
                // openQuestion: '../../static/openQuestion.wav',
                openQuestion: '../../static/count.mp3',
                timeUpSound: '../../static/ban1.mp3',
                answering: '../../static/answering.mp3',
                openAnswer: '../../static/openAnswer.mp3',
                quizStart: '../../static/quiz_start.mp3'
            }
        },
        // components: {
        //   'vue-audio': VueAudio
        // },
        methods: {
            countDown: function(){
                this.timer -= 1;
                if(this.timer === 0){
                    clearInterval(this.startCountDown);
                    $.ajax('http://' + self.statusUrl + '/isAnswerChange',{
                        method:'POST',
                        type:'POST',
                        cache:false
                    })
                    .done(function(json){
                        console.log(json);
                        $('.imageWrapper').addClass('done');
                        // $('.timeupText').css('display', 'block');
                        // $('.timeupText').fadeIn('fast');
                        $('.timeupText').addClass('anim-timeup');
                        document.getElementById('answering').pause();
                        // document.getElementById('timeUpSound').play();
                    });
                }
                return false;
            }
        },
        mounted () {
            $('.imageWrapper').css('display', 'none');
            var self = this;
            self.keySafety = 0;
            document.getElementById('quizStart').play();
            $.get('http://' + window.statusUrl + '/isAnswer')
            .done(function(json){
              console.log(json);
              if(json === true){
                $.ajax('http://' + self.statusUrl + '/isAnswerChange',{
                    method:'POST',
                    type:'POST',
                    cache:false
                })
                .done(function(json){
                    console.log(json);
                    console.log('回答開始フラグがtrueだったのでリセットしました');
                });
              }
            });

            $.ajax(self.url + '/rounds/getRoundProblem', {
                method: 'POST',
                type: 'POST',
                cache: false
            })
            .done(function(json){
                console.log(json);
                var data = json;
                self.problemText = data.problem.problem_text;
                $.each(data.answers, function(i){
                  // 選択肢のパッケージング
                  var answer = data.answers[i].answer_text;
                  var image = data.answers[i].imgpath;
                  if(i === 0){
                    self.answer1 = answer;
                    self.image1 = image;
                    // self.image1 = 'http://www.heimusu.com/img/img1.jpg';
                    $('.question1').css('background-image', 'url('+ self.image1 +  ')');
                    if(self.image1 == undefined){
                        $('.question1').css('background-image', 'url(/static/img/question_sample.3b67a50.jpg)');
                    }
                  }
                  else if(i === 1){
                    self.answer2 = answer;
                    self.image2 = image;
                    $('.question2').css('background-image', 'url('+ self.image1 +  ')');
                    if(self.image1 == undefined){
                        $('.question2').css('background-image', 'url(/static/img/question_sample.3b67a50.jpg)');
                    }
                  }
                  else if(i === 2){
                    self.answer3 = answer;
                    self.image3 = image;
                    $('.question3').css('background-image', 'url('+ self.image1 +  ')');
                    if(self.image1 == undefined){
                        $('.question3').css('background-image', 'url(/static/img/question_sample.3b67a50.jpg)');
                    }
                  }
                  else if(i === 4){
                    self.answer4 = answer;
                    self.image4 = image;
                    $('.question4').css('background-image', 'url('+ self.image1 +  ')');
                    if(self.image1 == undefined){
                        $('.question4').css('background-image', 'url(/static/img/question_sample.3b67a50.jpg)');
                    }
                  }

                  if(data.answers[i].answer_flg === true){
                    self.answer = i + 1;
                    console.log('答えは ' + self.answer + 'です');
                  }

                })

            });

            var self = this;
            if(this.state === 0){
                $('.count:eq(0)').css('background-color', '#8540bf');
                $('.count:eq(1)').css('background-color', '#fd0000');
                $('.count:eq(2)').css('background-color', '#00ff00');
                $('.count:eq(3)').css('background-color', '#f19149');
            }

            $(document).on('keyup', function(e){
                console.log(self.keySafety);
                if(self.keySafety === 1){
                  console.log('不可');
                  return false;
                }

                else {
                  // console.log(e.keyCode);
                  var key = e.keyCode;

                  // Sキー
                  // 問題一覧ページ（スクリーン）
                  if(key === 83){
                      // location.href="#screen";
                      // 回答状況を取得するAPIを叩く…？
                      // $.ajax(self.url + '/steps/ranking',{
                      //     method:'POST',
                      //     type:'POST',
                      //     cache:false
                      // })
                      // .done(function(json){
                      //     console.log(json);
                      //     $('.selected').css('display', 'block');
                      // })
                      // .fail(function(err){});
                  }
                  // Rキー
                  else if(key === 82){
                    self.keySafety = 0;
                    location.href="#ranking";
                    return false;
                  }
                  // Lキー
                  else if(key === 76){
                      self.keySafety = 0;
                      location.href="/";
                      return false;
                  }
                  // Tキー
                  // カウントダウンスタート
                  else if(key === 84){
                      self.keySafety = 1;
                    //   var date = new Date();
                    //   var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
                    //   now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
                      $.ajax(self.url + '/rounds/setProblemDateTime?push_time=' + utc_timestamp, {
                          method:'POST',
                          type:'POST',
                          cache:false
                      })
                      .done(function(json){
                          console.log(json);
                          $.ajax('http://' + self.statusUrl + '/isAnswerChange',{
                              method:'POST',
                              type:'POST',
                              cache:false
                          })
                          .done(function(json){
                              console.log(json);
                              document.getElementById('answering').play();
                              self.startCountDown = setInterval(self.countDown, 1000);
                              self.keySafety = 0;
                          });
                      });
                  }
                  // Yキー
                  // DONEクラスremove
                  else if(key === 89){
                      self.keySafety = 1;
                      $('.imageWrapper').removeClass('done');
                      $('.timeupText').css('display', 'none');
                      self.keySafety = 0;
                  }

                  // Aキー
                  // 答えオープン
                  else if(key === 65){
                    self.keySafety = 1;
                    console.log(self.answer);
                    // document.getElementById('openAnswer').play();
                      if(self.answer === 1){
                          $('.question2').addClass('done');
                          $('.question3').addClass('done');
                          $('.question4').addClass('done');
                      }
                      else if(self.answer === 2){
                          $('.question1').addClass('done');
                          $('.question3').addClass('done');
                          $('.question4').addClass('done');
                      }
                      else if(self.answer === 3){
                          $('.question1').addClass('done');
                          $('.question2').addClass('done');
                          $('.question4').addClass('done');
                      }
                      else if(self.answer === 4){
                          $('.question2').addClass('done');
                          $('.question3').addClass('done');
                          $('.question1').addClass('done');
                      }
                      self.keySafety = 0;
                  }

                  // Oキー
                  // 問題表示
                  else if(key === 79){
                    //   self.keySafety = 1;
                      $('.imageWrapper').css('display', 'block');
                      document.getElementById('openQuestion').play();
                      self.keySafety = 1;
                      var now = new Date();
                      console.log(now);
                      var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
                      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
                      console.log(utc_timestamp);
                      $.ajax(self.url + '/rounds/setProblemDateTime?push_time=' + utc_timestamp, {
                          method:'POST',
                          type:'POST',
                          cache:false
                      })
                      .done(function(json){
                          $.ajax('http://' + self.statusUrl + '/isAnswerChange',{
                              method:'POST',
                              type:'POST',
                              cache:false
                          })
                          .done(function(json){
                              console.log(json);
                              document.getElementById('answering').play();
                              self.startCountDown = setInterval(self.countDown, 1000);
                              self.keySafety = 0;
                          });
                      });

                    //   self.keySafety = 0;
                  }

                  else {
                      return false;
                  }

                }
                return false;
            });
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .screen{
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 100%;
        width: 100%;
        height: 100%;
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
        overflow: hidden;
    }

    .done {
        background-color: #eeeeee;
        opacity: 0.2;
        z-index: -3;
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
            border: solid 10px #b6aad5;
            position: relative;

            .questionImageText {
                position: absolute;
                bottom: 0;
                z-index: 3;
                height: 20%;
                width: 100%;
                text-align: center;
                // background: #062456;
                background: linear-gradient(to bottom, #081e29 0%, #032983 100%);
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0.5em;

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
                    font-weight: bold;
                    box-shadow:4px 0px 6px 1px #000000;
                    -moz-box-shadow:4px 0px 6px 1px #000000;
                    -webkit-box-shadow:4px 0px 6px 1px #000000;
                    font-family: Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace;
                    color: #fefefe;
                    font-weight: bold;

                }
                .choice {
                    font-size: 3.0rem;
                    font-weight: bold;
                    line-height: 60px;
                    text-shadow: 2px 2px 1px #00f,
                    -2px 2px 1px #00f,
                    2px -2px 1px #00f,
                    -2px -2px 1px #00f;

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
                    display: none;
                }

                .one {
                    // background-color: #8540bf;
                    background: linear-gradient(to bottom, #75f2ff 0%, #017ad4 50%, #0261ab 100%);
                }

                .two {
                    // background-color: #fd0000;
                    background: linear-gradient(to bottom, #ffa3a3 0%, #d10200 50%, #5d0100 100%);
                }

                .three {
                    // background-color: #07c003;
                    background: linear-gradient(to bottom, #38ff33 0%, #07bf03 50%, #045704 100%);
                }

                .four {
                    // background-color: #f19149;
                    background: linear-gradient(to bottom, #ffffa6 0%, #e2b300 50%, #b78800 100%);
                }
            }
        }
    }

    .questionText {
        position: absolute;
        top: 13%;
        left: 83%;
        width: 200px;
        // min-height: 500px;
        height: 70%;
        background: -webkit-linear-gradient(top, #1e5799 0%,#302689 1%,#302689 50%,#2989d8 80%,#2353e6 100%);
        font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;
        border-radius: 0.8em;

        .questionLogo {
            font-size: 6.0rem;
            text-align: center;
            color: #39fed5;
            font-weight: bold;
            opacity: 1.0;
            text-shadow:6px 2px 3px #000000;
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
            font-size: 3.5rem;
            text-align: center;
            opacity: 1.0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            text-shadow: 2px 2px 1px #fff,
            -2px 2px 1px #fff,
            2px -2px 1px #fff,
            -2px -2px 1px #fff;
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
            // background-color: #940100;
            background: linear-gradient(to left, #610101 0%, #940100 50%, #610101 100%);
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

    .timeupText {
        display: none;
        // display: block;
        position: absolute;
        top: 50%;
        left: 30%;
        opacity: 1.0;
        z-index: 4;

        img {
            // width: 50%;
            width: 50%;
        }
    }

    .anim-timeup {
        display: block;
        -webkit-animation: timeup 0.5s ease 0.5s 1 forwards;
        animation: timeup 3.0s ease 0.5s 1 forwards;
    }

    @-webkit-keyframes timeup {
        0%{
          // transform: rotateX( 180deg );
          width: 10%;
        }

        25% {
          width: 80%;
        }

        50% {
          width: 10%;
        }

        75% {
          width: 25%;
        }

        100% {
          // opacity: 1;
          width: 50%;
        }
    }
    @keyframes timeup {
      0%{
        // transform: rotateX( 180deg );
        transform: scale(0.5);
      }

      25% {
        transform: scale(1.5);
      }

      50% {
        transform: scale(1.0);
      }

      75% {
        transform: scale(1.5);
      }

      100% {
        // opacity: 1;
        transform: scale(1.0);
      }
    }

    @media(max-height: 800px) {
        .imageWrapper {
            left: 5%;

            .questionImageText {
                .choice {
                    font-size: 1.0rem;
                }
            }
        }
        .questionText {
            top: 4%;
            left: 77%;

            .questionInnerText {
                font-size: 1.0rem;
                height: 55%;
                top: 25%;
            }
        }
    }
</style>
