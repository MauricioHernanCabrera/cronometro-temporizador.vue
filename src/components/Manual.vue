<template lang="pug">
  main
    app-tiempo.contenedor(
      :tiempo="manual.tiempo"
      :activo="opcionApp == 3"
    )
    app-botones.contenedor(
      :tiempoActivo="manual.tiempoActivo"
      :obj="manual"
      :opts="opcionApp"
      @reiniciar="inicializarValoresManual"
      @iniciar="iniciarManual"
      @agregar="activarAgregarTiempo"
    )
    app-iteraciones.contenedor(
      :obj="manual"
    )
    app-nuevo-tiempo(
      :obj="manual"
      :opts="opcionApp"
      @agregar="agregarALista"
      @cancelar="cancelarTiempo"
    )
    app-lista-de-tiempos.contenedor(
      :lista="manual.listaDeTiempos"
      :obj="manual"
      :opts="opcionApp"
      @eliminar="eliminarTiempo"
    )
    audio(
      :id="manual.audioNombre"
      src="src/assets/alarma.mp3" 
      type="audio/mpeg" 
      controls
    )
</template>
 
<script>
import AppIteraciones from './hijo/Iteraciones'
import AppNuevoTiempo from './hijo/NuevoTiempo'
import FuncionesCompartidas from './../mixins/funcionesCompartidas'

export default {
  mixins: [ FuncionesCompartidas ],
  components: { AppIteraciones, AppNuevoTiempo },
  data () {
    return {
      manual: {
        tiempo: {
          hora: 0,
          minuto: '00',
          segundo: '00',
          milisegundo: 0
        },
        listaDeTiempos: [],
        listaDeTiemposTotal: [],
        tiempoActivo: false,
        intervalo: null,
        agregarActivo: false,
        audioNombre: 'manual',
        audioID: null,
        iteraciones: 1
      },
      opcionApp: 3
    }
  },
  created () {
    this.$bus.$emit('app-seleccionada', this.opcionApp)
  },
  methods: {
    inicializarValoresManual (obj) {
      obj.listaDeTiempos = []
      obj.listaDeTiemposTotal = []
      this.inicializarTiempo(obj.tiempo)
      obj.iteraciones = 1
      clearInterval(obj.intervalo)
    },
    iniciarManual (obj) {
      if (obj.listaDeTiemposTotal.length === 0) {
        this.armarArregloDeTiemposTotales(obj)
      }
      if (this.tiempoNulo(obj.tiempo) && obj.listaDeTiemposTotal.length !== 0) {
        obj.tiempo = this.clonarObjeto(obj.listaDeTiemposTotal[0])
      }
      if (obj.audioID === null) {
        obj.audioID = document.getElementById(obj.audioNombre)
        obj.audioID.play()
        obj.audioID.pause()
      }
      // ----------------------------------
      obj.tiempoActivo = !obj.tiempoActivo
      this.convertirAEntero(obj.tiempo)
      if (!this.tiempoNulo(obj.tiempo)) {
        this.convertirADosDigitos(obj.tiempo)
        if (obj.tiempoActivo) {
          obj.intervalo = setInterval(() => {
            this.reducirTiempoManual(obj)
          }, 100)
        } else {
          clearInterval(obj.intervalo)
        }
      } else {
        this.convertirADosDigitos(obj.tiempo)
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
      this.convertirAEntero(obj.tiempo)
      if (this.tiempoNulo(obj.tiempo)) {
        obj.listaDeTiemposTotal.shift()
        if (obj.listaDeTiemposTotal.length === 0) {
          obj.iteraciones--
          this.iniciarAudio(obj)
          this.reiniciarValores(obj)
        } else {
          this.iniciarAudio(obj)
          obj.tiempo = this.clonarObjeto(obj.listaDeTiemposTotal[0])
          if (obj.listaDeTiemposTotal.length % obj.listaDeTiempos.length === 0) {
            obj.iteraciones--
          }
        }
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
        obj.listaDeTiemposTotal = []
        obj.listaDeTiempos.push(clon)
        this.reiniciarValores(obj)
        this.cancelarTiempo(obj)
      } else {
        this.convertirADosDigitos(obj.tiempo)
      }
    },
    cancelarTiempo (obj) {
      obj.agregarActivo = false
      this.inicializarTiempo(obj.tiempo)
    },
    eliminarTiempo (indice, obj) {
      obj.listaDeTiempos.splice(indice, 1)
      obj.listaDeTiemposTotal = []
      obj.intervalo = null
      this.inicializarTiempo(obj.tiempo)
    },
    activarAgregarTiempo (obj) {
      obj.agregarActivo = true
    }
  }
}
</script>

<style lang="scss">
</style>
