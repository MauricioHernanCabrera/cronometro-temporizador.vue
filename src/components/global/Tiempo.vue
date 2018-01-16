<template lang="pug">
  main
    span.hora.tiempo {{ tiempo.hora | aDosDigitos }}
    span.simbolo :
    span.minuto.tiempo {{ tiempo.minuto | aDosDigitos }}
    span.simbolo :
    span.segundo.tiempo {{ tiempo.segundo | aDosDigitos }}
</template>

<script>
export default{
  props: {
    tiempo: { type: Object, required: true }
  },
  filters: {
    aDosDigitos (tiempo) {
      if (tiempo <= 9) {
        return '0' + tiempo
      } else {
        return tiempo
      }
    }
  }
}
</script>

<style lang="scss">
  .tiempo{
    display: inline-block;
    font-size: 2.6em;
    width: 30%;
    background: #003133;
    color: #fef7f4;
    text-align: center;
    padding: 1.5% 0;
  }
  .simbolo{
    display: inline-block;
    font-size: 2em;
    font-weight: 700;
    width: 5%;
    vertical-align: 10%;
    text-align: center;
  }
</style>