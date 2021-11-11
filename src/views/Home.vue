<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <price-finder/>
  </div>
</template>

<script>
// @ is an alias to /src
import PriceFinder from '@/components/PriceFinder.vue'

export default {
  name: 'Home',
  components: {
    PriceFinder
  }
}
</script>
