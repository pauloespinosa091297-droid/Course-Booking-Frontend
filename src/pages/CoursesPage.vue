<script>
import { reactive, watch } from 'vue';
import api from '../api.js';


import { useGlobalStore } from '../stores/global.js';


import UserView from '../components/UserView.vue';
import AdminView from '../components/AdminView.vue';

export default {
  components: {
    UserView,
    AdminView
  },

  setup() {

    const globalStore = useGlobalStore();
    const user = globalStore.user;

    
    const courses = reactive([]);

    watch(
      () => ({ ...user }), 
      async (newUser) => {

    
        if (!newUser.isLoading) {
          try {
            let endpoint = newUser.isAdmin
              ? '/courses/all'
              : '/courses';

            const { data } = await api.get(endpoint);

         
            courses.splice(0, courses.length, ...data);

          } catch (err) {
            console.error(err);
          }
        }
      },
      {
        immediate: true 
      }
    );

    return {
      user,
      courses
    };
  }
};
</script>


<template>
  <div class="container">

    <div class="row">
      <div class="col my-5">
        <h1 class="text-center text-primary py-1">Courses Offered</h1>
        <p class="text-center">Select a course to enroll in!</p>
      </div>
    </div>



    <AdminView
      v-if="user.isAdmin && !user.isLoading"
      :coursesData="courses"
    />

    <UserView
      v-else-if="!user.isAdmin && !user.isLoading"
      :coursesData="courses"
    />

 
    <div v-else class="text-center">
      <p>Loading courses...</p>
    </div>

  </div>
</template>