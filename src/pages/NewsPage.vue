<template>
  <div class="container" id="newsPage">

    <div class="row text-center">
      <div class="col">
        <h1 class="text-primary mb-5 py-3">News</h1>
      </div>
    </div>

    <div class="row d-flex justify-content-center g-3 pb-5">
      <NewsComponent 
        v-for="news in newsData"
        :key="news.id" 
        :name="news.name"
        :description="news.description"
      />
    </div>

    
    <!-- <div v-if="email" class="row justify-content-center mt-5"> -->
    <div v-if="user.email" class="row justify-content-center mt-5">
      <div class="col-md-6">

        <h2 class="text-primary text-center">Feedback Form</h2>

        <form @submit.prevent="submitFeedback" class="card p-4 mt-3">

          <div class="mb-3">
            <label>Email Address</label>
            <input 
              type="email" 
              class="form-control"
              :value="user.email"
              disabled
            >
          </div>

          <div class="mb-3">
            <label>Feedback</label>
            <textarea 
              class="form-control"
              v-model="feedback"
              placeholder="Let us know what you think"
              rows="5"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary btn-block" 
            :disabled="!isEnabled"
          >
            Send Feedback
          </button>

        </form>

      </div>
    </div>

   
    <div v-else class="text-center text-danger mt-5">
      <h5>Please login to submit feedback.</h5>
    </div>

  </div>
</template>

<script setup>
// import { ref, watch, onBeforeMount } from 'vue'
import { ref, watch } from 'vue'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'


import newsData from '../data/newsData.js'
import NewsComponent from '../components/NewsComponent.vue'
import { useGlobalStore } from '../stores/global'


// const email = ref("")
const { user } = useGlobalStore();
const feedback = ref("");
const isEnabled = ref(false);
const notyf = new Notyf();


watch([feedback], (currentValue) => {

  if(currentValue.every(input => input !== "")){
    isEnabled.value = true;
  } else {
    isEnabled.value = false;
  }
});

function submitFeedback() {
  notyf.success("Feedback Sent")

  feedback.value = ""
  isEnabled.value = false
}

// onBeforeMount(() => {
//   email.value = localStorage.getItem("email") || ""
// })
</script>