<template lang="pug">
  .contenedor-botones.contenedor
    .botones-app
      .principales
        button(@click="reiniciarValores") REINICIAR
        button(@click="reducirTiempo") {{ estadoDelTiempo.activo | mostrarTextoCorrespondiente }}
      .secundarios
        button(@click="agregarALista") AGREGAR
</template>

<script>
export default{
  props: {
    estadoDelTiempo: { type: Object, required: true }
  },
  methods: {
    reiniciarValores () {
      this.$emit('reiniciar')
    },
    reducirTiempo () {
      this.$emit('reducir')
    },
    agregarALista () {
      this.$emit('agregar')
    }
  },
  filters: {
    mostrarTextoCorrespondiente (estado) {
      if (estado) {
        return 'PAUSAR'
      } else {
        return 'INICIAR'
      }
    }
  }
}
</script>

<style lang="scss">
  
</style>