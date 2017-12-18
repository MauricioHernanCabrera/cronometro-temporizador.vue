<template lang="pug">
  .contenedor-botones
    button.btn-aceptar(@click="agregarTiempo") ACEPTAR
    button.btn-cancelar(@click="cancelarTiempo") CANCELAR
</template>

<script>
export default{
  props: {
    obj: { type: Object, required: true },
    opts: { type: Number, required: true }
  },
  methods: {
    cancelarTiempo () {
      this.$emit('cancelar', this.obj)
    },
    agregarTiempo () {
      this.$emit('agregar', this.obj, this.opts)
    }
  }
}
</script>

<style lang="scss">
.contenedor-botones{
  margin-top: 1%;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  button{
    display: inline-block;
    height: 40px;
    width: 20%;
    font-size: 0.5em;
    font-weight: 600;
    color: #fff;
    background: #003133;
    cursor: pointer;
  }
  .btn-aceptar{
    margin-right: 1%;
  }
}
@media (max-width: 525px){
  .contenedor-botones{
    button{
      height: 32px;
    }
  }
}
@media (max-width: 425px){
  .contenedor-botones{
    button{
      height: 25.6px;
    }
  }
}
</style>