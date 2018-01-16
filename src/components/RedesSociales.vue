<template lang="pug">
  main
    ul.redes.contenedor
      li: a.icon(
        href="https://www.facebook.com/Hmc97"
        target="_blank"
      ) 
        span.texto Facebook
      li: a.icon(
        href="https://twitter.com/hernanmc06"
        target="_blank"
      ) 
        span.texto Twitter
      li: a.icon(
        href="https://www.instagram.com/hernanmauriciocabrera/"
        target="_blank"
      )
        span.texto Instagram
      li: a.icon(
        href="https://github.com/HernanCabrera"
        target="_blank"
      )
        span.texto Github
</template>
<script>
import { mapState } from 'vuex'
export default{
  created () {
    this.$store.commit('setOpcionAPP', 4)
  },
  computed: {
    ...mapState(['opcionAPP'])
  }
}
</script>
<style lang="scss">
.redes{
  list-style: none;
  margin: 0 auto;
  li{
    margin-top: 2%;
    text-align: center;
    .icon{
      text-decoration: none;
      color: #fff;
      padding: 40px 0;
      display: block;
      background: #003133;
      transition: .3s;
    }
    .icon:active{
      background: #002426;
    }
    .icon:hover{
      background: #002426;
    }
  }
  li:last-child{
    margin-bottom: 30px;
  }
}
@media (max-width: 525px){
  .redes{
    li{
      .icon{
        padding: 32px 0;
      }
    }
    li:last-child{
      margin-bottom: 24px;
    }
  }
}
@media (max-width: 425px){
  .redes{
    li{
      .icon{
        padding: 25.6px 0;
      }
    }
    li:last-child{
      margin-bottom: 19.2px;
    }
  }
}
@media (max-width: 325px){
  .redes{
    li{
      .icon{
        padding: 20.48px 0;
      }
    }
    li:last-child{
      margin-bottom: 15.36px;
    }
  }
}
</style>
