<!-- ACTIVITY SOLUTION START -->
<script>
  import BannerComponent from '../components/BannerComponent.vue';
  import HighlightsComponent from '../components/HighlightsComponent.vue';

  export default {
    components: {
      BannerComponent,
      HighlightsComponent
    },
    // data() method is used to return the "reactive states" managed by a component using the Options API. It returns an object containing the initial values for the component's reactive state.
    data(){
      return {
        /* ACTIVITY SOLUTION START */
          bannerProps: {
            title: "Zuitt Course Booking System",
            tagline: "Opportunities for everyone, everywhere.",
            destination: "Courses",
            buttonLabel: "View Our Courses"
          }
          /* ACTIVITY SOLUTION END */
      }
    }
  }
</script>

<template>
  <div class="container-fluid">
    <!-- v-bind directives that we can use in vue JS -->
    <!-- :props-name -->
    <BannerComponent :bannerProps=bannerProps  />

    <HighlightsComponent />
  </div>
</template>
<!-- ACTIVITY SOLUTION END -->