<template lang="pug">
  div Cantidad de iteraciones:
    input.iteraciones(
      type="number" 
      v-model="iteraciones"
      min="1"
      max="50"
    )
</template>

<script>
export default{
  props: {
    iteraciones: { type: Number, required: true }
  }
}
</script>

<style lang="scss">
  
</style>