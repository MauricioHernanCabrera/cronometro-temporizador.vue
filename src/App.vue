<template lang="pug">
  #app

    .contenedor-header.contenedor
      .header-app
        input(type="number" min="0" max="9" v-model="tiempo.hora" v-bind:readonly="estadoDelTiempo.activo")
        span.simbolo :
        input(type="number" min="0" max="59" v-model="tiempo.minuto" v-bind:readonly="estadoDelTiempo.activo")
        span.simbolo :
        input(type="number" min="0" max="59" v-model="tiempo.segundo" v-bind:readonly="estadoDelTiempo.activo")
        span.simbolo .
        input(type="number" min="0" max="9" v-model="tiempo.milisegundo" v-bind:readonly="estadoDelTiempo.activo")
    
    .contenedor-botones.contenedor
      .botones-app
        .principales
          button(@click="reiniciarValores") REINICIAR
          button(@click="reducirTiempo") {{ estadoDelTiempo.activo | mostrarTextoCorrespondiente }}
        .secundarios
          button(@click="agregarALista") AGREGAR
    
    .parte-no-visible
      audio(v-if="audio" src="src/assets/alarma.mp3" type="audio/mpeg" controls autoplay)
    
    .contenedor-lista-tiempos.contenedor
      ul.lista-tiempos-app
        li.item(v-for="(item, indice) in listaDeTiempos")
          button.boton-agregar-principal(@click="agregarAlPrincipal(item)") {{ indice | convertirAIndice }}
          span.texto {{ item | convertirATiempo }}
          .efecto-boton
            button.boton-eliminar(@click="eliminarTiempo(indice)") ELIMINAR


    footer.footer-app.contenedor
      a(href="https://www.facebook.com/Hmc97" target="_blank") © CABRERA HERNAN MAURICIO
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        tiempo: {
          hora: 0,
          minuto: 0,
          segundo: 0,
          milisegundo: 0
        },
        estadoDelTiempo: {
          activo: false
        },
        listaDeTiempos: [],
        intervalo: null,
        audio: false,
        self: this
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
        this.self.audio = false
        if (!this.tiempoNulo(this.tiempo)) {
          this.tiempo.hora = parseInt(this.tiempo.hora)
          this.tiempo.minuto = parseInt(this.tiempo.minuto)
          this.tiempo.segundo = parseInt(this.tiempo.segundo)
          this.tiempo.milisegundo = parseInt(this.tiempo.milisegundo)
          if (this.estadoDelTiempo.activo) {
            this.intervalo = setInterval(this.moverElTiempo, 100)
          } else {
            clearInterval(this.intervalo)
          }
        } else {
          this.estadoDelTiempo.activo = !this.estadoDelTiempo.activo
        }
      },
      agregarALista () {
        if (!this.estadoDelTiempo.activo) {
          if (!this.tiempoNulo(this.tiempo)) {
            if (this.listaDeTiempos.length < 3) {
              this.tiempo.hora = parseInt(this.tiempo.hora)
              this.tiempo.minuto = parseInt(this.tiempo.minuto)
              this.tiempo.segundo = parseInt(this.tiempo.segundo)
              this.tiempo.milisegundo = parseInt(this.tiempo.milisegundo)
              const obj = {
                hora: this.tiempo.hora,
                minuto: (this.tiempo.minuto < 10) ? '0' + this.tiempo.minuto : this.tiempo.minuto,
                segundo: (this.tiempo.segundo < 10) ? '0' + this.tiempo.segundo : this.tiempo.segundo,
                milisegundo: this.tiempo.milisegundo
              }
              this.listaDeTiempos.push(obj)
              this.reiniciarValores()
            }
          }
        }
      },
      eliminarTiempo (indice) {
        console.log(indice)
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
        if (this.tiempoNulo(this.self.tiempo)) {
          this.self.audio = true
          this.self.reiniciarValores()
        } else {
          if (this.self.tiempo.minuto === 0 && this.self.tiempo.hora > 0) {
            this.self.tiempo.hora--
            this.self.tiempo.minuto = 60
          }
          if (this.self.tiempo.segundo === 0 && this.self.tiempo.minuto > 0) {
            this.self.tiempo.minuto--
            this.self.tiempo.segundo = 60
          }
          if (this.self.tiempo.milisegundo === 0 && this.self.tiempo.segundo > 0) {
            this.self.tiempo.segundo--
            this.self.tiempo.milisegundo = 10
          }
          this.self.tiempo.milisegundo--
        }
      },
      tiempoNulo (tiempo) {
        if (tiempo.hora === 0 && tiempo.minuto === 0 && tiempo.segundo === 0 && tiempo.milisegundo === 0) {
          return true
        } else {
          return false
        }
      },
      inicializarTiempo () {
        this.tiempo.hora = this.tiempo.minuto = this.tiempo.segundo = this.tiempo.milisegundo = 0
      }
    },
    filters: {
      convertirATiempo (tiempo) {
        return tiempo.hora + ':' + tiempo.minuto + ':' + tiempo.segundo + '.' + tiempo.milisegundo
      },
      convertirAIndice (indice) {
        return '#' + (indice + 1)
      },
      mostrarTextoCorrespondiente (estado) {
        if (estado) {
          return 'PAUSAR'
        } else {
          return 'INICIAR'
        }
      },
      convertirADosDigitos (tiempo) {
        tiempo = parseInt(tiempo)
        if (tiempo < 10) {
          tiempo = '0' + tiempo
        }
        return tiempo
      }
    }
  }
</script>

<style lang="scss">
  @import './scss/main.scss';
</style>
