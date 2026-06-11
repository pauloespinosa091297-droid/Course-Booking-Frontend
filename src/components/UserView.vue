<template>

  <CourseSearch />

  <div class="row d-flex justify-content-center g-3 pb-5">
    <CourseComponent v-for="course in coursesData" :courseData="course"/>
  </div>
</template>

<script setup>
import CourseComponent from '../components/CourseComponent.vue';

defineProps({
  coursesData: Array
});
</script>

<script>
  import CourseSearch from './CourseSearch.vue';

  export default {
    components: {
      CourseSearch
    }
  }


</script>