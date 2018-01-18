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
      :id="temporizador.audioNombre" 
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
import AppModalNuevoTiempo from './global/ModalNuevoTiempo.vue'
import { mapState } from 'vuex'
export default {
  mixins: [ FuncionesCompartidas ],
  components: { AppModalNuevoTiempo },
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
        audioNombre: 'temporizador',
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
  computed: {
    ...mapState(['opcionAPP'])
  },
  methods: {
    iniciarTemporizador (obj) {
      // Solucion al problema de celulares
      this.agregarAudio(obj)
      // ---------------------------------
      obj.tiempoActivo = !obj.tiempoActivo
      if (obj.tiempoActivo) {
        obj.intervalo = setInterval(() => {
          this.reducirElTiempo(obj)
        }, 1000)
      } else {
        clearInterval(obj.intervalo)
      }
    },
    reducirElTiempo (obj) {
      if (this.tiempoNulo(obj.tiempo)) {
        document.title = `Cronometro/Temporizador`
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
        }
        obj.tiempo.segundo--
        document.title = ((obj.tiempo.hora <= 9) ? '0' + obj.tiempo.hora : obj.tiempo.hora) + ':' +
                        ((obj.tiempo.minuto <= 9) ? '0' + obj.tiempo.minuto : obj.tiempo.minuto) + ':' +
                        ((obj.tiempo.segundo <= 9) ? '0' + obj.tiempo.segundo : obj.tiempo.segundo) +
                        ' Cronometro/Temporizador'
      }
    },
    activarModal (obj) {
      obj.agregarActivo = true
    },
    agregarALista (obj) {
      const MAX = 50
      if (obj.listaDeTiempos.length < MAX) {
        const clon = this.clonarObjeto(obj.nuevoTiempo)
        clon.hora = (clon.hora === '') ? 0 : parseInt(clon.hora)
        clon.minuto = (clon.minuto === '') ? 0 : parseInt(clon.minuto)
        clon.segundo = (clon.segundo === '') ? 0 : parseInt(clon.segundo)
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
