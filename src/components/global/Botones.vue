<template lang="pug">
  div.botones
    .principales
      button(@click="reiniciarValores") REINICIAR
      button(@click="reducirTiempo") {{ tiempoActivo | mostrarTextoCorrespondiente }}
    .secundarios
      button(
        v-if="opts == 3"
        @click="agregarALista" 
        :disabled="obj.tiempoActivo"
      ) NUEVO
      button(
        v-else
        @click="agregarALista" 
      ) AGREGAR
</template>

<script>
export default{
  props: {
    tiempoActivo: { type: Boolean, required: true },
    obj: { type: Object, required: true },
    opts: { type: Number, required: true }
  },
  methods: {
    reiniciarValores () {
      this.$emit('reiniciar', this.obj)
    },
    reducirTiempo () {
      this.$emit('iniciar', this.obj)
    },
    agregarALista () {
      this.$emit('agregar', this.obj)
    }
  },
  filters: {
    mostrarTextoCorrespondiente (estado) {
      if (estado) {
        return 'PAUSAR'
      } else {
        return 'INICIAR'
      }
    }
  }
}
</script>

<style lang="scss">
  $blanco: #fff;
  .botones{
    button{
      display: inline-block;
      padding: 20px 0;
      color: $blanco;
      cursor: pointer;
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 0.9em;
      background: #003133;
    }
    .principales{
      display: flex;
      justify-content: space-between;
      button{
        width: 49.2%;
      }
    }
    .secundarios{
      margin-top: 1.5%;
      button{
        width: 100%;
      }
    }
  }
  @media (max-width: 525px){
    .botones{
      button{
        padding: 16px 0;
      }
    }
  }
  @media (max-width: 425px){
    .botones{
      button{
        padding: 12.8px 0;
      }
    }
  }
</style>