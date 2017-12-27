<template lang="pug">
  #app
    app-menu-opciones(
      :opcionApp="opcionApp"
      :fullScreen="estaFullScreen"
      @cambiar="cambiarApp"
      @fullscreen="cambiarFullScreen"
    )
    app-temporizador(
      :opcionApp="opcionApp"
      :obj="temporizador"
      @reiniciarBtnBotones="reiniciarValores"
      @iniciarBtnBotones="reducirTiempo"
      @agregarBtnBotones="agregarALista"
      @agregarBtnLista="agregarAlPrincipal"
      @eliminarBtnLista="eliminarTiempo"
    )
    app-cronometro(
      :opcionApp="opcionApp"
      :obj="cronometro"
      @reiniciarBtnBotones="reiniciarValores"
      @iniciarBtnBotones="incrementarTiempo"
      @agregarBtnBotones="agregarALista"
      @agregarBtnLista="agregarAlPrincipal"
      @eliminarBtnLista="eliminarTiempo"
    )
    app-manual(
      :opcionApp="opcionApp"
      :obj="manual"
      @reiniciarBtnBotones="inicializarValoresManual"
      @iniciarBtnBotones="iniciarManual"
      @agregarBtnBotones="activarAgregarTiempo"
      @agregarBtnNuevoTiempo="agregarALista"
      @cancelarBtnNuevoTiempo="cancelarTiempo"
      @agregarBtnLista="agregarAlPrincipal"
      @eliminarBtnLista="eliminarTiempo"
    )
      
    app-menu-redes(:opcionApp="opcionApp")
    audio(
      :id="temporizador.audioNombre" 
      src="src/assets/alarma.mp3" 
      type="audio/mpeg"
      controls
    )
    audio(
      :id="manual.audioNombre"
      src="src/assets/alarma.mp3" 
      type="audio/mpeg" 
      controls
    )
</template>

<script>

import AppMenuOpciones from './components/padre/MenuOpciones'
import AppTemporizador from './components/padre/Temporizador'
import AppCronometro from './components/padre/Cronometro'
import AppManual from './components/padre/Manual'
import AppMenuRedes from './components/padre/MenuRedes'

