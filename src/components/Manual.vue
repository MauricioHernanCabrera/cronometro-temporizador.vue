<template lang="pug">
  main
    app-tiempo.contenedor(
      :tiempo="manual.tiempo"
    )
    app-botones.contenedor(
      :tiempoActivo="manual.tiempoActivo"
      :obj="manual"
      :opts="opcionAPP"
      @reiniciar="inicializarValoresManual"
      @iniciar="iniciarManual"
      @agregar="activarModal"
    )
    app-iteraciones.contenedor(
      :obj="manual"
    )
    app-lista-de-tiempos.contenedor(
      :lista="manual.listaDeTiempos"
      :obj="manual"
      :opts="opcionAPP"
      @eliminar="eliminarTiempo"
    )
    audio(
      :id="manual.nombre"
      src="src/assets/alarma.mp3" 
      type="audio/mpeg" 
      controls
    )
    app-modal-nuevo-tiempo(
      :obj="manual"
      @cancelar="cancelarModal"
      @agregar="agregarALista"
    )
</template>
 
<script>
import AppIteraciones from './hijo/Iteraciones'
import AppNuevoTiempo from './hijo/NuevoTiempo'
import FuncionesCompartidas from './../mixins/funcionesCompartidas'
import { mapState } from 'vuex'
export default {
  mixins: [ FuncionesCompartidas ],
  components: { AppIteraciones, AppNuevoTiempo },
  data () {
    return {
      manual: {
        tiempo: {
          hora: 0,
          minuto: 0,
          segundo: 0
        },
        listaDeTiempos: [],
        listaDeTiemposTotal: [],
        tiempoActivo: false,
        intervalo: null,
        agregarActivo: false,
        nombre: 'Manual',
        audioID: null,
        iteraciones: 1,
        nuevoTiempo: {
          hora: '',
          minuto: '',
          segundo: ''
        }
      }
    }
  },
  created () {
    this.$store.commit('setOpcionAPP', 3)
    this.cambiarTitulo(1, this.manual.nombre)
  },
  computed: {
    ...mapState(['opcionAPP', 'id'])
  },
  methods: {
    inicializarValoresManual (obj) {
      obj.agregarActivo = false
      obj.listaDeTiempos = []
      obj.listaDeTiemposTotal = []
      this.inicializarTiempo(obj.tiempo, 1)
      obj.iteraciones = 1
      obj.tiempoActivo = false
      this.cambiarTitulo(1, obj.nombre)
      clearInterval(obj.intervalo)
    },
    iniciarManual (obj) {
      if (obj.listaDeTiemposTotal.length === 0) {
        this.armarArregloDeTiemposTotales(obj)
      }
      if (this.tiempoNulo(obj.tiempo) && obj.listaDeTiemposTotal.length !== 0) {
        obj.tiempo = this.clonarObjeto(obj.listaDeTiemposTotal[0])
      }
      this.agregarAudio(obj)

      obj.tiempoActivo = !obj.tiempoActivo
      if (!this.tiempoNulo(obj.tiempo)) {
        if (obj.tiempoActivo) {
          obj.intervalo = setInterval(() => {
            this.reducirTiempoManual(obj)
          }, 1000)
        } else {
          this.cambiarTitulo(1, obj.nombre)
          clearInterval(obj.intervalo)
        }
      } else {
        this.cambiarTitulo(1, obj.nombre)
        obj.tiempoActivo = !obj.tiempoActivo
      }
    },
    armarArregloDeTiemposTotales (obj) {
      const cantElementos = obj.iteraciones * obj.listaDeTiempos.length
      const longitudDeListaDeTiempos = obj.listaDeTiempos.length
      for (let i = 0; i < cantElementos; i++) {
        const indice = i % longitudDeListaDeTiempos
        obj.listaDeTiemposTotal.push(this.clonarObjeto(obj.listaDeTiempos[indice]))
      }
    },
    reducirTiempoManual (obj) {
      if (this.tiempoNulo(obj.tiempo)) {
        obj.listaDeTiemposTotal.shift()
        this.iniciarAudio(obj)
        if (obj.listaDeTiemposTotal.length === 0) {
          obj.iteraciones--
          this.reiniciarValores(obj)
        } else {
          obj.tiempo = this.clonarObjeto(obj.listaDeTiemposTotal[0])
          if (obj.listaDeTiemposTotal.length % obj.listaDeTiempos.length === 0) {
            obj.iteraciones--
          }
        }
      } else {
        if (obj.tiempo.minuto === 0 && obj.tiempo.hora > 0 && obj.tiempo.segundo === 0) {
          obj.tiempo.hora--
          obj.tiempo.minuto = 60
        }
        if (obj.tiempo.segundo === 0 && obj.tiempo.minuto > 0) {
          obj.tiempo.minuto--
          obj.tiempo.segundo = 60
        }
        obj.tiempo.segundo--
        this.cambiarTitulo(3, obj.nombre, obj.tiempo, obj.iteraciones)
      }
    },
    agregarALista (obj) {
      const MAX = 50
      if (obj.listaDeTiempos.length < MAX) {
        const clon = this.clonarObjeto(obj.nuevoTiempo)
        clon.hora = (clon.hora === '') ? 0 : parseInt(clon.hora)
        clon.minuto = (clon.minuto === '') ? 0 : parseInt(clon.minuto)
        clon.segundo = (clon.segundo === '') ? 0 : parseInt(clon.segundo)
        clon.id = this.generarId(this.id)
        obj.listaDeTiempos.push(clon)
        this.inicializarTiempo(obj.nuevoTiempo, 2)
        this.cancelarModal(obj)
      }
    },
    cancelarTiempo (obj) {
      obj.agregarActivo = false
      this.inicializarTiempo(obj.tiempo, 1)
    },
    eliminarTiempo (indice, obj) {
      obj.listaDeTiempos.splice(indice, 1)
      obj.listaDeTiemposTotal = []
      obj.intervalo = null
      this.inicializarTiempo(obj.tiempo, 1)
    }
  }
}
</script>

<style lang="scss">
</style>
