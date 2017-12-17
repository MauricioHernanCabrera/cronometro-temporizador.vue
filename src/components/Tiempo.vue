<template lang="pug">
  div
    input.hora.tiempo(
      type="number"
      min="0"
      max="9"
      v-model="tiempo.hora"
      :readonly="activo"
    )
    span.simbolo :
    input.minuto.tiempo(
      type="number"
      min="0"
      max="59"
      v-model="tiempo.minuto"
      :readonly="activo"
    )
    span.simbolo :
    input.segundo.tiempo(
      type="number"
      min="0"
      max="59"
      v-model="tiempo.segundo"
      :readonly="activo"
    )
    span.simbolo .
    input.milisegundo.tiempo(
      type="number"
      min="0"
      max="9"
      v-model="tiempo.milisegundo"
      :readonly="activo"
    )
</template>

<script>
export default{
  props: {
    tiempo: { type: Object, required: true },
    activo: { type: Boolean, required: true }
  }
}
</script>

<style lang="scss">
  .tiempo{
    display: inline-block;
    width: 20%;
    height: 100px;
    font-size: 2em;
    text-align: center;
    background: #003133;
    color: #fef7f4;
  }
  .simbolo{
    display: inline-block;
    width: 6.66%;
    font-size: 2em;
    font-weight: 700;
    text-align: center;
    line-height: 0;
  }
  @media (max-width: 525px){
    .tiempo{
      height: 80px;
    }
  }
  @media (max-width: 425px){
    .tiempo{
      height: 64px;
    }
  }
  @media (max-width: 325px){
    .tiempo{
      height: 51.2px;
    }
  }
</style>