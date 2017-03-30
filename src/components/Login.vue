<template>
  <div class="login">
      <img class="logo" src="../assets/logo_kemono.png" />
      <!-- <form>
          <div class="login-wrapper">
              <input type="text" id="userid" name="userid" placeholder="ユーザーIDを入力" value="">
              <button class="login">はじめる！</button>
          </div>
      </form> -->
      <div class="login-wrapper">
          <input type="text" id="userid" name="userid" placeholder="ユーザーIDを入力" value="">
          <button class="loginButton">はじめる！</button>
      </div>
  </div>
</template>

<script>
    import * as $ from 'jquery';
    export default {
        name: 'login',
        data () {
            return {
                msg: 'ようこそジャパリパークへ！'
            }
        },
        methods: {
            login: function(e){
                // console.log(e);
                var userId = $('#userid').val();
                alert('あなたのユーザーIDは' + userId);
                location.href="#question"
            }
        },
        mounted(){
            var self = this;
            $('.loginButton').on('click', function(e){
                self.login(e);
                // console.log(this);
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
