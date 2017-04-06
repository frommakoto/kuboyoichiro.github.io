<template>
  <div class="login">
      <img class="logo" src="../assets/logo_kemono.png" />
      <div class="login-wrapper">
          <input type="text" id="userid" name="userid" placeholder="名前（フルネーム）を入力" value="">
          <button class="loginButton">はじめる！</button>
      </div>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    import url from '../assets/url.js';

    export default {
        name: 'login',
        data () {
            return {
                msg: 'ようこそジャパリパークへ！',
                url: 'http://' + window.url
            }
        },
        methods: {
            login: function(e){
              var self = this;
              var userName = $('#userid').val();
              $.ajax(self.url + '/users?name=' + userName + '&user_point=0', {
                  method: 'POST',
                  type: 'POST',
                  cache: false
              })
              .done(function(json){
                var userId = json.id;
                $.ajax(self.url + '/steps?user_id=' + userId + '&round_id=1&response_time=0&mistake_flg=false', {
                    method: 'POST',
                    type: 'POST',
                    cache: false
                })
                .done(function(json){
                  alert('あなたの名前は' + userName + 'です．楽しいゲームを！');
                  window.localStorage.setItem('userName', userName);
                  window.localStorage.setItem('userId', userId);
                  window.localStorage.setItem('answerFlg', false);
                  location.href="#ready"
                });
              });
            }
        },
        mounted(){
            var self = this;
            // ユーザーIDが既に発行されている場合はreadyページに飛ばす
            var userId = window.localStorage.getItem('userId');
            if (userId){
                location.href="#ready"
            }
            $('#userid').focus();
            $('.loginButton').on('click', function(e){
                self.login(e);
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login {
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
        overflow: hidden;
        overflow: hidden;
        height: 100%;
        position: relative;
        text-align: center;
    }

    .logo {
        width: 90%;
        margin-top: 35%;
    }

    .login-wrapper {
        // position: absolute;
        // top: 40%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        input {
            width: 60%;
            height: 40px;
            font-size: 14px;
        }

        input::-webkit-input-placeholder {
         color: #000;
         font-size: 14px;
        }
        input:-moz-placeholder {
         color: #000;
         font-size: 14px;
        }

        .loginButton {
            background: #fff;
            font-size: 14px;
            padding: 10px;
            margin-left: 10px;
        }

    }
</style>
