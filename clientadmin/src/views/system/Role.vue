<template>
  <div class="role"></div>
</template>
<script>
export default {
  name: 'Role',
  methods: {
    init () {
      this.$axios.get('/adminapi/role').then(res => {})
    }
  },
  created () {
    this.init()
  }
}
</script>
<style>

</style>
