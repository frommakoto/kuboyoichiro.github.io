<template>
  <div class="ranking">
      <ul class="rankingWrapper">
          <li v-for="r in rankings" class="ranking">
              <span class="nameRank">
                  <span class="number">{{r.ranking}}</span>
                  <span class="name">{{r.name}}</span>
              </span>
              <span class="count">
                  <span class="gain">獲得額：{{r.gain}}円</span>
                  <span class="time">1:55:55</span>
              </span>
          </li>
      </ul>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    export default {
        data () {
            return {
                rankings : [
                    {
                        ranking: 1,
                        name: "name",
                        gain: 100
                    },
                    {
                        ranking: 2,
                        name: "name",
                        gain: 100
                    },
                    {
                        ranking: 3,
                        name: "name",
                        gain: 100
                    },
                    {
                        ranking: 4,
                        name: "name",
                        gain: 100
                    },
                    {
                        ranking: 5,
                        name: "name",
                        gain: 100
                    },
                    {
                        ranking: 6,
                        name: "name",
                        gain: 100
                    },
                    {
                        ranking: 7,
                        name: "name",
                        gain: 100
                    },
                    {
                        ranking: 8,
                        name: "name",
                        gain: 100
                    },
                    {
                        ranking: 9,
                        name: "name",
                        gain: 100
                    }
                ]
            }
        },
        mounted () {
            $.ajax('http://35.187.217.35:3000/users/ranking',{
                method:'POST',
                type:'POST',
                cache:false
            })
            .done(function(json){
                console.log(json);
            })
            .fail(function(err){});


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
        // padding-bottom: 20px;
        height: 100%;

        .ranking {
            font-size: 2.0rem;
            // background: #fff;
            color: #000;
            // border: solid 1px #000000;
            // border-radius: 0.5rem;
            margin-bottom: 15px;
            // height: 75px;
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
                    right: 30px;
                }
            }
        }
    }
</style>
