<template>
  <div class="ranking">
      <ul class="rankingWrapper">
          <li v-for="r in rankings" class="ranking">
              <span class="nameRank">
                  <span class="number">{{r.ranking}}</span>
                  <span class="name">{{r.name}}</span>
              </span>
              <span class="count" v-if="gainFlg===true">
                  <span class="gain">獲得額：{{r.gain}}円</span>
                  <span class="time">1:55:55</span>
              </span>
              <span class="count" v-if="gainFlg===false">
                  <span class="time">回答時間：{{r.time}}秒</span>
              </span>
          </li>
      </ul>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    import url from '../assets/url.js';
    export default {
        data () {
            return {
                gainFlg: false,
                rankings: [],
                url: 'http://' + window.url
            }
        },
        mounted () {
            var self = this;
            $(document).on('keyup', function(e){
                console.log(e.keyCode);
                var key = e.keyCode;

                // Sキー
                // 問題一覧ページ（スクリーン）
                if(key === 83){
                    location.href="#screen";
                }
                // Lキー
                else if(key === 76){
                    location.href="/";
                    return false;
                }
                // Zキー
                // 90
                // 金額ランキング
                else if(key === 90){
                  self.gainFlg = true;
                  $('.rankingWrapper').show();
                  $.ajax(self.url + '/users/ranking',{
                      method:'POST',
                      type:'POST',
                      cache:false
                  })
                  .done(function(json){
                      var data = json;
                      console.log(data);
                      $.each(data, function(i){
                          var pushData = {
                            ranking: i + 1,
                            name: data[i].name,
                            gain: data[i].user_point
                          };
                          self.rankings.push(pushData);
                          console.log(self.rankings);
                          if(i === 9){
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
                  $('.rankingWrapper').show();
                  $.ajax(self.url + '/steps/ranking',{
                      method:'POST',
                      type:'POST',
                      cache:false
                  })
                  .done(function(json){
                      var data = json;
                      console.log(data);
                      $('.time').show();
                      $.each(data, function(i){
                          var pushData = {
                            ranking: i + 1,
                            name: data[i].user_id,
                            time: data[i].response_time
                          };
                          self.rankings.push(pushData);
                          if(i === 9){
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
                  $('.rankingWrapper').show();
                  $.ajax(self.url + '/steps/ranking',{
                      method:'POST',
                      type:'POST',
                      cache:false
                  })
                  .done(function(json){
                      var data = json;
                      var length = data.length;
                      $('.time').show();
                      data = data.reverse();
                      $.each(data, function(i){
                          var pushData = {
                            ranking: length - i,
                            name: data[i].user_id,
                            time: data[i].response_time
                          };
                          self.rankings.push(pushData);
                          if(i === 8){
                            return false;
                          }
                      });
                  })
                  .fail(function(err){});
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
        font-size: 100%;
        width: 100%;
        height: 100%;
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
        overflow: hidden;
    }

    .rankingWrapper {
        position: relative;
        text-align: center;
        margin-top: 20px;
        margin-left: 50px;
        margin-right: 50px;
        margin-bottom: 20px;
        height: 100%;
        display: none;

        .ranking {
            font-size: 2.0rem;
            color: #000;
            margin-bottom: 15px;
            height: 8%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

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
                font-size: 1.5rem;
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
    }
</style>
