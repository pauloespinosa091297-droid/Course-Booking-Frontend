<template>
  <div>
    <h1 class="text-center mb-4">Admin Dashboard</h1>
    <div class="row d-flex justify-content-center g-3 pb-5">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course._id">
            <td>{{ course._id }}</td>
            <td>{{ course.name }}</td>
            <td>{{ course.description }}</td>
            <td>{{ course.price }}</td>
            <td>
              <span class="text-success" v-if="course.isActive">Available</span>
              <span class="text-danger" v-else>Unavailable</span>
            </td>
            <td>
              <EditCourseButton :course="course" @status-updated="getAllCourses" />
            </td>
            <td>
              <button 
                v-if="course.isActive"
                class="btn btn-danger"
                @click="archiveCourse(course._id)"
              >
                Archive
              </button>

              <button 
                v-else
                class="btn btn-success"
                @click="activateCourse(course._id)"
              >
                Activate
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import EditCourseButton from "./EditCourseButton.vue";
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '../stores/global';
import { Notyf } from 'notyf';

const globalStore = useGlobalStore();
const notyf = new Notyf();
const courses = ref([]);

// Fetch all courses from backend
const getAllCourses = async () => {
  try {
    const response = await fetch('http://localhost:4000/courses', {
      headers: {
        Authorization: `Bearer ${globalStore.user.token}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      courses.value = data;
    }
  } catch (err) {
    console.error(err);
    notyf.error('Error loading courses');
  }
};

onMounted(getAllCourses);

async function archiveCourse(courseId) {
  try {
    const response = await fetch(`http://localhost:4000/courses/${courseId}/archive`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${globalStore.user.token}`,
          'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
      notyf.success("Course archived successfully");
      

      const course = courses.value.find(c => c._id === courseId);
      if (course) course.isActive = false; 
    } else {
      notyf.error("Failed to archive course");
    }
  } catch (err) {
    notyf.error("Error archiving course.");
  }
}

async function activateCourse(courseId) {
  try {
    const response = await fetch(`http://localhost:4000/courses/${courseId}/activate`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${globalStore.user.token}`,
          'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
      notyf.success("Course activated successfully");


      const course = courses.value.find(c => c._id === courseId);
      if (course) course.isActive = true;
    } else {
      notyf.error("Failed to activate course");
    }
  } catch (err) {
    notyf.error("Error activating course.");
  }
}
</script>

<style scoped>
table {
  width: 100%;
}
.btn {
  min-width: 100px; 
}
</style>