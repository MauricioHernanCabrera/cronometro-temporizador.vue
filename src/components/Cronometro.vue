<template lang="pug">
  main
    app-tiempo.contenedor(
      :tiempo="cronometro.tiempo"
      :activo="opcionAPP == 2"
    )
    app-botones.contenedor(
      :tiempoActivo="cronometro.tiempoActivo"
      :obj="cronometro"
      :opts="opcionAPP"
      @reiniciar="reiniciarValores"
      @iniciar="iniciarCronometro"
      @agregar="agregarALista"
    )
    app-lista-de-tiempos.contenedor(
      :lista="cronometro.listaDeTiempos"
      :obj="cronometro"
      :opts="opcionAPP"
      @eliminar="eliminarTiempo"
    )
</template>
 
<script>
import FuncionesCompartidas from './../mixins/funcionesCompartidas'
import { mapState } from 'vuex'
export default {
  mixins: [ FuncionesCompartidas ],
  data () {
    return {
      cronometro: {
        tiempo: {
          hora: 0,
          minuto: 0,
          segundo: 0
        },
        listaDeTiempos: [],
        tiempoActivo: false,
        intervalo: null
      }
    }
  },
  created () {
    this.$store.commit('setOpcionAPP', 2)
  },
  computed: {
    ...mapState(['opcionAPP'])
  },
  methods: {
    iniciarCronometro (obj) {
      obj.tiempoActivo = !obj.tiempoActivo
      if (obj.tiempoActivo) {
        obj.intervalo = setInterval(() => {
          this.incrementarTiempo(obj)
        }, 100)
      } else {
        clearInterval(obj.intervalo)
      }
    },
    incrementarTiempo (obj) {
      obj.tiempo.segundo++
      if (obj.tiempo.segundo === 60) {
        obj.tiempo.minuto++
        obj.tiempo.segundo = 0
      }
      if (obj.tiempo.minuto === 60) {
        obj.tiempo.hora++
        obj.tiempo.minuto = 0
      }
    },
    agregarALista (obj) {
      const MAX = 50
      if ((!this.tiempoNulo(obj.tiempo)) && obj.listaDeTiempos.length < MAX) {
        const clon = this.clonarObjeto(obj.tiempo)
        obj.listaDeTiempos.unshift(clon)
      }
    },
    eliminarTiempo (indice, obj) {
      obj.listaDeTiempos.splice(indice, 1)
    }
  }
}
</script>

<style lang="scss">
</style>
