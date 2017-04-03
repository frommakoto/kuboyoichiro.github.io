<template>
    <div class="manage">
        <header>
            <div class="titleWrapper">
                <p class="title">Dashboard</p>
                <span class="subtitle">Admin Page</span>
                <span class="date">{{ month }}/{{ day }}</span>
            </div>
        </header>
        <nav>
            <ul>
                <li class="active" v-on:click="changeClass"><router-link to="#">トップページ</router-link></li>
                <li v-on:click="changeClass"><router-link to="#">問題・解答編集</router-link></li>
                <li v-on:click="changeClass"><router-link to="#">問題・解答新規作成</router-link></li>
                <li v-on:click="changeClass"><router-link to="#">{{ msg }}</router-link></li>
            </ul>
        </nav>
        <section>
            <div class="titleWrapper">
                <p class="title">Dashboard</p>
                <span class="subtitle">2017/04 総会用管理ページ</span>
            </div>

            <div class="card single">
                <div class="cardTitle">
                    <span>残り日数（本番）</span>
                </div>
                <div class="cardContent">
                    <span style="font-size: 36px;"><span style="font-size: 16px; margin-right: 40px;">総会まであと</span>{{ daysLeft }}日</span>
                </div>
            </div>

            <div class="card double">
                <div class="cardTitle">
                    <span>残り日数（事前準備）</span>
                </div>
                <div class="cardContent">
                    <span style="font-size: 36px;"><span style="font-size: 16px; margin-right: 40px;">事前準備締め切りまであと</span>{{ deadLineLeft }}日</span>
                </div>
            </div>

            <div class="card triple">
                <div class="cardTitle">
                    <span>問題・解答選択肢一覧</span>
                </div>
                <div class="cardContent" style="padding: 0;">
                    <div class="tableWrapper">
                        <ul class="cell label">
                            <li class="item label"><span>出題順</span></li>
                            <li class="item label"><span>問題文</span></li>
                            <li class="item label"><span>選択肢1</span></li>
                            <li class="item label"><span>選択肢2</span></li>
                            <li class="item label"><span>選択肢3</span></li>
                            <li class="item label"><span>選択肢4</span></li>
                            <li class="item label"><span>正解</span></li>
                        </ul>
                        <ul class="cell cell-data"  v-for="(q,index) in questions" v-on:click="publishQuestion">
                            <li class="item">
                                {{index}}
                            </li>
                            <li class="item">
                                <span>{{q.problemText}}</span>
                            </li>
                            <li class="item"><span>選択肢1</span></li>
                            <li class="item"><span>選択肢2</span></li>
                            <li class="item"><span>選択肢3</span></li>
                            <li class="item"><span>選択肢4</span></li>
                            <li class="item"><span>正解</span></li>
                        </ul>
                        <!-- <ul class="cell label">
                            <li class="item label"><span>出題順</span></li>
                            <li class="item label"><span>問題文</span></li>
                            <li class="item label"><span>選択肢1</span></li>
                            <li class="item label"><span>選択肢2</span></li>
                            <li class="item label"><span>選択肢3</span></li>
                            <li class="item label"><span>選択肢4</span></li>
                            <li class="item label"><span>正解</span></li>
                        </ul>
                        <ul class="cell cell-data">
                            <li class="item"><span>1</span></li>
                            <li class="item"><span>次のうち金を１つしかとっていないのは誰でしょう</span></li>
                            <li class="item"><span>谷亮子</span></li>
                            <li class="item"><span>北島康介</span></li>
                            <li class="item"><span>吉田沙保里</span></li>
                            <li class="item"><span>田中裕二</span></li>
                            <li class="item"><span>田中裕二</span></li>
                        </ul>
                        <ul class="cell cell-data even">
                            <li class="item"><span>2</span></li>
                            <li class="item"><span>次のうち金を１つしかとっていないのは誰でしょう</span></li>
                            <li class="item"><span>谷亮子</span></li>
                            <li class="item"><span>北島康介</span></li>
                            <li class="item"><span>吉田沙保里</span></li>
                            <li class="item"><span>田中裕二</span></li>
                            <li class="item"><span>田中裕二</span></li>
                        </ul>
                        <ul class="cell cell-data">
                            <li class="item"><span>3</span></li>
                            <li class="item"><span>次のうち金を１つしかとっていないのは誰でしょう</span></li>
                            <li class="item"><span>谷亮子</span></li>
                            <li class="item"><span>北島康介</span></li>
                            <li class="item"><span>吉田沙保里</span></li>
                            <li class="item"><span>田中裕二</span></li>
                            <li class="item"><span>田中裕二</span></li>
                        </ul>
                        <ul class="cell cell-data even">
                            <li class="item"><span>4</span></li>
                            <li class="item"><span>次のうち金を１つしかとっていないのは誰でしょう</span></li>
                            <li class="item"><span>谷亮子</span></li>
                            <li class="item"><span>北島康介</span></li>
                            <li class="item"><span>吉田沙保里</span></li>
                            <li class="item"><span>田中裕二</span></li>
                            <li class="item"><span>田中裕二</span></li>
                        </ul>
                        <ul class="cell cell-data">
                            <li class="item"><span>5</span></li>
                            <li class="item"><span>次のうち金を１つしかとっていないのは誰でしょう</span></li>
                            <li class="item"><span>谷亮子</span></li>
                            <li class="item"><span>北島康介</span></li>
                            <li class="item"><span>吉田沙保里</span></li>
                            <li class="item"><span>田中裕二</span></li>
                            <li class="item"><span>田中裕二</span></li>
                        </ul> -->
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <span>manager page</span>
        </footer>
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
                url: 'http://' + window.url
            }
        },
        methods: {
            changeClass: function(event){
                console.log(event);
                return false;
            },
            publishQuestion: function(event){
                var questionId = event.target.innerText;
                var self = this;
                $.ajax(self.url + '/problems/doQuestions?id=' + questionId,{
                    method:'POST',
                    type:'POST',
                    cache:false
                })
                .done(function(json){
                    console.log(json);
                })
                .fail(function(err){});
                return false;
            }
        },
        mounted (){
            var self = this;
            self.questions = [];
            $.get(self.url + '/problems')
            .done(function(json){
                var data = json;
                $.each(data, function(i){
                    var questionData = {};
                    questionData.problemText = data[i].problem_text;
                    self.questions.push(questionData);
                });
            });
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
        background-color: #f9f9f9;
        height: 100%;
        position: relative;
        top: 70px;
        left: 280px;
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
                            font-size: 14px;
                            word-wrap: break-word;
                        }
                        .item:hover{
                            color: #dddddd;
                        }

                    }
                    ul.cell.label {
                        background-color: #333333;
                        color: #fff;
                    }

                    ul.cell.cell-data.even {
                        background-color: #cccccc;
                    }
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

        span {
            position: relative;
            top: 15px;
            left: 55%;
        }
    }

</style>
