<template lang="pug">
  main
    app-tiempo.contenedor(
      :tiempo="temporizador.tiempo"
    )
    app-botones.contenedor(
      :tiempoActivo="temporizador.tiempoActivo"
      :obj="temporizador"
      :opts="opcionAPP"
      @reiniciar="reiniciarValores"
      @iniciar="iniciarTemporizador"
      @agregar="activarModal"
    )
    app-lista-de-tiempos.contenedor(
      :lista="temporizador.listaDeTiempos"
      :obj="temporizador"
      :opts="opcionAPP"
      @agregar="agregarAlPrincipal"
      @eliminar="eliminarTiempo"
    )
    audio(
      :id="temporizador.nombre" 
      src="src/assets/alarma.mp3" 
      type="audio/mpeg"
      controls
    )
    app-modal-nuevo-tiempo(
      :obj="temporizador"
      @cancelar="cancelarModal"
      @agregar="agregarALista"
    )
</template>
 
<script>
import FuncionesCompartidas from './../mixins/funcionesCompartidas'
import { mapState } from 'vuex'
export default {
  mixins: [ FuncionesCompartidas ],
  data () {
    return {
      temporizador: {
        tiempo: {
          hora: 0,
          minuto: 0,
          segundo: 0
        },
        listaDeTiempos: [],
        tiempoActivo: false,
        nombre: 'Temporizador',
        audioID: null,
        intervalo: null,
        agregarActivo: false,
        nuevoTiempo: {
          hora: '',
          minuto: '',
          segundo: ''
        }
      }
    }
  },
  created () {
    this.$store.commit('setOpcionAPP', 1)
    this.cambiarTitulo(1, this.temporizador.nombre)
  },
  computed: {
    ...mapState(['opcionAPP', 'id'])
  },
  methods: {
    iniciarTemporizador (obj) {
      // Solucion al problema de celulares
      this.agregarAudio(obj)
      // ---------------------------------
      obj.tiempoActivo = !obj.tiempoActivo
      this.notifyMe()
      if (!this.tiempoNulo(obj.tiempo)) {
        if (obj.tiempoActivo) {
          obj.intervalo = setInterval(() => {
            this.reducirElTiempo(obj)
          }, 1000)
        } else {
          this.cambiarTitulo(1, obj.nombre)
          clearInterval(obj.intervalo)
        }
      } else {
        obj.tiempoActivo = !obj.tiempoActivo
      }
    },
    reducirElTiempo (obj) {
      if (this.tiempoNulo(obj.tiempo)) {
        this.iniciarAudio(obj)
        this.reiniciarValores(obj)
      } else {
        if (obj.tiempo.minuto === 0 && obj.tiempo.hora > 0 && obj.tiempo.segundo === 0) {
          obj.tiempo.hora--
          obj.tiempo.minuto = 60
        }
        if (obj.tiempo.segundo === 0 && obj.tiempo.minuto > 0) {
          obj.tiempo.minuto--
          obj.tiempo.segundo = 60
          this.notifyMe()
        }
        obj.tiempo.segundo--
        this.cambiarTitulo(2, obj.nombre, obj.tiempo)
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
    agregarAlPrincipal (nuevoTiempo, obj) {
      if (!obj.tiempoActivo) {
        obj.tiempo = this.clonarObjeto(nuevoTiempo)
      }
    },
    eliminarTiempo (indice, obj) {
      obj.listaDeTiempos.splice(indice, 1)
    },
    cancelarModal (obj) {
      obj.agregarActivo = false
      this.inicializarTiempo(obj.nuevoTiempo, 2)
    }
  }
}
</script>

<style lang="scss">

</style>
