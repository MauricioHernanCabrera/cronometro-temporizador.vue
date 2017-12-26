<template lang="pug">
  ul.menu
    li(:class="{'opcion-activo': opcionApp === 1 }" @click="cambiarApp(1)")
      button.icon.icon-hour-glass
    li(:class="{'opcion-activo': opcionApp === 2 }" @click="cambiarApp(2)")
      button.icon.icon-stopwatch
    li(:class="{'opcion-activo': opcionApp === 3 }" @click="cambiarApp(3)")
      button.icon.icon-hammer
    li(:class="{'opcion-activo': opcionApp === 4 }" @click="cambiarApp(4)")
      button.icon.icon-man(@click="fullScreen")
</template>

<script>
export default{
  props: {
    opcionApp: { type: Number, required: true }
  },
  methods: {
    cambiarApp (opcion) {
      this.$emit('cambiar', opcion)
    },
    fullScreen () {
      this.$emit('fullscreen', this.opcionApp)
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