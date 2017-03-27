<template>
  <div class="ranking">
  </div>
</template>

<script>
    import * as $ from 'jquery';
    export default {
        data () {
            return {
                count: 4,
                state: 1,
                text: '選択肢'
            }
        },
        mounted () {

            $(document).on('keydown', function(e){
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
</style>
