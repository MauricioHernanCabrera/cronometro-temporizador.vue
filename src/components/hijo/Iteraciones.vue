<template lang="pug">
  .contenedor-iteraciones
    span.texto ITERACIONES:
    input.iteraciones(
      type="number" 
      v-model="obj.iteraciones"
      min="1"
      max="50"
      :disabled="obj.listaDeTiemposTotal.length !== 0"
    )
</template>

<script>
export default{
  props: {
    obj: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
.contenedor-iteraciones{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #003133;
  .texto{
    font-size: 0.8em;
    font-weight: 600;
    margin-left: 20px;
  }
  .iteraciones{
    padding: 20px 0;
    height: 100%;
    width: 20%;
    background: #002426;
    font-size: 1.5em;
    color: #fff;
    display: inline-block;
    text-align: center;
  }
}
@media (max-width: 525px){
  .contenedor-iteraciones{
    .iteraciones{
      padding: 16px 0;
    }
  }
}
@media (max-width: 425px){
  .contenedor-iteraciones{
    .iteraciones{
      padding: 12.8px 0;
    }
  }
}
</style>