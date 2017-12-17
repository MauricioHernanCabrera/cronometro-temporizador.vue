<template lang="pug">
  #app
    ul.menu
      li(:class="{'opcion-activo': opcionApp === 1 }" @click="cambiarApp(1)")
        button.icon.icon-hour-glass
      li(:class="{'opcion-activo': opcionApp === 2 }" @click="cambiarApp(2)")
        button.icon.icon-stopwatch
      li(:class="{'opcion-activo': opcionApp === 3 }" @click="cambiarApp(3)")
        button.icon.icon-hammer
      li(:class="{'opcion-activo': opcionApp === 4 }" @click="cambiarApp(4)")
        button.icon.icon-man
  
    app-audio.contenedor(
      :activo="temporizador.audioActivo"
    )
    app-audio.contenedor(
      :activo="manual.audioActivo"
    )
    
    //-Temporizador
    div(v-show="opcionApp === 1")
      app-tiempo.contenedor(
        :tiempo="temporizador.tiempo"
        :activo="temporizador.tiempoActivo"
      )
      //- aca---------------------------
      app-botones.contenedor(
        :tiempoActivo="temporizador.tiempoActivo"
        :obj="temporizador"
        :opts="1"
        @reiniciar="reiniciarValores"
        @iniciar="reducirTiempo"
        @agregar="agregarALista"
      )
      app-lista-de-tiempos.contenedor(
        :lista="temporizador.listaDeTiempos"
        :obj="temporizador"
        :opts="1"
        @agregar="agregarAlPrincipal"
        @eliminar="eliminarTiempo"
      )
    
    //-Cronometro
    div(v-show="opcionApp === 2")
      app-tiempo.contenedor(
        :tiempo="cronometro.tiempo"
        :activo="(cronometro.tiempoActivo || !cronometro.tiempoActivo)"
      )
      //- aca---------------------------
      app-botones.contenedor(
        :tiempoActivo="cronometro.tiempoActivo"
        :obj="cronometro"
        :opts="2"
        @reiniciar="reiniciarValores"
        @iniciar="incrementarTiempo"
        @agregar="agregarALista"
      )
      app-lista-de-tiempos.contenedor(
        :lista="cronometro.listaDeTiempos"
        :obj="cronometro"
        :opts="2"
        @agregar="agregarAlPrincipal"
        @eliminar="eliminarTiempo"
      )
    
    //-Manual
    div(v-show="opcionApp === 3")
      //- aca---------------------------
      //- app-botones.contenedor(
      //-   :tiempoActivo="manual.tiempoActivo"
      //-   :obj="manual"
      //-   :opts="1"
      //-   @reiniciar="reiniciarValores"
      //-   @iniciar=""
      //-   @agregar="agregarALista"
      //- )
      //- app-tiempo.contenedor(
      //-   :tiempo="manual.tiempo"
      //-   :activo="manual.tiempoActivo"
      //- )
      //- app-lista-de-tiempos.contenedor(
      //-   :lista="manual.listaDeTiempos"
      //-   :obj="manual"
      //-   :opts="2"
      //-   @agregar="agregarAlPrincipal"
      //-   @eliminar="eliminarTiempo"
      //- )
      
    //-Yo :)
    div(v-show="opcionApp === 4")
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

import AppAudio from './components/Audio'
import AppTiempo from './components/Tiempo'
import AppBotones from './components/Botones'
import AppListaDeTiempos from './components/ListaDeTiempos'
import AppIteraciones from './components/Iteraciones.vue'

export default {
  name: 'app',
  components: { AppTiempo, AppBotones, AppAudio, AppListaDeTiempos, AppIteraciones },
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
        tiempoActivo: false,
        intervalo: null,
        iteraciones: 1
      },
      opcionApp: 1
    }
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
      console.log(opts)
      let max = 0
      let auxTiempoActivo = obj.tiempoActivo
      if (opts === 1) {
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
        } else {
          obj.listaDeTiempos.unshift(aux)
        }
      }
    },
    eliminarTiempo (indice, obj) {
      obj.listaDeTiempos.splice(indice, 1)
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
    }
  }
}
</script>

<style lang="scss">


$blanco: #fff;
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
  margin-top: 15px;
  margin: 10px auto;
}
.menu{
  background: #003133;
  list-style: none;
  display: flex;
  margin: 0 auto;
  max-width: 700px;
  li{
    width: 25%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: .3s;
    .icon{
      font-size: 1.2em;
      color: $blanco;
      background: none;
      cursor: pointer;
    }
  }
  .icon:last-child{
    border-right: 0;
  }
}
.opcion-activo{
  background: #002426;
}
.redes{
  list-style: none;
  margin: 0 auto;
  li{
    margin-top: 2%;
    text-align: center;
    .icon{
      text-decoration: none;
      color: $blanco;
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
  body{
    font-size: 25.6px;
  }
  .menu{
    li{
      height: 80px;
    }
  }
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
  body{
    font-size: 20.48px;
  }
  .menu{
    li{
      height: 64px;
    }
  }
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
  body{
    font-size: 16px;
  }
  .menu{
    li{
      height: 51.2px;
    }
  }
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
@keyframes animation {
  0%{
    transform: scale(1)
  }
  100%{
    transform: scale(1.3)
  }
}
</style>
