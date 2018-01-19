<template lang="pug">
  div.lista-tiempos
    transition-group(name="list" tag="p" class="list-item")
      li.item(
        v-for="(t, indice) in lista",
        :key="t.id"
      )
        .contenedor-btn-texto
          button.btn-agregar(
            v-if="opts == 1",
            @click="agregarAlPrincipal(t)",
            :disabled="obj.tiempoActivo"
          ) {{ indice | convertirAIndice }}
          button.btn-agregar(
            v-else,
            disabled
          ) {{ indice | convertirAIndice }}
          span.texto 
            span {{ t.hora | aDosDigitos }}:
            span {{ t.minuto | aDosDigitos }}:
            span {{ t.segundo | aDosDigitos }}
        
        button.btn-eliminar(
          v-if="opts == 3",
          @click="eliminarTiempo(indice)",
          :disabled="obj.tiempoActivo"
        ) ELIMINAR
        button.btn-eliminar(
          v-else,
          @click="eliminarTiempo(indice)"
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
    agregarAlPrincipal (nuevoTiempo) {
      this.$emit('agregar', nuevoTiempo, this.obj)
    },
    eliminarTiempo (indice) {
      this.$emit('eliminar', indice, this.obj)
    }
  },
  filters: {
    aDosDigitos (tiempo) {
      if (tiempo <= 9) {
        return '0' + tiempo
      } else {
        return tiempo
      }
    },
    convertirAIndice (indice) {
      return (indice + 1)
    }
  }
}
</script>

<style lang="scss">
.lista-tiempos{
  overflow: hidden;
  .item{
    border-bottom: 7px solid #00393b;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #003133;
    button{
      cursor: pointer;
      transition: .1s;
      display: inline-block;
    }
    button:active{
      transform: scale(0.95);
    }
    .contenedor-btn-texto{
      display: flex;
      align-items: center;
      .btn-agregar{
        height: 80px;
        width: 100px;
        font-size: 1.2em;
        font-weight: 700;
        color: #fef7f4;
        background: #002426;
      }
      .texto{
        font-size: 1em;
        letter-spacing: 2px;
        margin-left: 10px;
      }
    }
    .btn-eliminar{
      background: #002426;
      color: #fef7f4;
      font-size: 0.7em;
      height: 50px;
      width: 150px;
      margin-right: 10px;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
  .item:last-child{
    border: 0;
  }
}
.list-enter-active, .list-leave-active{
  transition: transform .3s;
  background: black;
}
.list-enter, .list-leave-to{
  transform: translateX(100%);
}

@media (max-width: 525px){
  .lista-tiempos{
    .item{
      border-bottom: 5.6px solid #00393b;
      .contenedor-btn-texto{
        .btn-agregar{
          height: 64px;
          width: 80px;
        }
        .texto{
          margin-left: 8px;
        }
      }
      .btn-eliminar{
        height: 40px;
        width: 120px;
        margin-right: 8px;
      }
    }
  }
}
@media (max-width: 425px){
  .lista-tiempos{
    .item{
      border-bottom: 4.48px solid #00393b;
      .contenedor-btn-texto{
        .btn-agregar{
          height: 51.2px;
          width: 64px;
        }
        .texto{
          letter-spacing: 0.5px;
          margin-left: 6.4px;
        }
      }
      .btn-eliminar{
        height: 32px;
        width: 96px;
        margin-right: 6.4px;
        letter-spacing: 0;
      }
    }
  }
}

</style>