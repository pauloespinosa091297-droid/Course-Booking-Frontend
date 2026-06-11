<!-- 
  App.vue is an example of a component. A component is a reusbale part of an application. 

  VueJS components are independent resuvable parts of an application that are usually created with the concept of SFC (Single-File Component)

  An SFC consists of three parts:
    1. Template
    2. Script
    3. Style
--> 
<!-- Each SFC block conmsists of HTML-like tags that encapsulates the block. They can be in any order -->
<!-- Script: this contains the javascript codes that defines the behaviour and logic of the component -->
<!-- <script setup> cannot contain ES module exports -->
<script>
  import { onBeforeMount } from 'vue';
  import { useGlobalStore } from './stores/global.js';
  // To be able to add a component into another component, in the script block, import the component 
  // The name of the component is the name of the file by default.
  // used the "import" statement to load the HTML like template from BannerComponent.vue file
  import BannerComponent from './components/BannerComponent.vue';
  import NavbarComponent from './components/NavbarComponent.vue';
  /* ACTIVITY SOLUTION START */
  // import HomePage from './pages/HomePage.vue';
  // import CoursesPage from './pages/CoursesPage.vue';
  // import NewsPage from './pages/NewsPage.vue';
  // import LoginPage from './pages/LoginPage.vue';
  /* ACTIVITY SOLUTION END */
  // import RegisterPage from './pages/RegisterPage.vue'

  // use export default {} to add the imported component into the template
  export default {
    // component properties contains all components athat will be used in the template
    components: {
      // BannerComponent,
      NavbarComponent,
      /* ACTIVITY SOLUTION START */
      // HomePage,
      // CoursesPage,
      // NewsPage,
      // RegisterPage,
      // LoginPage
      /* ACTIVITY SOLUTION END */
    },
    setup() {
      const { getUserDetails } = useGlobalStore();

      onBeforeMount(() => { getUserDetails(localStorage.getItem("token"))});
    }
  }
</script>

<!-- Template: this contains the HTML-like code that defines the structure of the component -->
<template>
    <!-- When it comes to using components, the order matters -->
    <NavbarComponent />
    <!-- This is a component in vue-router library that is used to display the component associated with the current route -->
    <!-- When a user access a specific path/endpoint, vue-router will display the component associated with the path/endpoint inside the router-vie component -->
    <router-view />
    <!-- <BannerComponent /> -->
    <!-- ACTIVITY SOLUTION START -->
    <!-- 
    <HomePage />
    <CoursesPage />
    <NewsPage /> 
    -->
    <!-- ACTIVITY SOLUTION END -->
    <!-- <RegisterPage /> -->
    <!-- ACTIVITY SOLUTION START -->
    <!-- <LoginPage /> -->
    <!-- ACTIVITY SOLUTION END -->
</template>

<!-- Style: this contains the css code that defines the styling of the component -->
<style scoped>
</style>

<!--
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ZUITT</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Courses</a>
        </div>
      </div>
    </div>
  </nav>
  
  <div class="container-fluid">
    <div class="row mb-5 py-5" id="banner">
      <div class="col-md-10 p-5 ms-5">
        <h1 class="mb-3" id="banner-title">Zuitt Course Booking System</h1>
        <p class="mb-5" id="motto">Opportunities for everyone, everywhere!</p>
        <a class="btn btn-primary btn-lg rounded-pill px-3">View our Courses! <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>
  </div>
-->