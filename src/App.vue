<template lang="pug">
  #app
    .contenedor-temporizador
      input(type="number" min="0" max="9" v-bind:value="tiempo.hora")
      span :
      input(type="number" min="0" max="59" v-bind:value="tiempo.minuto")
      span :
      input(type="number" min="0" max="59" v-bind:value="tiempo.segundo")
      span .
      input(type="number" min="0" max="09" v-bind:value="tiempo.milisegundo")
    
    .contenedor-botones
      .contenedor-botones-principales
        button(@click="reiniciarValores") REINICIAR
        button(@click="") INICIAR
      .contenedor-botones-secundarios
        button(@click="agregarAlaLista") AGREGAR

    ul.contenedor-de-tiempos
      h2.contenedor-de-tiempos-titulo Agregador recientemente
      li.contenedor-de-tiempos-elemento(v-for="(i, index) in listaDeTiempos")
        span.contenedor-de-tiempos-elemento-indice {{ '#' + (index+1) }}
        span {{ i.hora + ':' + i.minuto + ':' + i.segundo + '.' + i.milisegundo }}
        .contenedor-de-tiempos-contenedor-boton
          button(@click="eliminarTiempo") Eliminar
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
        listaDeTiempos: []
      }
    },
    methods: {
      reiniciarValores () {
        this.tiempo.hora = 0
        this.tiempo.minuto = 0
        this.tiempo.segundo = 0
        this.tiempo.milisegundo = 0
      },
      agregarAlaLista () {
        console.log(this.listaDeTiempos.length)
        if (this.listaDeTiempos.length < 5) {
          this.listaDeTiempos.push(this.tiempo)
        }
      },
      eliminarTiempo (tiempo) {
        this.listaDeTiempos.pop(tiempo)
      }
    }
  }
</script>

<style lang="scss">
  @import './scss/main.scss';
</style>
