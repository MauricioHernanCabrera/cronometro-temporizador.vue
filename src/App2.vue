<template lang="pug">
  #app
    .contenedor-temporizador
      input(type="number" min="0" max="9" v-model:value="tiempo.hora")
      span :
      input(type="number" min="0" max="59" v-model:value="tiempo.minuto")
      span :
      input(type="number" min="0" max="59" v-model:value="tiempo.segundo")
      span .
      input(type="number" min="0" max="09" v-model:value="tiempo.milisegundo")
    
    .contenedor-botones
      .contenedor-botones-principales
        button(@click="reiniciarValores") REINICIAR
        button(@click="reducirTiempo") {{ estadoDelTiempo.textoBoton }}
      .contenedor-botones-secundarios
        button(@click="agregarAlaLista") AGREGAR

    ul.contenedor-de-tiempos

      //- h2.contenedor-de-tiempos-titulo(v-if="listaDeTiempos.length > 0") AGREGADOS 
      li.contenedor-de-tiempos-elemento(v-for="(item, indice) in listaDeTiempos")

        button.contenedor-de-tiempos-elemento-indice(@click="agregarAlPrincipal(item)") {{ '#' + (indice+1) }}
        span.contenedor-de-tiempos-elemento-item {{ item.hora + ':' + item.minuto + ':' + item.segundo + '.' + item.milisegundo }}

        .contenedor-de-tiempos-contenedor-boton
          button(@click="eliminarTiempo(indice)") Eliminar
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
        listaDeTiempos: [],
        intervalo: null,
        estadoDelTiempo: {
          textoBoton: 'INICIAR',
          activo: false,
          pausa: true
        },
        self: this
      }
    },
    methods: {
      reiniciarValores () {
        // FUNCIONA
        this.tiempo.hora = 0
        this.tiempo.minuto = 0
        this.tiempo.segundo = 0
        this.tiempo.milisegundo = 0
        clearInterval(this.intervalo)
        this.estadoDelTiempo.activo = false
        this.estadoDelTiempo.textoBoton = 'INICIAR'
      },
      reducirTiempo () {
        this.estadoDelTiempo.activo = !this.estadoDelTiempo.activo
        if (this.estadoDelTiempo.activo) {
          this.estadoDelTiempo.textoBoton = 'PAUSAR'
          this.intervalo = setInterval(this.moverElTiempo, 100)
        } else {
          this.estadoDelTiempo.textoBoton = 'INICIAR'
          clearInterval(this.intervalo)
        }
      },
      agregarAlaLista () {
        if (!this.estadoDelTiempo.activo) {
          if (!this.tiempoNulo(this.tiempo)) {
            if (this.listaDeTiempos.length < 5) {
              const obj = {
                hora: this.tiempo.hora,
                minuto: (this.tiempo.minuto < 10) ? '0' + this.tiempo.minuto : this.tiempo.minuto,
                segundo: (this.tiempo.segundo < 10) ? '0' + this.tiempo.segundo : this.tiempo.segundo,
                milisegundo: (this.tiempo.milisegundo < 10) ? '0' + this.tiempo.milisegundo : this.tiempo.milisegundo
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
        console.log(nuevoTiempo)
        if (!this.estadoDelTiempo.activo) {
          this.tiempo.hora = nuevoTiempo.hora
          this.tiempo.minuto = nuevoTiempo.minuto
          this.tiempo.segundo = nuevoTiempo.segundo
          this.tiempo.milisegundo = nuevoTiempo.milisegundo
        }
      },
      moverElTiempo () {
        if (this.tiempoNulo({ hora: this.self.tiempo.hora, minuto: this.self.tiempo.minuto, segundo: this.self.tiempo.segundo, milisegundo: this.self.tiempo.milisegundo })) {
          this.estadoDelTiempo.textoBoton = 'INICIAR'
          clearInterval(this.intervalo)
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
      tiempoNulo (obj) {
        if (obj.hora === 0 && obj.minuto === 0 && obj.segundo === 0 && obj.milisegundo === 0) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './scss/main.scss';
</style>
