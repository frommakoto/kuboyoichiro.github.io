<template>
  <div class="ranking">
      <ul class="rankingWrapper">
          <li v-for="r in rankings" class="ranking-list">
            <span class="nameRank">
                <span class="number">{{r.ranking}}</span>
                <span class="name">{{r.name}}</span>
            </span>
            <span class="count" v-if="gainFlg===true">
                <span class="gain">獲得額：{{r.gain}}円</span>
            </span>
            <span class="count" v-if="gainFlg===false">
                <span class="time" id="time">回答時間：{{r.time}}秒</span>
            </span>
          </li>
      </ul>
      <div class="yamawake">
          <img src="../assets/yamawake.png"  />
      </div>
      <audio id="startRanking">
          <source v-bind:src="startRanking">
           Your browser does not support the audio element.
       </audio>
       <audio id="openTop">
           <source v-bind:src="openTop">
            Your browser does not support the audio element.
        </audio>
        <audio id="openBottom">
            <source v-bind:src="openBottom">
             Your browser does not support the audio element.
         </audio>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    import url from '../assets/url.js';
    global.jQuery = require('jquery');

    export default {
        data () {
            return {
                gainFlg: false,
                rankings: [],
                lastElement: 0,
                url: 'http://' + window.url,
                keySafety: 0,
                startRanking: '../../static/startRoulette.wav',
                openTop: '../../static/openTop.mp3',
                openBottom: '../../static/openBottom.mp3'
            }
        },
        mounted () {
            var self = this;
            self.keySafety = 0;
            // var flip = $('#card').flip({'axis': 'x', 'trigger': 'manual'});

            // キー操作
            $(document).on('keyup', function(e){
                // console.log(e.keyCode);
                if(self.keySafety === 1){
                  console.log('不可');
                  return false;
                }

                var key = e.keyCode;

                // Sキー
                // 問題一覧ページ（スクリーン）
                if(key === 83){
                    self.keySafety = 1;
                    location.href="#screen";
                    return false;
                }
                // Lキー
                else if(key === 76){
                    self.keySafety = 1;
                    location.href="/";
                    return false;
                }
                // Zキー
                // 90
                // 金額ランキング
                else if(key === 90){
                  self.keySafety = 1;
                  if(self.rankings.length > 0){
                    self.rankings.length = 0;
                  }
                  // $('.rankingWrapper').show();
                  self.gainFlg = true;
                  $.ajax(self.url + '/users/ranking',{
                      method:'POST',
                      type:'POST',
                      cache:false
                  })
                  .done(function(json){
                      document.getElementById('startRanking').play();
                      var data = json;
                      var length = data.length;
                      // console.log(length);
                      // console.log(data);
                      $.each(data, function(i){
                          var pushData = {
                            ranking: i + 1,
                            name: data[i].name,
                            gain: data[i].user_point
                          };
                          self.rankings.push(pushData);
                          if(i === 9 || i === length - 1){
                            setTimeout(function(){
                              for(var j = 0; j <= i; j++) {
                                $('.ranking-list').eq(j).css('display', 'flex');
                                $('.ranking-list').eq(j).show();
                                $('.ranking-list').eq(j).addClass('anim-rev' + (j + 1));
                                self.lastElement = j;
                              }
                            },500);
                            self.keySafety = 0;
                            return false;
                          }
                      });
                  })
                  .fail(function(err){});
                }

                // Xキー
                // 88
                // 速さ早い順
                else if(key === 88){
                  self.keySafety = 1;
                  if(self.rankings.length > 0){
                    self.rankings.length = 0;
                  }
                  // $('.rankingWrapper').show();
                  $.ajax(self.url + '/steps/ranking',{
                      method:'POST',
                      type:'POST',
                      cache:false
                  })
                  .done(function(json){
                      var data = json;
                      var length = data.steps.length;
                      console.log(data);
                      $('.time').show();
                      $.each(data.steps, function(i){
                          var pushData = {
                            ranking: i + 1,
                            name: data.users[i].name,
                            time: data.steps[i].response_time
                          };
                          self.rankings.push(pushData);
                          if(i === 9 || i === length - 1){
                            setTimeout(function(){
                              for(var j = 0; j <= i; j++) {
                                $('.ranking-list').eq(j).css('display', 'flex');
                                $('.ranking-list').eq(j).show();
                                $('.ranking-list').eq(j).addClass('anim-rev' + (j + 1));
                                self.lastElement = j;
                              }
                            },500);
                            self.keySafety = 0;
                            return false;
                          }
                      });
                  })
                  .fail(function(err){});
                }

                // Cキー
                // 67
                // 速さ遅い順
                else if(key === 67){
                  self.keySafety = 1;
                  if(self.rankings.length > 0){
                    self.rankings.length = 0;
                  }
                  $('.rankingWrapper').show();
                  $.ajax(self.url + '/steps/ranking',{
                      method:'POST',
                      type:'POST',
                      cache:false
                  })
                  .done(function(json){
                      var data = json;
                      var length = data.steps.length;
                      $('.time').show();
                      console.log(data);
                      $.each(data.steps, function(i){
                          var pushData = {
                            ranking: length - i,
                            name: data.users[length - i - 1].name,
                            time: data.steps[length - i - 1].response_time
                          };
                          self.rankings.push(pushData);
                          // if(i === 8){
                          if(i === 9 || i === length - 1){
                            setTimeout(function(){
                              for(var j = 0; j <= i; j++) {
                                $('.ranking-list').eq(j).css('display', 'flex');
                                $('.ranking-list').eq(j).show();
                                $('.ranking-list').eq(j).addClass('anim' + (j + 1));
                                self.lastElement = j;
                              }
                            },500);
                            self.keySafety = 0;
                            return false;
                          }
                      });
                      self.rankings = self.rankings.reverse();
                  })
                  .fail(function(err){});
                }

                // Dキー
                // 最後のlist要素
                else if(key === 68){
                  self.keySafety = 1;
                  $('.ranking-list:last').css('opacity', '1');
                  $('.ranking-list:last').removeClass('anim' + (self.lastElement + 1));
                  $('.ranking-list:last').removeClass('anim-rev' + (self.lastElement + 1));
                  $('.ranking-list:last').addClass('animation');
                  document.getElementById('startRanking').pause();
                  document.getElementById('openBottom').play();
                  self.keySafety = 0;
                }

                // Tキー
                // 最初のlist要素
                else if(key === 84){
                  self.keySafety = 1;
                  // console.log($('.ranking-list:first'));
                  $('.ranking-list:first').css('opacity', '1');
                  $('.ranking-list:first').removeClass('anim1');
                  $('.ranking-list:first').removeClass('anim-rev1');
                  $('.ranking-list:first').addClass('animation');
                  document.getElementById('startRanking').pause();
                  document.getElementById('openTop').play();
                  self.keySafety = 0;
                }

                // Yキー
                // 山分けクイズ開始
                else if(key === 89){
                    self.keySafety = 1;
                    $('.yamawake').css('display', 'block');
                    self.keySafety = 0;
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
    .ranking{
        // font-size: 100%;
        width: 100%;
        height: 100%;
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
        overflow: hidden;
        font-family: "ヒラギノ丸ゴ Pro W4","Hiragino Maru Gothic Pro", 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 18px;
    }

    .yamawake {
        display: none;
        // display: block;
        position: absolute;
        // top: 50%;
        // left: 30%;
        top: 40%;
        left: 20%;
        opacity: 1.0;
        z-index: 4;

        img {
            width: 80%;
        }
    }


    .rankingWrapper {
        position: relative;
        text-align: center;
        margin-top: 20px;
        margin-left: 50px;
        margin-right: 50px;
        margin-bottom: 20px;
        height: 100%;
        // display: none;

        .ranking-list {
            font-size: 3.0rem;
            color: #000;
            margin-bottom: 15px;
            height: 8%;
            display: none;
            // display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            opacity: 0;

            .nameRank {
                background: #0100fc;
                border: 1px solid #0100fc;
                border-radius: 0.5rem;
                height: 100%;
                width: 50%;
                position: absolute;
                left: 0;

                display: flex;
                justify-content: center;
                align-items: center;
                .number {
                    position: absolute;
                    left: 30px;
                    background: #00a3e8;
                    border: 1px solid #00a3e8;
                    color: #fff;
                    width: 100px;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .name {
                    position: absolute;
                    left: 200px;
                    color: #fff20c;
                }
            }

            .count {
                display: flex;
                justify-content: center;
                align-items: center;
                background: #0100fc;
                border: 1px solid #0100fc;
                border-radius: 0.5rem;
                height: 100%;
                width: 40%;
                position: absolute;
                right: 0;
                color: #fff20c;
                font-size: 3.0rem;
                .gain {
                    position: absolute;
                    left: 30px;
                }
                .time {
                    position: absolute;
                    left: 30px;
                }
            }
        }

        // 以下アニメーション
        .anim1 {
            -webkit-animation: example 0.5s ease 0.5s 1 forwards;
            animation: example 0.5s ease 0.5s 1 forwards;
        }
        .anim2 {
            -webkit-animation: example 0.5s ease 1s 1 forwards;
            animation: example 0.5s ease 1s 1 forwards;
        }
        .anim3 {
            -webkit-animation: example 0.5s ease 1.5s 1 forwards;
            animation: example 0.5s ease 1.5s 1 forwards;
        }
        .anim4 {
            -webkit-animation: example 0.5s ease 2.0s 1 forwards;
            animation: example 0.5s ease 2.0s 1 forwards;
        }
        .anim5 {
            -webkit-animation: example 0.5s ease 2.5s 1 forwards;
            animation: example 0.5s ease 2.5s 1 forwards;
        }
        .anim6 {
            -webkit-animation: example 0.5s ease 3.0s 1 forwards;
            animation: example 0.5s ease 3.0s 1 forwards;
        }
        .anim7 {
            -webkit-animation: example 0.5s ease 3.5s 1 forwards;
            animation: example 0.5s ease 3.5s 1 forwards;
        }
        .anim8 {
            -webkit-animation: example 0.5s ease 4.0s 1 forwards;
            animation: example 0.5s ease 4.0s 1 forwards;
        }
        .anim9 {
            -webkit-animation: example 0.5s ease 4.5s 1 forwards;
            animation: example 0.5s ease 4.5s 1 forwards;
        }
        .anim10 {
            -webkit-animation: example 0.5s ease 5.0s 1 forwards;
            animation: example 0.5s ease 5.0s 1 forwards;
        }


        .anim-rev1 {
            -webkit-animation: example 0.5s ease 5.0s 1 forwards;
            animation: example 0.5s ease 5.0s 1 forwards;
        }
        .anim-rev2 {
            -webkit-animation: example 0.5s ease 4.5s 1 forwards;
            animation: example 0.5s ease 4.5s 1 forwards;
        }
        .anim-rev3 {
            -webkit-animation: example 0.5s ease 4.0s 1 forwards;
            animation: example 0.5s ease 4.0s 1 forwards;
        }
        .anim-rev4 {
            -webkit-animation: example 0.5s ease 3.5s 1 forwards;
            animation: example 0.5s ease 3.5s 1 forwards;
        }
        .anim-rev5 {
            -webkit-animation: example 0.5s ease 3.0s 1 forwards;
            animation: example 0.5s ease 3.0s 1 forwards;
        }
        .anim-rev6 {
            -webkit-animation: example 0.5s ease 2.5s 1 forwards;
            animation: example 0.5s ease 2.5s 1 forwards;
        }
        .anim-rev7 {
            -webkit-animation: example 0.5s ease 2.0s 1 forwards;
            animation: example 0.5s ease 2.0s 1 forwards;
        }
        .anim-rev8 {
            -webkit-animation: example 0.5s ease 1.5s 1 forwards;
            animation: example 0.5s ease 1.5s 1 forwards;
        }
        .anim-rev9 {
            -webkit-animation: example 0.5s ease 1s 1 forwards;
            animation: example 0.5s ease 1s 1 forwards;
        }
        .anim-rev10 {
            -webkit-animation: example 0.5s ease 0.5s 1 forwards;
            animation: example 0.5s ease 0.5s 1 forwards;
        }


    }

    .animation {
      background: #fff20c;
      color: #000;
      border: 1px solid #fff20c !important;
      span {
        background: #fff20c !important;
        color: #000 !important;
        border: 1px solid #fff20c !important;
      }
      animation: Flash1 1s infinite;
    }

    /* アニメーション */
    @keyframes Flash1{
      50%{
        opacity: 0;
      }
    }

    @-webkit-keyframes example {
      0%{
        transform: rotateX( 180deg );
      }

      100% {
        opacity: 1;
      }
    }
    @keyframes example {
      0%{
        transform: rotateX( 180deg );
      }

      100% {
        opacity: 1;
      }
    }
</style>
