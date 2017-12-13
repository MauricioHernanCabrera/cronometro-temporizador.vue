<template lang="pug">
  .contenedor-lista-tiempos.contenedor
    ul.lista-tiempos-app
      li.item(v-for="(t, indice) in listaDeTiempos")
        button.boton-agregar-principal(@click="agregarAlPrincipal(t)") {{ indice | convertirAIndice }}
        span.texto {{ t | convertirATiempo }}
        .efecto-boton
          button.boton-eliminar(@click="eliminarTiempo(indice)") ELIMINAR
</template>

<script>
export default{
  props: {
    listaDeTiempos: { type: Array }
  },
  methods: {
    agregarAlPrincipal (t) {
      this.$emit('agregarPrincipal', t)
    },
    eliminarTiempo (indice) {
      this.$emit('eliminar', indice)
    }
  },
  filters: {
    convertirATiempo (tiempo) {
      return tiempo.hora + ':' + tiempo.minuto + ':' + tiempo.segundo + '.' + tiempo.milisegundo
    },
    convertirAIndice (indice) {
      return '#' + (indice + 1)
    }
  }
}
</script>

<style lang="scss">
  
</style>