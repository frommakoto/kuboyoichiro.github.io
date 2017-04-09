<template>
    <div class="manage">
        <header>
            <div class="titleWrapper">
                <p class="title">Dashboard</p>
                <span class="subtitle">Admin Page</span>
                <span class="date">{{ month }}/{{ day }}</span>
            </div>
        </header>
        <!-- <nav>
            <ul>
                <li class="active" v-on:click="changeClass"><router-link to="#">トップページ</router-link></li>
                <li v-on:click="changeClass"><router-link to="#">問題・解答編集</router-link></li>
                <li v-on:click="changeClass"><router-link to="#">問題・解答新規作成</router-link></li>
                <li v-on:click="changeClass"><router-link to="#">{{ msg }}</router-link></li>
            </ul>
        </nav> -->
        <section>
            <div class="titleWrapper">
                <p class="title">Dashboard</p>
                <span class="subtitle">2017/04 総会（オールスター感謝祭）管理・操作ページ</span>
            </div>

            <div class="card single">
                <div class="cardTitle">
                    <span>セッション切り替え</span>
                </div>
                <div class="cardContent" id="changeSessionButton" v-on:click="changeSession">
                    <span class="cardButton">セッションを切り替える</span>
                </div>
            </div>

            <div class="card single">
              <div class="cardTitle">
                <span>現在のラウンド</span>
              </div>
              <div class="cardContent">
                <span style="font-size: 24px;">{{roundId}}</span>
              </div>
            </div>

            <div class="card single">
              <div class="cardTitle">
                 <span>ラウンド切り替え</span>
              </div>
              <div class="cardContent">
                <input type="text" id="roundid" name="roundid" placeholder="変更したいラウンドIDを入力" value="">
                <button class="changeRoundButton" id="changeRound">変更する</button>
              </div>
            </div>

            <div class="card single">
              <div class="cardTitle">
                 <span>制限時間フラグ</span>
              </div>
              <div class="cardContent">
                <span style="font-size: 24px;">{{isAnswerMessage}}</span>
                <button class="changeRoundButton" id="isAnswer">変更する</button>
              </div>
            </div>

            <div class="card single">
              <div class="cardTitle">
                 <span>特例フラグ</span>
              </div>
              <div class="cardContent">
                <span style="font-size: 24px;">{{isSpecialMessage}}</span>
                <button class="changeRoundButton" id="isSpecial">変更する</button>
              </div>
            </div>

            <div class="card single">
              <div class="cardTitle">
                 <span>全ユーザー回答権リセットボタン</span>
              </div>
              <div class="cardContent">
                <button class="changeRoundButton" id="userReset">リセットする</button>
              </div>
            </div>

            <div class="card triple">
                <div class="cardTitle">
                    <span>問題・解答選択肢一覧</span>
                </div>
                <div class="cardContent" style="padding: 0;">
                    <div class="tableWrapper">
                        <ul class="cell label">
                            <li class="item label"><span>インデックス</span></li>
                            <li class="item label"><span>問題文</span></li>
                        </ul>
                        <ul class="cell cell-data"  v-for="(q,index) in questions">
                            <li class="item index"  v-on:click="publishQuestion(index)">
                                {{index}}
                            </li>
                            <li class="item">
                                <span>{{q.problemText}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- <footer>
            <span>manager page</span>
        </footer> -->
    </div>
</template>


<script>
    import * as $ from 'jquery';
    import url from '../assets/url.js';

    export default {
        name: 'Manage',
        data() {
            var date = new Date();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var xDay = new Date(2017, 3, 10);
            var deadLine = new Date(2017, 2, 25);
            var dayms = 24 * 60 * 60 * 1000;
            var daysLeft = Math.floor((xDay.getTime() - date.getTime()) / dayms) + 1;
            var deadLineLeft =  Math.floor((deadLine.getTime() - date.getTime()) / dayms) + 1;
            return {
                month: month,
                day: day,
                daysLeft: daysLeft,
                deadLineLeft: deadLineLeft,
                msg: 'メッセージバインディング',
                questions: [],
                url: 'http://' + window.url,
                roundId: 1,
                statusUrl: 'http://' + window.statusUrl,
                isAnswerFlg: '',
                isSpecialFlg: '',
                isAnswerMessage: '',
                isSpecialMessage: ''
            }
        },
        methods: {
            // 次に出題する問題を決定するボタン
            publishQuestion: function(value){
                // var questionId = event.target.innerText;
                var questionId = value;
                var self = this;
                var text = self.questions[questionId].problemText;
                if(window.confirm('問題文：' + text + '  この問題を出題しますか？')){
                  $.ajax(self.url + '/problems/doQuestions?id=' + questionId,{
                      method:'POST',
                      type:'POST',
                      cache:false
                  })
                  .done(function(json){
                      console.log(json);
                      alert('出題準備成功！');
                  })
                  .fail(function(err){});
                }
                return false;
            },
            // セッション変更ボタン
            changeSession: function(){
                var self = this;
                if(window.confirm('セッションを変更しますか？')){
                  $.ajax(self.url + '/rounds/changeSession?id=' + self.roundId, {
                    method:'POST',
                    type:'POST',
                    cache:false
                  })
                  .done(function(json){
                    console.log(json);
                    self.roundId += 1;
                    alert('セッション変更成功！');
                  });
                }
            }
        },
        mounted (){
            var self = this;
            self.questions = [];

            $.get(self.statusUrl + '/isAnswer')
            .done(function(json){
                if(json === true){
                    self.isAnswerFlg = true;
                    self.isAnswerMessage = '時間内';
                }
                else {
                    self.isAnswerFlg = false;
                    self.isAnswerMessage = '時間外';
                }
                return false;
            });

            $.get(self.statusUrl + '/isSpecial')
            .done(function(json){
                if(json === true){
                    self.isSpecialFlg = true;
                    self.isSpecialMessage = '回答可能';
                }
                else {
                    self.isSpecialFlg = false;
                    self.isSpecialMessage = '回答不可';
                }
                return false;
            });

            // 問題一覧取得
            $.get(self.url + '/problems')
            .done(function(json){
                var data = json;
                $.each(data, function(i){
                    var questionData = {};
                    questionData.problemText = data[i].problem_text;
                    self.questions.push(questionData);
                });
            });

            // ラウンド変更ボタン
            $('#changeRound').on('click', function(){
                var number = $('#roundid').val();
                if(window.confirm('ラウンドを変更しますか？')){
                  if(!isNaN(number)){
                      $.ajax(self.url + '/steps/refleshRound?round_id=' + number,{
                          method:'POST',
                          type:'POST',
                          cache:false
                      })
                      .done(function(json){
                          console.log(json);
                          self.roundId = number;
                          alert('変更しました');
                      });
                  }
                  else {
                    alert('数値を入力してください');
                  }
                }
                return false;
            });

            // 制限時間フラグ更新ボタン
            $('#isAnswer').on('click', function(){
                if(window.confirm('時間内/外フラグを変更しますか？')){
                  $.ajax(self.statusUrl + '/isAnswerChange', {
                      method:'POST',
                      type:'POST',
                      cache:false
                  })
                  .done(function(json){
                      if(json === true){
                          self.answerFlg = true;
                          self.isAnswerMessage = '時間内';
                      }
                      else {
                          self.answerFlg = false;
                          self.isAnswerMessage = '時間外';
                      }
                      alert('時間内/外フラグを変更しました');
                      return false;
                  });
                }
                return false;
            });

            // 特例フラグ更新ボタン
            // 制限時間フラグ更新ボタン
            $('#isSpecial').on('click', function(){
                 $.ajax(self.statusUrl + '/isSpecialChange', {
                     method:'POST',
                     type:'POST',
                     cache:false
                 })
                 .done(function(json){
                     if(json === true){
                         self.isSpecialFlg = true;
                         self.isSpecialMessage = '回答可能';
                     }
                     else {
                         self.isSpecialFlg = false;
                         self.isSpecialMessage = '回答不可';
                     }
                     return false;
                 });
            });

            // 全ユーザー復活ボタン
            $('#userReset').on('click', function(){
                if(window.confirm('全ユーザーの回答権をリセットしますか？')){
                    $.ajax(self.url + '/steps/revivalUser',{
                        method:'POST',
                        type:'POST',
                        cache:false
                    })
                    .done(function(){
                        alert('全員復活です！');

                        // ローカルストレージのフラグもクリアしてやる
                        $.ajax(self.statusUrl + '/isSpecialChange', {
                            method:'POST',
                            type:'POST',
                            cache:false
                        })
                        .done(function(json){
                            alert('ローカルのフラグも併せてリセットします');
                            if(json === true){
                                self.isSpecialFlg = true;
                                self.isSpecialMessage = '回答可能';
                            }
                            else {
                                self.isSpecialFlg = false;
                                self.isSpecialMessage = '回答不可';
                            }
                            return false;
                        });
                    });
                }
            })
        }
    }
</script>

<style scoped lang="scss">

    .manage {
        height: 100%;
        font-size: 12px;
        font-family:"Helvetica","ヒラギノ角ゴ ProN W3",HiraKakuProN-W3;
    }

    header {
        position: fixed;
        top: 0;
        background-color: #ffffff;
        width: 100%;
        z-index: 3;
        height: 70px;

        box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
        -moz-box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
        -webkit-box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
        -o-box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
        -ms-box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);

        .titleWrapper {
            margin: 8px;
            .title {
                font-size: 24px;
                font-family: "HelveticaNeue-Bold";
            }

            .subtitle {
                font-size: 14px;
                font-family: "Helvetica Neue";
                margin-left: 20px;
            }
        }

        .date {
            float: right;
            font-size: 20px;
            margin-top: -10px;
            margin-right: 20px;
        }
    }


    nav {
        background: linear-gradient(#306785, #4486a0) fixed;
        color: #ffffff;
        width: 280px;
        height: 100%;
        position: fixed;
        top: 70px;
        overflow: auto;
        z-index: 2;

        ul {
            margin-top: 50px;

            li {
                text-align: center;
                margin: 10px 0;
                padding: 10px 0;
                cursor: pointer;
                font-size: 16px;

                a:hover {
                    color: #555555;
                }

            }
            .active {
                background-color: #2e6382;
            }
        }
    }

    section {
        // clear: both;
        // background-color: #f9f9f9;
        background-color: #dddddd;
        // height: 100%;
        position: relative;
        top: 70px;
        // left: 280px;
        // column-count: 4;
        column-count: 1;
        column-gap: 1em;

        .titleWrapper {
            margin: 20px;

            .title {
                font-size: 40px;
                font-family: "HelveticaNeue-Bold";
            }

            .subtitle {
                font-size: 24px;
            }
        }

        .card {
            display: inline-block;
            margin: 20px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px #ccc;
            overflow: hidden;

            .cardTitle {
                padding: 10px;
                background-color: #f9f9f9;

                span {
                    font-size: 16px;
                }
            }

            .cardContent {
                padding: 20px;

                display: flex;
                // justify-content: center;
                align-items: center;

                .tableWrapper {
                    display: table;
                    position: relative;
                    width: 100%;
                    margin-top: 20px;

                    ul {
                        display: table-row;
                        text-align: center;
                        li {
                            display: table-cell;
                            padding: 10px;
                        }

                        .item.label {
                            font-size: 18px;
                        }

                        .item {
                            font-size: 18px;
                            word-wrap: break-word;
                        }
                        .index {
                          font-size: 24px;
                        }
                        .index:hover{
                            color: #dddddd;
                        }

                    }
                    ul.cell.label {
                        background-color: #333333;
                        color: #fff;
                    }

                    ul.cell.cell-data:ntd-child(2n) {
                        background-color: #cccccc;
                    }
                }

                .cardButton {
                  font-size: 18px;
                }
                .cardButton:hover {
                  color: #cccccc;
                }
                #roundid {
                  width: 60%;
                  height: 30px;
                  font-size: 18px;
                  padding-left: 12px;
                }

                .changeRoundButton {
                  background: #fff;
                  font-size: 14px;
                  padding: 10px;
                  margin-left: 40px;
                  float: right;
                }
            }
        }

        .single {
            width: 30%;
        }

        .double {
            width: 60%;
        }

        .triple {
            width: 93%;
        }
    }

    footer {
        position: fixed;
        bottom: 0;
        background-color: #eeeeee;
        color: #aaaaaa;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
