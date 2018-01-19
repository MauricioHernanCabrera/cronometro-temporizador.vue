const funcionesCompartidas = {
  methods: {
    reiniciarValores (obj) {
      obj.tiempoActivo = false
      this.cambiarTitulo(1, obj.nombre)
      this.inicializarTiempo(obj.tiempo, 1)
      clearInterval(obj.intervalo)
    },
    inicializarTiempo (tiempo, opts) {
      if (opts === 1) {
        tiempo.hora = tiempo.minuto = tiempo.segundo = 0
      } else {
        tiempo.hora = tiempo.minuto = tiempo.segundo = ''
      }
    },
    tiempoNulo (tiempo) {
      if (parseInt(tiempo.hora) === 0 && parseInt(tiempo.minuto) === 0 && parseInt(tiempo.segundo) === 0) {
        return true
      } else {
        return false
      }
    },
    clonarObjeto (obj) {
      return Object.assign({}, obj)
    },
    iniciarAudio (obj) {
      obj.audioID.currentTime = 0
      obj.audioID.play()
    },
    agregarAudio (obj) {
      if (obj.audioID === null) {
        obj.audioID = document.getElementById(obj.nombre)
        obj.audioID.play()
        obj.audioID.pause()
      }
    },
    cambiarTitulo (opts, str, tiempo, iteraciones) {
      if (opts === 1) {
        document.title = `${str}`
      } else if (opts === 2) {
        document.title = ((tiempo.hora <= 9) ? '0' + tiempo.hora : tiempo.hora) + ':' +
                          ((tiempo.minuto <= 9) ? '0' + tiempo.minuto : tiempo.minuto) + ':' +
                          ((tiempo.segundo <= 9) ? '0' + tiempo.segundo : tiempo.segundo) +
                          ` ${str}`
      } else {
        document.title = `${iteraciones} | ` + ((tiempo.hora <= 9) ? '0' + tiempo.hora : tiempo.hora) + ':' +
                          ((tiempo.minuto <= 9) ? '0' + tiempo.minuto : tiempo.minuto) + ':' +
                          ((tiempo.segundo <= 9) ? '0' + tiempo.segundo : tiempo.segundo) +
                          ` ${str}`
      }
    },
    activarModal (obj) {
      obj.agregarActivo = true
    },
    cancelarModal (obj) {
      obj.agregarActivo = false
      this.inicializarTiempo(obj.nuevoTiempo, 2)
    },
    generarId (id) {
      id++
      this.$store.commit('setId', id)
      return id + 'A'
    }
  }
}

export default funcionesCompartidas
