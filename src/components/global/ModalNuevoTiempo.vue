<template lang="pug">
  transition(name="move")
    main(v-if="obj.agregarActivo" class="overlay")
      .modal
        h1.titulo Nuevo Tiempo!
        .modal-buttons
          //- span Horas
          input(
            type="number" 
            v-model="obj.nuevoTiempo.hora"
            min="0"
            max="23"
            placeholder="horas"
          )
          //- span Minutos
          input(
            type="number" 
            v-model="obj.nuevoTiempo.minuto"
            min="0"
            max="59"
            placeholder="minutos"
          )
          //- span Segundos
          input(
            type="number" 
            v-model="obj.nuevoTiempo.segundo"
            min="0"
            max="59"
            placeholder="segundos"
          )
        button(class="btn agregar" @click="agregarALista") AGREGAR
        button(class="btn cancelar" @click="cancelarModal") CANCELAR
</template>

<script>
export default{
  props: {
    obj: { type: Object, required: true }
  },
  methods: {
    cancelarModal () {
      this.$emit('cancelar', this.obj)
    },
    agregarALista () {
      this.$emit('agregar', this.obj)
    }
  }
}
</script>

<style lang="scss">
.overlay{
  background: rgba(0,0,0,.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1.1s ease-in;
  color: black;
  .modal{
    width: 500px;
    background: white;
    padding: 2em;
    border-radius: .5em;
    text-align: center;
    font-size: 1em;
    z-index: 10;
    .titulo{
      font-size: 1.5em;
    }
    .modal-buttons{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5% 0;
      
      span{
        display: block;
        font-size: 1.1em;
      }
      
      input{
        font-size: .75em;
        padding-top: 4%;
        padding-bottom: 4%;
        margin: 0 2%;
        display: inline-block;
        text-align: center;
        height: 100%;
        width: 100%;
        font-weight: 700;
        color: #545454;
        margin-bottom: 3%;
      }
    }
    .btn{
      text-align: center;
      padding: .8em .4em;
      border: none;
      color: white;
      margin: 1%;
      border-radius: 5px;
      cursor: pointer;
      transition: .3s;
      font-weight: 700;
      will-change: transform;
      font-size: .6em;
    }
    .btn:active {
      transform: scale(.9);
    }
    .agregar{
      background: #0ca192;
    }
    .cancelar{
      background: #fab702;
    }
  }
}

.move-enter-active{
  animation: modalIn .8s forwards;
}
.move-leave-active{
  animation: modalOut .8s forwards;
}
@keyframes modalIn {
  0% { transform: translateY(-3000px); }
  60% { transform: translateY(25px); }
  75% { transform: translateY(-10px); }
  90% { transform: translateY(5px); }
}
@keyframes modalOut {
  0% { transform: translateY(5px); }
  60% { transform: translateY(-10px); }
  75% { transform: translateY(25px); }
  100% { transform: translateY(-3000px); }
}
</style>