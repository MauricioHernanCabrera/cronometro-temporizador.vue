<template lang="pug">
  ul.menu
    li.opcion(:class="{'opcion-activo': opcionApp === 1 }")
      button.icon.icon-hour-glass(@click="cambiarApp(1)")
    li.opcion(:class="{'opcion-activo': opcionApp === 2 }")
      button.icon.icon-stopwatch(@click="cambiarApp(2)")
    li.opcion(:class="{'opcion-activo': opcionApp === 3 }")
      button.icon.icon-hammer(@click="cambiarApp(3)")
    li.opcion(:class="{'opcion-activo': opcionApp === 4 }")
      button.icon.icon-man(@click="cambiarApp(4)")
    li.opcion(:class="{'opcion-activo': opcionApp === 5 }" )
      button.icon(
        :class="(fullScreen)? 'icon-shrink' : 'icon-enlarge'"
        @click="CambiarFullScreen()"
      )
    //- li.opcion(:class="{'opcion-activo': opcionApp === 6 }" )
    //-   button.icon.icon-unlocked(@click="cambiarApp(6)")
</template>

<script>
export default{
  props: {
    opcionApp: { type: Number, required: true },
    fullScreen: { type: Boolean, required: true }
  },
  methods: {
    cambiarApp (opcion) {
      this.$emit('cambiar', opcion)
    },
    CambiarFullScreen () {
      this.$emit('fullscreen')
    }
  }
}
</script>

<style lang="scss">
.menu{
  background: #003133;
  list-style: none;
  display: flex;
  margin: 0 auto;
  max-width: 700px;
  li{
    width: 25%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: .3s;
    .icon{
      height: 100%;
      width: 100%;
      font-size: 1.2em;
      color: #fff;
      background: none;
      cursor: pointer;
    }
  }
  .icon:last-child{
    border-right: 0;
  }
}
.opcion-activo{
  background: #002426;
}
@media (max-width: 525px){
  .menu{
    li{
      height: 80px;
    }
  }
}
@media (max-width: 425px){
  .menu{
    li{
      height: 64px;
    }
  }
}
@media (max-width: 325px){
  .menu{
    li{
      height: 51.2px;
    }
  }
}
</style>