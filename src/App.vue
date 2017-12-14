<template lang="pug">
  #app
    app-audio.contenedor(
              :activo="audioActivo"
    )

    app-tiempo.contenedor(
                :tiempo="tiempo"
                :estadoDelTiempo="estadoDelTiempo"
    )
    
    app-botones.contenedor(
                :estadoDelTiempo="estadoDelTiempo"
                @reiniciar="reiniciarValores"
                @reducir="reducirTiempo"
                @agregar="agregarALista"
    )
    
    app-lista-de-tiempos.contenedor(
                          :listaDeTiempos="listaDeTiempos"
                          @agregarPrincipal="agregarAlPrincipal"
                          @eliminar="eliminarTiempo"
    )
    
    app-footer.contenedor
</template>

<script>

import AppAudio from './components/Audio.vue'
import AppTiempo from './components/Tiempo.vue'
import AppBotones from './components/Botones.vue'
import AppListaDeTiempos from './components/ListaDeTiempos.vue'
import AppFooter from './components/layout/Footer.vue'

export default {
  name: 'app',
  components: { AppTiempo, AppBotones, AppAudio, AppListaDeTiempos, AppFooter },
  data () {
    return {
      tiempo: {
        hora: 0,
        minuto: '00',
        segundo: '00',
        milisegundo: 0
      },
      estadoDelTiempo: {
        activo: false
      },
      listaDeTiempos: [],
      intervalo: null,
      audioActivo: false
    }
  },
  methods: {
    reiniciarValores () {
      this.inicializarTiempo()
      clearInterval(this.intervalo)
      this.estadoDelTiempo.activo = false
    },
    reducirTiempo () {
      this.estadoDelTiempo.activo = !this.estadoDelTiempo.activo
      this.audioActivo = false
      this.convertirAEntero()
      if (!this.tiempoNulo(this.tiempo)) {
        this.convertirADosDigitos()
        if (this.estadoDelTiempo.activo) {
          this.intervalo = setInterval(this.moverElTiempo, 100)
        } else {
          clearInterval(this.intervalo)
        }
      } else {
        this.convertirADosDigitos()
        this.estadoDelTiempo.activo = !this.estadoDelTiempo.activo
      }
    },
    agregarALista () {
      if ((!this.estadoDelTiempo.activo) && (!this.tiempoNulo(this.tiempo)) && this.listaDeTiempos.length < 5) {
        this.convertirAEntero()
        const obj = {
          hora: this.tiempo.hora,
          minuto: (this.tiempo.minuto < 10) ? '0' + this.tiempo.minuto : this.tiempo.minuto,
          segundo: (this.tiempo.segundo < 10) ? '0' + this.tiempo.segundo : this.tiempo.segundo,
          milisegundo: this.tiempo.milisegundo
        }
        this.listaDeTiempos.push(obj)
        this.reiniciarValores()
      }
    },
    eliminarTiempo (indice) {
      this.listaDeTiempos.splice(indice, 1)
    },
    agregarAlPrincipal (nuevoTiempo) {
      if (!this.estadoDelTiempo.activo) {
        this.tiempo.hora = nuevoTiempo.hora
        this.tiempo.minuto = nuevoTiempo.minuto
        this.tiempo.segundo = nuevoTiempo.segundo
        this.tiempo.milisegundo = nuevoTiempo.milisegundo
      }
    },
    moverElTiempo () {
      this.convertirAEntero()
      if (this.tiempoNulo(this.tiempo)) {
        this.audioActivo = true
        this.reiniciarValores()
      } else {
        if (this.tiempo.minuto === 0 && this.tiempo.hora > 0 && this.tiempo.segundo === 0 && this.tiempo.milisegundo === 0) {
          this.tiempo.hora--
          this.tiempo.minuto = 60
        }
        if (this.tiempo.segundo === 0 && this.tiempo.minuto > 0 && this.tiempo.milisegundo === 0) {
          this.tiempo.minuto--
          this.tiempo.segundo = 60
        }
        if (this.tiempo.milisegundo === 0 && this.tiempo.segundo > 0) {
          this.tiempo.segundo--
          this.tiempo.milisegundo = 10
        }
        this.tiempo.milisegundo--
        this.convertirADosDigitos()
      }
    },
    tiempoNulo (tiempo) {
      if (tiempo.hora === 0 && parseInt(tiempo.minuto) === 0 && parseInt(tiempo.segundo) === 0 && tiempo.milisegundo === 0) {
        return true
      } else {
        return false
      }
    },
    inicializarTiempo () {
      this.tiempo.hora = this.tiempo.milisegundo = 0
      this.tiempo.minuto = this.tiempo.segundo = '00'
    },
    convertirAEntero () {
      this.tiempo.hora = parseInt(this.tiempo.hora)
      this.tiempo.minuto = parseInt(this.tiempo.minuto)
      this.tiempo.segundo = parseInt(this.tiempo.segundo)
      this.tiempo.milisegundo = parseInt(this.tiempo.milisegundo)
    },
    convertirADosDigitos () {
      this.tiempo.minuto = (this.tiempo.minuto < 10) ? `0${this.tiempo.minuto}` : this.tiempo.minuto
      this.tiempo.segundo = (this.tiempo.segundo < 10) ? `0${this.tiempo.segundo}` : this.tiempo.segundo
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
  min-height: 100vh;
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
@media (max-width: 525px){
  body{
    font-size: 25.6px;
  }
}
@media (max-width: 425px){
  body{
    font-size: 20.48px;
  }
}
@media (max-width: 325px){
  body{
    font-size: 16px;
  }
}
/*
$verde_claro: #00393b;
$verde_oscuro: #003133;
$blanco: #fef7f4;
$celeste: #108CA5;
$rojo: #7b2d26;

body{
  min-height: 100vh;
  background: $verde_claro;
  font-family: sans-serif;
}

.contenedor{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background: $verde_claro;
}
.parte-no-visible{
  display: none;
}
.contenedor-header{
  padding: 28px 0;
  .header-app{
    width: 628px;
    background: $verde_claro;
    input{
      background: $verde_oscuro;
      color: $blanco;
      font-size: 70px;
      width: 135px;
      height: 100px;
      border: 0;
      text-align: center;
      display: inline-block;
    }
    span{
      background: $verde_claro;
      color: $blanco;
      font-size: 72px;
      padding: 0 4.6px;
      display: inline-block;
    }
  }
}

.contenedor-botones{
  padding: 0 0 28px 0;
  .botones-app{
    width: 628px;
    button{
      cursor: pointer;
      border: 0;
      display: inline-block;
      background: none;
      color: $blanco;
      height: 63px;
      font-size: 30px;
      background: $verde_oscuro;
      transition: .3s;
    }
    button:focus{
      background: rgba(0, 0, 0, 0.2);
    }
    .principales{
      button{
        width: 310px;
      }
      button:nth-child(1){
        margin-right: 8px;
      }
    }
    .secundarios{
      button{
        margin-top: 8px;
        width: 628px;
      }
    }
  }
}

.contenedor-lista-tiempos{
  padding: 0 0 28px 0;
  min-height: 369px;
  .lista-tiempos-app{
    width: 628px;
    .item{
      border-bottom: 4px solid $verde_oscuro;
      display: flex;
      align-items: center;
      padding: 20px;
      button{
        display: inline-block;
        border: 0;
        color: $blanco;
        cursor: pointer;
        box-shadow: 5px 5px 2px $verde_oscuro;
      }
      button:active{
        transform: scale(0.9)
      }
      .boton-agregar-principal{
        width: 108px;
        height: 71px;
        font-size: 40px;
        font-weight: 600;
        background: $celeste;
      }
      .texto{
        color: $blanco;
        font-size: 30px;
        margin-left: 20px;
        letter-spacing: 2px;
      }
      .efecto-boton{
        height: 100%;
        width: 100%;
        display: inline-block;
        position: relative;
        display: flex;
        align-items: center;
        .boton-eliminar{
          position: absolute;
          right: 0;
          width: 150px;
          height: 43px;
          font-size: 24px;
          background: $rojo;
          transition: .3s;
        }
      }
    }
    .item:last-child{
      border: 0;
    }
  }
}
.footer-app{
  a{
    font-size: 20px;
    color: $blanco;
  }
}
*/
</style>
