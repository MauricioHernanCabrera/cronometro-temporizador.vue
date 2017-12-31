<template lang="pug">
  main
    app-tiempo.contenedor(
      :tiempo="cronometro.tiempo"
      :activo="opcionApp == 2"
    )
    app-botones.contenedor(
      :tiempoActivo="cronometro.tiempoActivo"
      :obj="cronometro"
      :opts="opcionApp"
      @reiniciar="reiniciarValores"
      @iniciar="iniciarCronometro"
      @agregar="agregarALista"
    )
    app-lista-de-tiempos.contenedor(
      :lista="cronometro.listaDeTiempos"
      :obj="cronometro"
      :opts="opcionApp"
      @eliminar="eliminarTiempo"
    )
</template>
 
<script>
export default {
  data () {
    return {
      cronometro: {
        tiempo: {
          hora: 0,
          minuto: '00',
          segundo: '00',
          milisegundo: 0
        },
        listaDeTiempos: [],
        tiempoActivo: false,
        intervalo: null
      },
      opcionApp: 2
    }
  },
  methods: {
    reiniciarValores (obj) {
      this.inicializarTiempo(obj.tiempo)
      clearInterval(obj.intervalo)
      obj.tiempoActivo = false
    },
    inicializarTiempo (tiempo) {
      tiempo.hora = tiempo.milisegundo = 0
      tiempo.minuto = tiempo.segundo = '00'
    },
    iniciarCronometro (obj) {
      obj.tiempoActivo = !obj.tiempoActivo
      this.convertirAEntero(obj.tiempo)
      this.convertirADosDigitos(obj.tiempo)
      if (obj.tiempoActivo) {
        obj.intervalo = setInterval(() => {
          this.incrementarTiempo(obj)
        }, 100)
      } else {
        this.convertirAEntero(obj.tiempo)
        this.convertirADosDigitos(obj.tiempo)
        clearInterval(obj.intervalo)
      }
    },
    convertirAEntero (tiempo) {
      tiempo.hora = parseInt(tiempo.hora)
      tiempo.minuto = parseInt(tiempo.minuto)
      tiempo.segundo = parseInt(tiempo.segundo)
      tiempo.milisegundo = parseInt(tiempo.milisegundo)
    },
    convertirADosDigitos (tiempo) {
      tiempo.minuto = (tiempo.minuto < 10) ? `0${tiempo.minuto}` : tiempo.minuto
      tiempo.segundo = (tiempo.segundo < 10) ? `0${tiempo.segundo}` : tiempo.segundo
    },
    incrementarTiempo (obj) {
      this.convertirAEntero(obj.tiempo)
      obj.tiempo.milisegundo++
      if (obj.tiempo.milisegundo === 10) {
        obj.tiempo.segundo++
        obj.tiempo.milisegundo = 0
      }
      if (obj.tiempo.segundo === 60) {
        obj.tiempo.minuto++
        obj.tiempo.segundo = 0
      }
      if (obj.tiempo.minuto === 60) {
        obj.tiempo.hora++
        obj.tiempo.minuto = 0
      }
      this.convertirADosDigitos(obj.tiempo)
    },
    agregarALista (obj) {
      const MAX = 50
      this.convertirAEntero(obj.tiempo)
      if ((!this.tiempoNulo(obj.tiempo)) && obj.listaDeTiempos.length < MAX) {
        this.convertirADosDigitos(obj.tiempo)
        const clon = this.clonarObjeto(obj.tiempo)
        obj.listaDeTiempos.unshift(clon)
      } else {
        this.convertirADosDigitos(obj.tiempo)
      }
    },
    clonarObjeto (obj) {
      return Object.assign({}, obj)
    },
    eliminarTiempo (indice, obj) {
      obj.listaDeTiempos.splice(indice, 1)
    },
    tiempoNulo (tiempo) {
      if (tiempo.hora === 0 && parseInt(tiempo.minuto) === 0 && parseInt(tiempo.segundo) === 0 && tiempo.milisegundo === 0) {
        return true
      } else {
        return false
      }
    }
  }

}
</script>

<style lang="scss">
</style>
