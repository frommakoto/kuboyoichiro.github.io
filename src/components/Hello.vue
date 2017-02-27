<template>
  <div class="hello">
      <router-link to="/dokaben">
          <img class="logo" src="../assets/logo_kemono.png" />
      </router-link>
    <!-- <router-link to="/question">
        <img class="logo" src="../assets/logo_kemono.png" />
    </router-link> -->
    <!-- <a href="http://kemono-friends.jp/">
        <img src="../assets/serval.jpg" />
    </a> -->
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'ようこそジャパリパークへ！'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .hello {
        position: relative;
        top: 40%;
        left: 25%;
    }


    @media(max-width: 1000px){
        .hello {
            top: 0;
            left: 0;
            background: linear-gradient(#9ab9ef, #c8a27d) fixed;
            height: 100%;
        }

        img {
            width: 100%;
        }

        .logo {
            margin-top: 500px;
        }
    }
</style>
