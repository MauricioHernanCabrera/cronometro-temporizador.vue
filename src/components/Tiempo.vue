<template lang="pug">
  .contenedor
    input(type="number" min="0" max="9" v-model="tiempo.hora" v-bind:readonly="estadoDelTiempo.activo")
    span.simbolo :
    input(type="number" min="0" max="59" v-model="tiempo.minuto" v-bind:readonly="estadoDelTiempo.activo")
    span.simbolo :
    input(type="number" min="0" max="59" v-model="tiempo.segundo" v-bind:readonly="estadoDelTiempo.activo")
    span.simbolo .
    input(type="number" min="0" max="9" v-model="tiempo.milisegundo" v-bind:readonly="estadoDelTiempo.activo")
</template>

<script>
export default{
  props: {
    tiempo: { type: Object, required: true },
    estadoDelTiempo: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
  
</style>