export default {
  name: 'app',
  components: { AppMenuRedes, AppMenuOpciones, AppTemporizador, AppCronometro, AppManual },
  data () {
    return {
      temporizador: {
        tiempo: {
          hora: 0,
          minuto: '00',
          segundo: '00',
          milisegundo: 0
        },
        listaDeTiempos: [],
        tiempoActivo: false,
        audioActivo: false,
        audioNombre: 'temporizador',
        audioID: null,
        intervalo: null
      },
      cronometro: {
        tiempo: {
          hora: 0,
          minuto: '00',
          segundo: '00',
          milisegundo: 0
        },
        listaDeTiempos: [],
        tiempoActivo: false,
        intervalo: null
      },
      manual: {
        tiempo: {
          hora: 0,
          minuto: '00',
          segundo: '00',
          milisegundo: 0
        },
        listaDeTiempos: [],
        listaDeTiemposTotal: [],
        tiempoActivo: false,
        intervalo: null,
        agregarActivo: false,
        audioActivo: false,
        audioNombre: 'manual',
        audioID: null,
        iteraciones: 1
      },
      opcionApp: 1,
      estaFullScreen: false
    }
  },
  mounted () {
    this.temporizador.audioID = document.getElementById('temporizador')
    this.manual.audioID = document.getElementById('manual')
  },
  methods: {
    reiniciarValores (obj) {
      this.inicializarTiempo(obj.tiempo)
      clearInterval(obj.intervalo)
      obj.tiempoActivo = false
    },
    reducirTiempo (obj) {
      obj.tiempoActivo = !obj.tiempoActivo
      obj.audioActivo = false
      this.convertirAEntero(obj.tiempo)
      // Solucion al problema de celulares
      obj.audioID.play()
      obj.audioID.pause()
      // ---------------------------------
      if (!this.tiempoNulo(obj.tiempo)) {
        this.convertirADosDigitos(obj.tiempo)
        if (obj.tiempoActivo) {
          obj.intervalo = setInterval(() => {
            this.reducirValores(obj)
          }, 100)
        } else {
          clearInterval(obj.intervalo)
        }
      } else {
        this.convertirADosDigitos(obj.tiempo)
        obj.tiempoActivo = !obj.tiempoActivo
      }
    },
    reducirValores (obj) {
      this.convertirAEntero(obj.tiempo)
      if (this.tiempoNulo(obj.tiempo)) {
        obj.audioActivo = true
        obj.audioID.play()
        this.reiniciarValores(obj)
      } else {
        if (obj.tiempo.minuto === 0 && obj.tiempo.hora > 0 && obj.tiempo.segundo === 0 && obj.tiempo.milisegundo === 0) {
          obj.tiempo.hora--
          obj.tiempo.minuto = 60
        }
        if (obj.tiempo.segundo === 0 && obj.tiempo.minuto > 0 && obj.tiempo.milisegundo === 0) {
          obj.tiempo.minuto--
          obj.tiempo.segundo = 60
        }
        if (obj.tiempo.milisegundo === 0 && obj.tiempo.segundo > 0) {
          obj.tiempo.segundo--
          obj.tiempo.milisegundo = 10
        }
        obj.tiempo.milisegundo--
        this.convertirADosDigitos(obj.tiempo)
      }
    },
    incrementarTiempo (obj) {
      obj.tiempoActivo = !obj.tiempoActivo
      this.convertirAEntero(obj.tiempo)
      this.convertirADosDigitos(obj.tiempo)
      if (obj.tiempoActivo) {
        obj.intervalo = setInterval(() => {
          this.incrementarValores(obj)
        }, 100)
      } else {
        this.convertirAEntero(obj.tiempo)
        this.convertirADosDigitos(obj.tiempo)
        clearInterval(obj.intervalo)
      }
    },
    incrementarValores (obj) {
      this.convertirAEntero(obj.tiempo)
      obj.tiempo.milisegundo++
      if (obj.tiempo.milisegundo === 10) {
        obj.tiempo.segundo++
        obj.tiempo.milisegundo = 0
      }
      if (obj.tiempo.segundo === 60) {
        obj.tiempo.minuto++
        obj.tiempo.segundo = 0
      }
      if (obj.tiempo.minuto === 60) {
        obj.tiempo.hora++
        obj.tiempo.minuto = 0
      }
      this.convertirADosDigitos(obj.tiempo)
    },
    iniciarManual (obj) {
      if (obj.listaDeTiemposTotal.length === 0) {
        this.armarArregloDeTiemposTotales(obj)
      }
      if (this.tiempoNulo(obj.tiempo) && obj.listaDeTiemposTotal.length !== 0) {
        obj.tiempo = this.clonarObjeto(obj.listaDeTiemposTotal[0])
      }
      // Solucion al problema de celulares
      obj.audioID.play()
      obj.audioID.pause()
      // ----------------------------------
      obj.tiempoActivo = !obj.tiempoActivo
      obj.audioActivo = false
      this.convertirAEntero(obj.tiempo)
      if (!this.tiempoNulo(obj.tiempo)) {
        this.convertirADosDigitos(obj.tiempo)
        if (obj.tiempoActivo) {
          obj.intervalo = setInterval(() => {
            this.reducirValoresManual(obj)
          }, 100)
        } else {
          clearInterval(obj.intervalo)
        }
      } else {
        this.convertirADosDigitos(obj.tiempo)
        obj.tiempoActivo = !obj.tiempoActivo
      }
    },
    reducirValoresManual (obj) {
      this.convertirAEntero(obj.tiempo)
      if (this.tiempoNulo(obj.tiempo)) {
        obj.listaDeTiemposTotal.shift()
        if (obj.listaDeTiemposTotal.length === 0) {
          obj.iteraciones--
          obj.audioActivo = true
          setTimeout(() => {
            obj.audioActivo = false
          }, 1000)
          this.reiniciarValores(obj)
        } else {
          obj.audioActivo = true
          setTimeout(() => {
            obj.audioActivo = false
          }, 1000)
          obj.tiempo = this.clonarObjeto(obj.listaDeTiemposTotal[0])
          if (obj.listaDeTiemposTotal.length % obj.listaDeTiempos.length === 0) {
            obj.iteraciones--
          }
        }
      } else {
        if (obj.tiempo.minuto === 0 && obj.tiempo.hora > 0 && obj.tiempo.segundo === 0 && obj.tiempo.milisegundo === 0) {
          obj.tiempo.hora--
          obj.tiempo.minuto = 60
        }
        if (obj.tiempo.segundo === 0 && obj.tiempo.minuto > 0 && obj.tiempo.milisegundo === 0) {
          obj.tiempo.minuto--
          obj.tiempo.segundo = 60
        }
        if (obj.tiempo.milisegundo === 0 && obj.tiempo.segundo > 0) {
          obj.tiempo.segundo--
          obj.tiempo.milisegundo = 10
        }
        obj.tiempo.milisegundo--
        this.convertirADosDigitos(obj.tiempo)
      }
    },
    agregarALista (obj, opts) {
      let max = 0
      let auxTiempoActivo
      if (opts === 1 || opts === 3) {
        max = 5
        auxTiempoActivo = obj.tiempoActivo
      } else {
        max = 50
        auxTiempoActivo = false
      }
      if ((!auxTiempoActivo) && (!this.tiempoNulo(obj.tiempo)) && obj.listaDeTiempos.length < max) {
        this.convertirAEntero(obj.tiempo)
        const aux = {
          hora: obj.tiempo.hora,
          minuto: (obj.tiempo.minuto < 10) ? '0' + obj.tiempo.minuto : obj.tiempo.minuto,
          segundo: (obj.tiempo.segundo < 10) ? '0' + obj.tiempo.segundo : obj.tiempo.segundo,
          milisegundo: obj.tiempo.milisegundo
        }
        if (opts === 1) {
          obj.listaDeTiempos.push(aux)
          this.reiniciarValores(obj)
        } else if (opts === 2) {
          obj.listaDeTiempos.unshift(aux)
        } else {
          obj.listaDeTiemposTotal = []
          obj.listaDeTiempos.push(aux)
          this.reiniciarValores(obj)
          this.cancelarTiempo(obj)
        }
      }
    },
    eliminarTiempo (indice, obj, opts) {
      obj.listaDeTiempos.splice(indice, 1)
      if (opts === 3) {
        obj.listaDeTiemposTotal = []
        obj.intervalo = null
        this.inicializarTiempo(obj.tiempo)
      }
    },
    agregarAlPrincipal (nuevoTiempo, obj, opts) {
      if (!obj.tiempoActivo && opts === 1) {
        obj.tiempo.hora = nuevoTiempo.hora
        obj.tiempo.minuto = nuevoTiempo.minuto
        obj.tiempo.segundo = nuevoTiempo.segundo
        obj.tiempo.milisegundo = nuevoTiempo.milisegundo
      }
    },
    tiempoNulo (tiempo) {
      if (tiempo.hora === 0 && parseInt(tiempo.minuto) === 0 && parseInt(tiempo.segundo) === 0 && tiempo.milisegundo === 0) {
        return true
      } else {
        return false
      }
    },
    inicializarTiempo (tiempo) {
      tiempo.hora = tiempo.milisegundo = 0
      tiempo.minuto = tiempo.segundo = '00'
    },
    convertirAEntero (tiempo) {
      tiempo.hora = parseInt(tiempo.hora)
      tiempo.minuto = parseInt(tiempo.minuto)
      tiempo.segundo = parseInt(tiempo.segundo)
      tiempo.milisegundo = parseInt(tiempo.milisegundo)
    },
    convertirADosDigitos (tiempo) {
      tiempo.minuto = (tiempo.minuto < 10) ? `0${tiempo.minuto}` : tiempo.minuto
      tiempo.segundo = (tiempo.segundo < 10) ? `0${tiempo.segundo}` : tiempo.segundo
    },
    cambiarApp (opcion) {
      this.opcionApp = opcion
    },
    activarAgregarTiempo (obj, opts) {
      obj.agregarActivo = true
    },
    cancelarTiempo (obj) {
      obj.agregarActivo = false
      this.inicializarTiempo(obj.tiempo)
    },
    inicializarValoresManual (obj) {
      obj.listaDeTiempos = []
      obj.listaDeTiemposTotal = []
      this.inicializarTiempo(obj.tiempo)
      obj.intervalo = null
      obj.iteraciones = 1
    },
    clonarObjeto (obj) {
      return Object.assign({}, obj)
    },
    armarArregloDeTiemposTotales (obj) {
      const cantElementos = obj.iteraciones * obj.listaDeTiempos.length
      const longitudDeListaDeTiempos = obj.listaDeTiempos.length
      for (let i = 0; i < cantElementos; i++) {
        const indice = i % longitudDeListaDeTiempos
        obj.listaDeTiemposTotal.push(this.clonarObjeto(obj.listaDeTiempos[indice]))
      }
    },
    cambiarFullScreen () {
      this.estaFullScreen = !this.estaFullScreen
      const doc = window.document
      const docEl = doc.documentElement
      const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
      const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl)
      } else {
        cancelFullScreen.call(doc)
      }
    }
  },
  watch: {
    'temporizador.audioActivo' () {
      if (this.temporizador.audioActivo) {
        this.temporizador.audioID.currentTime = 0
        this.temporizador.audioID.play()
      }
    },
    'manual.audioActivo' () {
      if (this.manual.audioActivo) {
        this.manual.audioID.currentTime = 0
        this.manual.audioID.play()
      }
    }
  }
}
</script>

<style lang="scss">

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
