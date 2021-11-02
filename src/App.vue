<template>
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Main from './views/Main.vue'
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'
export default {
  components: {
    Main,
    Header,
    Footer
  }
}
</script>
