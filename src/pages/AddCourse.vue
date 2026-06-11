<template>
  <div class="container my-5" style="max-width: 500px">
    <h1 class="text-center">Add New Course</h1>

    <form @submit.prevent="handleSubmit">
      
      <div class="mb-3">
        <label for="courseNameInput" class="form-label">Course Name</label>
        <input
          type="text"
          class="form-control"
          id="courseNameInput"
          v-model="name"
        />
      </div>

      <div class="mb-3">
        <label for="courseDescription" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="courseDescription"
          v-model="description"
          rows="5"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="coursePrice" class="form-label">Price</label>
        <input
          type="number"
          class="form-control"
          id="coursePrice"
          v-model.number="price"
        />
      </div>

      <!-- button logic -->
      <button type="submit" class="btn btn-primary" v-if="isEnabled">
        Add Course
      </button>
      <button type="submit" class="btn btn-danger" disabled v-else>
        Add Course
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";
import api from "../api";

const notyf = new Notyf();
const router = useRouter();
const { user } = useGlobalStore();


const name = ref("");
const description = ref("");
const price = ref(0);


const isEnabled = ref(false);


async function handleSubmit() {
  const course = {
    name: name.value,
    description: description.value,
    price: price.value,
  };

  try {
    const response = await api.post("/courses", course);

    if (response.status === 201) {
      notyf.success(response.data.message);

      
      name.value = "";
      description.value = "";
      price.value = 0;

      router.push({ path: "/courses" });
    } else {
      notyf.error(response.data.message);
    }
  } catch (error) {
    if (error.response?.status === 409) {
      notyf.error(error.response.data.message);
    } else {
      console.error(error);
      notyf.error("Error adding course. Please contact administrator.");
    }
  }
}

// validation watcher
watch([name, description, price], (values) => {
  if (
    values[0].trim() !== "" &&
    values[1].trim() !== "" &&
    values[2] > 0
  ) {
    isEnabled.value = true;
  } else {
    isEnabled.value = false;
  }
});

// protect route (admin only)
onBeforeMount(() => {
  if (!user.token || !user.isAdmin) {
    router.push({ path: "/courses" });
  }
});
</script>