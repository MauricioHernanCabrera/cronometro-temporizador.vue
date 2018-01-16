<template lang="pug">
  main
    app-tiempo.contenedor(
      :tiempo="temporizador.tiempo"
      :activo="temporizador.tiempoActivo"
    )
    app-botones.contenedor(
      :tiempoActivo="temporizador.tiempoActivo"
      :obj="temporizador"
      :opts="opcionAPP"
      @reiniciar="reiniciarValores"
      @iniciar="iniciarTemporizador"
      @agregar="agregarALista"
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
          minuto: '00',
          segundo: '00',
          milisegundo: 0
        },
        listaDeTiempos: [],
        tiempoActivo: false,
        audioNombre: 'temporizador',
        audioID: null,
        intervalo: null
      }
    }
  },
  created () {
    this.$store.commit('setOpcionAPP', 1)
  },
  computed: {
    ...mapState(['opcionAPP'])
  },
  methods: {
    iniciarTemporizador (obj) {
      this.convertirAEntero(obj.tiempo)
      // Solucion al problema de celulares
      if (obj.audioID === null) {
        obj.audioID = document.getElementById(obj.audioNombre)
        obj.audioID.play()
        obj.audioID.pause()
      }
      // ---------------------------------
      obj.tiempoActivo = !obj.tiempoActivo
      if (!this.tiempoNulo(obj.tiempo)) {
        this.convertirADosDigitos(obj.tiempo)
        if (obj.tiempoActivo) {
          obj.intervalo = setInterval(() => {
            this.reducirElTiempo(obj)
          }, 100)
        } else {
          clearInterval(obj.intervalo)
        }
      } else {
        this.convertirADosDigitos(obj.tiempo)
        obj.tiempoActivo = !obj.tiempoActivo
      }
    },
    reducirElTiempo (obj) {
      this.convertirAEntero(obj.tiempo)
      if (this.tiempoNulo(obj.tiempo)) {
        this.iniciarAudio(obj)
        this.iniciarAudio(obj)
        this.reiniciarValores(obj)
      } else {
        if (obj.tiempo.minuto === 0 && obj.tiempo.hora > 0 && obj.tiempo.segundo === 0 && obj.tiempo.milisegundo === 0) {
          obj.tiempo.hora--
          obj.tiempo.minuto = 60
        }
        if (obj.tiempo.segundo === 0 && obj.tiempo.minuto > 0 && obj.tiempo.milisegundo === 0) {
          obj.tiempo.minuto--
          obj.tiempo.segundo = 60
        }
        if (obj.tiempo.milisegundo === 0 && obj.tiempo.segundo > 0) {
          obj.tiempo.segundo--
          obj.tiempo.milisegundo = 10
        }
        obj.tiempo.milisegundo--
        this.convertirADosDigitos(obj.tiempo)
      }
    },
    agregarALista (obj) {
      const MAX = 50
      this.convertirAEntero(obj.tiempo)
      if ((!obj.tiempoActivo) && (!this.tiempoNulo(obj.tiempo)) && obj.listaDeTiempos.length < MAX) {
        this.convertirADosDigitos(obj.tiempo)
        const clon = this.clonarObjeto(obj.tiempo)
        obj.listaDeTiempos.push(clon)
        this.reiniciarValores(obj)
      } else {
        this.convertirADosDigitos(obj.tiempo)
      }
    },
    agregarAlPrincipal (nuevoTiempo, obj) {
      if (!obj.tiempoActivo) {
        obj.tiempo = this.clonarObjeto(nuevoTiempo)
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
