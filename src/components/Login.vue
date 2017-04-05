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
              // console.log(e);
              // var userName = encodeURIComponent($('#userid').val());
              // var userName = String(userName);
              var userName = $('#userid').val();
              console.log(userName);
              $.ajax(self.url + '/users?name=' + userName + '&user_point=0', {
                  method: 'POST',
                  type: 'POST',
                  cache: false
              })
              .done(function(json){
                console.log(json);
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
                  location.href="#ready"
                });
              });
            }
        },
        mounted(){
            var self = this;
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
        // background: linear-gradient(#03bffe, #090f94) fixed;
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
        overflow: hidden;
        overflow: hidden;
        height: 100%;
    }

    .logo {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 200px;
    }

    // form{
        .login-wrapper {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            input {
                width: 60%;
                height: 100px;
                font-size: 40px;
            }

            input::-webkit-input-placeholder {
             color: #000;
             font-size: 40px;
            }
            input:-moz-placeholder {
             color: #000;
             font-size: 40px;
            }

            .loginButton {
                background: #fff;
                font-size: 40px;
                padding: 20px;
                margin-left: 40px;
            }

        }
    // }
</style>
