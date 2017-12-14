<template lang="pug">
  div.botones
    .principales
      button(@click="reiniciarValores") REINICIAR
      button(@click="reducirTiempo") {{ estadoDelTiempo.activo | mostrarTextoCorrespondiente }}
    .secundarios
      button(@click="agregarALista") AGREGAR
</template>

<script>
export default{
  props: {
    estadoDelTiempo: { type: Object, required: true }
  },
  methods: {
    reiniciarValores () {
      this.$emit('reiniciar')
    },
    reducirTiempo () {
      this.$emit('reducir')
    },
    agregarALista () {
      this.$emit('agregar')
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