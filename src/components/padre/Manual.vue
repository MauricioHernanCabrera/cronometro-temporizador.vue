<template lang="pug">
  div(v-show="opcionApp === 3")
    app-tiempo.contenedor(
      :tiempo="obj.tiempo"
      :activo="obj.tiempoActivo || !obj.tiempoActivo"
    )
    app-botones.contenedor(
      :tiempoActivo="obj.tiempoActivo"
      :obj="obj"
      :opts="opcionApp"
      @reiniciar="inicializarValoresManual"
      @iniciar="iniciarManual"
      @agregar="activarAgregarTiempo"
    )
    app-iteraciones.contenedor(
      :obj="obj"
    )
    app-nuevo-tiempo(
      :obj="obj"
      :opts="opcionApp"
      @agregar="agregarALista"
      @cancelar="cancelarTiempo"
    )
    app-lista-de-tiempos.contenedor(
      :lista="obj.listaDeTiempos"
      :obj="obj"
      :opts="opcionApp"
      @agregar="agregarAlPrincipal"
      @eliminar="eliminarTiempo"
    )
</template>

<script>
import AppIteraciones from './../hijo/Iteraciones'
import AppNuevoTiempo from './../hijo/NuevoTiempo'
export default{
  components: { AppIteraciones, AppNuevoTiempo },
  props: {
    obj: { type: Object, required: true },
    opcionApp: { type: Number }
  },
  methods: {
    inicializarValoresManual (obj) {
      this.$emit('reiniciarBtnBotones', obj)
    },
    iniciarManual (obj) {
      this.$emit('iniciarBtnBotones', obj)
    },
    activarAgregarTiempo (obj, opts) {
      this.$emit('agregarBtnBotones', obj, opts)
    },
    agregarALista (obj, opts) {
      this.$emit('agregarBtnNuevoTiempo', obj, opts)
    },
    cancelarTiempo (obj) {
      this.$emit('cancelarBtnNuevoTiempo', obj)
    },
    agregarAlPrincipal (t, obj, opts) {
      this.$emit('agregarBtnLista', t, obj, opts)
    },
    eliminarTiempo (indice, obj, opts) {
      this.$emit('eliminarBtnLista', indice, obj, opts)
    }
  }
}
</script>

<style lang="scss">

</style>