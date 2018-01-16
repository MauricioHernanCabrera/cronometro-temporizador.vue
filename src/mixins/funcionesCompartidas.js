const funcionesCompartidas = {
  methods: {
    reiniciarValores (obj) {
      this.inicializarTiempo(obj.tiempo, 1)
      obj.tiempoActivo = false
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
        obj.audioID = document.getElementById(obj.audioNombre)
        obj.audioID.play()
        obj.audioID.pause()
      }
    }
  }
}

export default funcionesCompartidas
