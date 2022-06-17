<template>
  <Example name="James" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Example } from '@@name@@'

export default Vue.extend({
  components: {
    Example,
  },
})
</script>
