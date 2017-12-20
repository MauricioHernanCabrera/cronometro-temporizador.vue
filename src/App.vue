<template lang="pug">
  #app
    app-menu-opciones(
      :opcionApp="opcionApp"
      @cambiar="cambiarApp"
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
    //- app-audio.contenedor(:activo="temporizador.audioActivo")
    //- app-audio.contenedor(:activo="manual.audioActivo")

    audio(
      :id="temporizador.audioNombre" 
      v-if="temporizador.audioActivo" 
      src="src/assets/alarma.mp3" 
      type="audio/mpeg" 
      controls
    )
    audio(
      :id="manual.audioNombre"
      v-if="manual.audioActivo" 
      src="src/assets/alarma.mp3" 
      type="audio/mpeg" 
      controls
    )
    //- audio(
    //-   src="src/assets/alarma.mp3" 
    //-   type="audio/mpeg" 
    //-   controls
    //- )
    //- button(@click="activarAudio") Activar
</template>

<script>

import AppMenuOpciones from './components/padre/MenuOpciones'
import AppTemporizador from './components/padre/Temporizador'
import AppCronometro from './components/padre/Cronometro'
import AppManual from './components/padre/Manual'
import AppMenuRedes from './components/padre/MenuRedes'
import AppAudio from './components/padre/Audio'

export default {
  name: 'app',
  components: { AppAudio, AppMenuRedes, AppMenuOpciones, AppTemporizador, AppCronometro, AppManual },
  data () {
    return {
      // audio: 'sonido',
      // estaActivo: false,
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
        iteraciones: 1
      },
      opcionApp: 1
    }
  },
  methods: {
    activarAudio () {
      this.estaActivo = !this.estaActivo
      if (this.estaActivo) {
        setTimeout(() => {
          document.getElementById(this.audio).play()
        }, 50)
      }
    },
    reiniciarValores (obj) {
      this.inicializarTiempo(obj.tiempo)
      clearInterval(obj.intervalo)
      obj.tiempoActivo = false
    },
    reducirTiempo (obj) {
      obj.tiempoActivo = !obj.tiempoActivo
      obj.audioActivo = false
      this.convertirAEntero(obj.tiempo)
      if (!this.tiempoNulo(obj.tiempo)) {
        this.convertirADosDigitos(obj.tiempo)
        if (obj.tiempoActivo) {
          const self = this
          obj.intervalo = setInterval(function () {
            self.reducirValores(obj)
          }, 100)
        } else {
          clearInterval(obj.intervalo)
        }
      } else {
        this.convertirADosDigitos(obj.tiempo)
        obj.tiempoActivo = !obj.tiempoActivo
      }
    },
    incrementarTiempo (obj) {
      obj.tiempoActivo = !obj.tiempoActivo
      this.convertirAEntero(obj.tiempo)
      this.convertirADosDigitos(obj.tiempo)
      if (obj.tiempoActivo) {
        const self = this
        obj.intervalo = setInterval(function () {
          self.incrementarValores(obj)
        }, 100)
      } else {
        this.convertirAEntero(obj.tiempo)
        this.convertirADosDigitos(obj.tiempo)
        clearInterval(obj.intervalo)
      }
    },
    agregarALista (obj, opts) {
      let max = 0
      let auxTiempoActivo = obj.tiempoActivo
      if (opts === 1 || opts === 3) {
        max = 5
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
    reducirValores (obj) {
      this.convertirAEntero(obj.tiempo)
      if (this.tiempoNulo(obj.tiempo)) {
        obj.audioActivo = true
        setTimeout(() => {
          document.getElementById(obj.audioNombre).play()
        }, 50)
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
    iniciarManual (obj) {
      if (obj.listaDeTiemposTotal.length === 0) {
        this.armarArregloDeTiemposTotales(obj)
      }
      if (this.tiempoNulo(obj.tiempo) && obj.listaDeTiemposTotal.length !== 0) {
        obj.tiempo = this.clonarObjeto(obj.listaDeTiemposTotal[0])
      }
      obj.tiempoActivo = !obj.tiempoActivo
      obj.audioActivo = false
      this.convertirAEntero(obj.tiempo)
      if (!this.tiempoNulo(obj.tiempo)) {
        this.convertirADosDigitos(obj.tiempo)
        if (obj.tiempoActivo) {
          const self = this
          obj.intervalo = setInterval(function () {
            self.reducirValoresManual(obj)
          }, 100)
        } else {
          clearInterval(obj.intervalo)
        }
      } else {
        this.convertirADosDigitos(obj.tiempo)
        obj.tiempoActivo = !obj.tiempoActivo
      }
    },
    clonarObjeto (obj) {
      return Object.assign({}, obj)
    },
    reducirValoresManual (obj) {
      this.convertirAEntero(obj.tiempo)
      if (this.tiempoNulo(obj.tiempo)) {
        obj.listaDeTiemposTotal.shift()
        if (obj.listaDeTiemposTotal.length === 0) {
          obj.iteraciones--
          obj.audioActivo = true
          setTimeout(() => {
            document.getElementById(obj.audioNombre).play()
          }, 50)
          setTimeout(() => {
            obj.audioActivo = false
          }, 1000)
          this.reiniciarValores(obj)
        } else {
          obj.audioActivo = true
          setTimeout(() => {
            document.getElementById(obj.audioNombre).play()
          }, 50)
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
    armarArregloDeTiemposTotales (obj) {
      const cantElementos = obj.iteraciones * obj.listaDeTiempos.length
      const longitudDeListaDeTiempos = obj.listaDeTiempos.length
      for (let i = 0; i < cantElementos; i++) {
        const indice = i % longitudDeListaDeTiempos
        obj.listaDeTiemposTotal.push(this.clonarObjeto(obj.listaDeTiempos[indice]))
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
body{
  max-height: 100vh;
  font-size: 32px;
  font-family: sans-serif;
  background: #00393b;
  color: #fef7f4;
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
