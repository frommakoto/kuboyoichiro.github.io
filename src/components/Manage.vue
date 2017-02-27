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
                <li class="active" v-on:click="changeClass"><router-link to="#">ページ1</router-link></li>
                <li v-on:click="changeClass"><router-link to="#">ページ2</router-link></li>
                <li v-on:click="changeClass"><router-link to="#">ページ3</router-link></li>
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

            <div class="card double">
                <div class="cardTitle">
                    <span>問題一覧</span>
                </div>
                <div class="cardContent">
                    <span>fugaaaaaaaaaaaaa</span>
                </div>
            </div>

            <div class="card single">
                <div class="cardTitle">
                    <span>なんか</span>
                </div>
                <div class="cardContent">
                    <span>fugaaaaaaaaaaaaa</span>
                </div>
            </div>

            <div class="card triple">
                <div class="cardTitle">
                    <span>問題入力フォーム</span>
                </div>
                <div class="cardContent">
                    <span>fugaaaaaaaaaaaaa</span>
                </div>
            </div>
        </section>
        <footer>
            <span>manager page</span>
        </footer>
    </div>
</template>


<script>
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
                msg: 'メッセージバインディング'
            }
        },
        methods: {
            changeClass: function(event){
                console.log(event);
                return false;
            }
        }
    }
</script>

<style scoped lang="scss">

    .manage {
        height: 100%;
        font-size: 12px;
        font-family:"Helvetica","ヒラギノ角ゴ ProN W3",HiraKakuProN-W3;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    header {
        position: fixed;
        top: 0;
        background-color: #ffffff;
        width: 100%;
        z-index: 3;
        height: 5%;

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
        top: 5%;
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
        top: 5%;
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
                padding: 10px;
            }
        }

        .single {
            width: 400px;
        }

        .double {
            width: 800px;
        }

        .triple {
            width: 1245px;
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
