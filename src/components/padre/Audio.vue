<template lang="pug">
  audio.audio(v-if="activo" src="src/assets/alarma.mp3" type="audio/mpeg" controls autoplay)
</template>

<script>
export default{
  props: {
    activo: { type: Boolean, required: true }
  }
}
</script>

<style lang="scss">
  .audio{
    display: none;
  }
</style>