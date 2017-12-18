<template lang="pug">
  .nuevo-tiempo(v-show="obj.agregarActivo")
    app-tiempo.contenedor(
      :tiempo="obj.tiempo"
      :activo="obj.tiempoActivo"
    )
    app-botones-manual.contenedor(
      :obj="obj"
      :opts="opts"
      @agregar="agregarTiempo"
      @cancelar="cancelarTiempo"
    )
</template>

<script>
import AppBotonesManual from './BotonesManual.vue'
export default{
  components: { AppBotonesManual },
  props: {
    obj: { type: Object },
    opts: { type: Number }
  },
  methods: {
    cancelarTiempo (obj) {
      this.$emit('cancelar', obj)
    },
    agregarTiempo (obj, opts) {
      this.$emit('agregar', obj, opts)
    }
  }
}
</script>

<style lang="scss">
.nuevo-tiempo{
  position: fixed;
  background: #00393b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
</style>