<template lang="pug">
  ul.menu
    li.opcion
      router-link.icon.icon-hour-glass(to="/")
    li.opcion
      router-link.icon.icon-stopwatch(to="cronometro")
    li.opcion
      router-link.icon.icon-hammer(to="manual")
    li.opcion
      router-link.icon.icon-man(to="redes-sociales")
    li.opcion
      button.icon(
        :class="(fullScreen)? 'icon-shrink' : 'icon-enlarge'"
        @click="cambiarFullScreen()"
      )
</template>

<script>
export default{
  props: {
    fullScreen: { type: Boolean, required: true }
  },
  methods: {
    cambiarFullScreen () {
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
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      font-size: 1.2em;
      color: #fff;
      background: none;
      cursor: pointer;
      text-decoration: none;
      transition: .3s;
    }
    .icon:hover{
      background: #002426;
    }
  }
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