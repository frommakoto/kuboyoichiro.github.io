<template>
  <div class="screen">
      <ul class="imageWrapper">
          <li class="questionImage" v-for="n in 4"></li>
      </ul>
      <div class="questionText">
          <div class="questionLogo">Q</div>
          <div class="questionInnerText">
              <span>問題文問題文問題文問題文</span>
          </div>
          <div class="time">
              <span>10</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 4
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .screen{
        font-size: 100%;
        width: 100%;
        height: 100%;
        background: url('../assets/screen_bg.png') no-repeat;
        background-size: cover;
    }

    .imageWrapper {
        position: relative;
        top: 15%;
        left: 10%;
        width: 70%;
        height: 80%;

        -moz-column-count: 2;
        -webkit-column-count: 2;
        column-count: 2;
        -moz-column-gap: 1em;
        -webkit-column-gap: 1em;
        column-gap: 1em;

        .questionImage {
            width: 100%;
            height: 40%;
            background-size: cover;
            background-image: url('../assets/question_sample.jpg');
            margin-right: 5%;
            margin-bottom: 10%;
        }
    }

    .questionText{
        position: relative;
        top: -65%;
        left: 85%;
        width: 10%;
        height: 70%;
        background-color: #7f3db7;


        .questionLogo {
            position: relative;
            top: 3%;
            font-size: 1.2rem;
            text-align: center;
        }

        .questionInnerText{
            position: relative;
            top: 10%;
            left: 5%;
            background-color: #bfbfbf;
            color: #fefdff;
            font-weight: bold;
            margin: 5%;
            padding: 5% 20%;
            border-radius: 0.5em;
            -webkit-writing-mode: vertical-rl;
            -ms-writing-mode: tb-rl;
            writing-mode: vertical-rl;
            font-size: 3.0rem;
            text-align: center;
        }

        .time {
            position: relative;
            top: 20%;
            text-align: center;
            z-index: 2;
            font-size: 3.0rem;
            color: #ffffff;
            font-weight: bold;
            border: 3px s0lid #333333;
            background-color: #ff0000;
            border-radius: 1.0em;
        }
    }
</style>
