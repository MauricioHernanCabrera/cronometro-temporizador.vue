<template lang="pug">
  div(v-show="opcionApp === 1")
    app-tiempo.contenedor(
      :tiempo="obj.tiempo"
      :activo="obj.tiempoActivo"
    )
    app-botones.contenedor(
      :tiempoActivo="obj.tiempoActivo"
      :obj="obj"
      :opts="opcionApp"
      @reiniciar="reiniciarValores"
      @iniciar="reducirTiempo"
      @agregar="agregarALista"
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
export default{
  props: {
    obj: { type: Object, required: true },
    opcionApp: { type: Number }
  },
  methods: {
    reiniciarValores (obj) {
      this.$emit('reiniciarBtnBotones', obj)
    },
    reducirTiempo (obj) {
      this.$emit('iniciarBtnBotones', obj)
    },
    agregarALista (obj, opts) {
      this.$emit('agregarBtnBotones', obj, opts)
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