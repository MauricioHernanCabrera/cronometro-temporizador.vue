const funcionesCompartidas = {
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
    tiempoNulo (tiempo) {
      if (tiempo.hora === 0 && parseInt(tiempo.minuto) === 0 && parseInt(tiempo.segundo) === 0 && tiempo.milisegundo === 0) {
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
    }
  }
}

export default funcionesCompartidas
