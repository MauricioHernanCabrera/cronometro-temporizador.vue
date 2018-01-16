<template lang="pug">
  #app
    app-header(
      :fullScreen="estaFullScreen"
      :opcionAPP="opcionAPP"
      @fullscreen="cambiarFullScreen"
    )
    router-view

</template>
 
<script>

import AppHeader from './components/layout/Header'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: { AppHeader },
  data () {
    return {
      estaFullScreen: false
    }
  },
  computed: {
    ...mapState(['opcionAPP'])
  },
  methods: {
    incrementar () {
      this.$store.dispatch('incrementar', {
        number: 2
      })
    },
    cambiarFullScreen () {
      const doc = window.document
      const docEl = doc.documentElement
      const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
      const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        this.estaFullScreen = true
        requestFullScreen.call(docEl)
      } else {
        this.estaFullScreen = false
        cancelFullScreen.call(doc)
      }
    }
  }
}
</script>

<style lang="scss">
button{
  padding: 10px;
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}
audio{
  position: absolute;
  opacity: 0;
}
body{
  max-height: 100vh;
  font-size: 32px;
  font-family: sans-serif;
  background: #00393b;
  color: #fef7f4;
  min-height: 100vh;
}
.contenedor{
  max-width: 700px;
  margin: 10px auto;
}

@media (max-width: 525px){
  body{
    font-size: 25.6px;
  }
  .menu{
    li{
      height: 80px;
    }
  }
}
@media (max-width: 425px){
  body{
    font-size: 20.48px;
  }
  .menu{
    li{
      height: 64px;
    }
  }
}
@media (max-width: 325px){
  body{
    font-size: 16px;
  }
  .menu{
    li{
      height: 51.2px;
    }
  }
}
@keyframes animation {
  0%{
    transform: scale(1)
  }
  100%{
    transform: scale(1.3)
  }
}
</style>
