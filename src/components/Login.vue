<template>
  <div class="login">
      <img class="logo" src="../assets/logo_kemono.png" />
      <form>
          <div class="login-wrapper">
              <label for="userid">ユーザーID</label><br />
              <input type="text" id="userid" name="userid" placeholder="ユーザーIDを入力" value="">
          </div>
      </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'ようこそジャパリパークへ！'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login {
        background: linear-gradient(#03bffe, #090f94) fixed;
        overflow: hidden;
        height: 100%;
    }

    .logo {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 200px;
    }

    form{
        .login-wrapper {
            text-align: center;

            label {
                font-size: 60px;
            }

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

        }
    }
</style>
