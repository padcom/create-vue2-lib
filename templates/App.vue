<template>
  <Hello name="James" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Hello } from '@@name@@'

export default Vue.extend({
  components: {
    Hello,
  },
})
</script>
