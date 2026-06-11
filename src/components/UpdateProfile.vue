<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 border rounded-3 p-4">

        <h3 class="mb-4">Update Profile</h3>

        <form @submit.prevent="updateProfile">
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input v-model="firstName" type="text" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input v-model="lastName" type="text" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label">Mobile Number</label>
            <input v-model="mobileNo" type="text" class="form-control" />
          </div>

          <button class="btn btn-primary w-100">Update Profile</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Notyf } from 'notyf';
import api from '../api';
import { useGlobalStore } from '../stores/global';

const globalStore = useGlobalStore();
const notyf = new Notyf();

const firstName = ref('');
const lastName = ref('');
const mobileNo = ref('');

watch(
  () => globalStore.user,
  (newUser) => {
    if (newUser) {
      firstName.value = newUser.firstName || '';
      lastName.value = newUser.lastName || '';
      mobileNo.value = newUser.mobileNo || '';
    }
  },
  { immediate: true }
);

async function updateProfile() {
  try {
    await api.put(
      '/users/profile',
      {
        firstName: firstName.value,
        lastName: lastName.value,
        mobileNo: mobileNo.value
      },
      {
        headers: {
          Authorization: `Bearer ${globalStore.user.token}`
        }
      }
    );

    globalStore.user.firstName = firstName.value;
    globalStore.user.lastName = lastName.value;
    globalStore.user.mobileNo = mobileNo.value;

    notyf.success("Profile updated successfully!");

  } catch (err) {
    console.error(err);
    notyf.error("Update failed.");
  }
}
</script>