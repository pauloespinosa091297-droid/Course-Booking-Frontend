<script setup>
import { onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../stores/global.js';

import ResetPassword from '../components/ResetPassword.vue';
import UpdateProfile from '../components/UpdateProfile.vue';

const router = useRouter();
const globalStore = useGlobalStore();

const user = computed(() => globalStore.user);

onBeforeMount(async () => {
    if (!globalStore.user.token) {
        router.push({ path: '/' });
        return;
    }

    await globalStore.getUserDetails(globalStore.user.token);
});
</script>

<template>
    <div class="container-fluid">
        <h1 class="my-5 pt-3 text-primary text-center">Profile Page</h1> 

        <div class="row d-flex justify-content-center" v-if="user.email">
            <div class="col-md-5 border rounded-3 mx-auto p-5">
                <h2 class="mt-3">
                    {{ user.firstName }} {{ user.lastName }}
                </h2>
                <hr />
                <h4>Contacts</h4>
                <ul>
                    <li>Email: {{ user.email }}</li>
                    <li>Mobile No: {{ user.mobileNo }}</li>
                </ul>
            </div>
        </div>

        <ResetPassword />
        <UpdateProfile />
    </div>
</template>