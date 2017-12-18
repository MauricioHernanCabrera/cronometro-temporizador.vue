<template lang="pug">
  ul.lista-tiempos
    li.item(v-for="(t, indice) in lista")
      .contenedor-btn-texto
        button.btn-agregar(
          v-show="opts == 1"
          @click="agregarAlPrincipal(t)"
          :disabled="obj.tiempoActivo"
        ) {{ indice | convertirAIndice }}
        button.btn-agregar(
          v-show="opts != 1"
          @click="agregarAlPrincipal(t)"
          :disabled="obj.tiempoActivo || !obj.tiempoActivo"
        ) {{ indice | convertirAIndice }}
        
        span.texto {{ t | convertirATiempo }}
      button.btn-eliminar(
        v-show="opts != 3"
        @click="eliminarTiempo(indice)"
      ) ELIMINAR
      button.btn-eliminar(
        v-show="opts == 3"
        @click="eliminarTiempo(indice)"
        :disabled="obj.tiempoActivo"
      ) ELIMINAR
</template>

<script>
export default{
  props: {
    lista: { type: Array },
    obj: { type: Object, required: true },
    opts: { type: Number, required: true }
  },
  methods: {
    agregarAlPrincipal (t) {
      this.$emit('agregar', t, this.obj, this.opts)
    },
    eliminarTiempo (indice) {
      this.$emit('eliminar', indice, this.obj, this.opts)
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
  .item{
    border-bottom: 7px solid #003133;
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

</style>