<template>
  <div class="modal fade" id="editModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">Edit Course</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="updateCourse">
            <div class="mb-3">
              <label class="form-label">Course Name</label>
              <input v-model="name" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="description" class="form-control"></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Price</label>
              <input v-model.number="price" type="number" class="form-control" />
            </div>

            <button class="btn btn-primary w-100">Update Course</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';
import { Notyf } from 'notyf';
import { useGlobalStore } from '../stores/global';
const { user } = useGlobalStore();
const notyf = new Notyf();

// Course state
const courseId = ref('');
const name = ref('');
const description = ref('');
const price = ref(0);

// Open modal and load course
const openModal = async (id) => {
  courseId.value = id;
  try {
    const { data } = await api.get(`/courses/${id}`);
    name.value = data.name;
    description.value = data.description;
    price.value = data.price;

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  } catch (err) {
    console.error(err);
    notyf.error("Failed to load course");
  }
};

// Update course
const updateCourse = async () => {
  try {
    await api.patch(
      `/courses/${courseId.value}`,
      { name: name.value, description: description.value, price: price.value },
      { headers: { Authorization: `Bearer ${user.access}` } }
    );

    notyf.success("Course updated!");
    const modalEl = document.getElementById('editModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();

    // Emit event to parent
    emit('updated');
  } catch (err) {
    console.error(err);
    notyf.error("Update failed. Please contact administrator");
  }
};

defineExpose({ openModal });
</script>