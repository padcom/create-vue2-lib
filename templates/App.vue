<template>
  <Hello name="James" />
</template>

<script lang="ts">
import Vue from 'vue'
import Hello from './components/Hello.vue'

export default Vue.extend({
  components: {
    Hello,
  },
})
</script>
