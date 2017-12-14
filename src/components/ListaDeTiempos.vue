<template lang="pug">
  ul.lista-tiempos
    li.item(v-for="(t, indice) in listaDeTiempos")
      .contenedor-btn-texto
        button.btn-agregar(@click="agregarAlPrincipal(t)") {{ indice | convertirAIndice }}
        span.texto {{ t | convertirATiempo }}
      button.btn-eliminar(@click="eliminarTiempo(indice)") ELIMINAR
</template>

<script>
export default{
  props: {
    listaDeTiempos: { type: Array }
  },
  methods: {
    agregarAlPrincipal (t) {
      this.$emit('agregarPrincipal', t)
    },
    eliminarTiempo (indice) {
      this.$emit('eliminar', indice)
    }
  },
  filters: {
    convertirATiempo (tiempo) {
      return tiempo.hora + ':' + tiempo.minuto + ':' + tiempo.segundo + '.' + tiempo.milisegundo
    },
    convertirAIndice (indice) {
      return '#' + (indice + 1)
    }
  }
}
</script>

<style lang="scss">
  .lista-tiempos{
    min-height: 365px;
    .item{
      border-bottom: 5px solid #003133;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button{
        cursor: pointer;
        box-shadow: 4px 4px 2px #003133;
        transition: .1s;
      }
      button:active{
        transform: scale(0.95);
        box-shadow: 0px 0px 0px #003133;
      }
      .contenedor-btn-texto{
        display: flex;
        align-items: center;
        .btn-agregar{
          padding: 10px 20px;
          margin: 10px;
          font-size: 1em;
          font-weight: 700;
          background: #31a5bd;
          color: #fef7f4;
        }
        .texto{
          font-size: 1em;
          letter-spacing: 2px;
        }
      }
      .btn-eliminar{
        background: #7b2d26;
        color: #fef7f4;
        font-size: 0.7em;
        padding: 8px 15px;
        font-weight: 600;
        letter-spacing: 1px;
        margin: 10px;
      }
    }
    .item:last-child{
      border: 0;
    }
  }
  @media (max-width: 525px){
    .lista-tiempos{
      min-height: 305px;
      .item{
        .contenedor-btn-texto{
          .btn-agregar{
            padding: 8px 16px;
            margin: 8px;
          }
        }
        .btn-eliminar{
          padding: 8px 12px;
        }
      }
    }
  }
  @media (max-width: 425px){
    .lista-tiempos{
      min-height: 263.91px;
      .item{
        .contenedor-btn-texto{
          .btn-agregar{
            padding: 6.4px 12.8px;
            margin: 6.4px;
          }
        }
        .btn-eliminar{
          padding: 6.4px 9.6px;
        }
      }
    }
  }
  @media (max-width: 325px){
    .lista-tiempos{
      min-height: 243.91px;
    }
  }
</style>