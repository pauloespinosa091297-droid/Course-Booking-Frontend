<template>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-5 border border rounded-3 mx-auto p-5 mt-3">
                <h3 class="mb-4">Reset Password</h3>
                
                <form v-on:submit="handleReset">
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="newPassword">
                  </div>
                  
                  <button type="submit" class="btn btn-primary">Reset Password</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script setup>
	import { ref } from 'vue';
	import { Notyf } from 'notyf';

	import api from '../api';
	import { useGlobalStore } from '../stores/global';


	const newPassword = ref("");
	const notyf = new Notyf();

	async function handleReset(event) {

		event.preventDefault();

		try {

			const { user } = useGlobalStore();

			if(!user.token) {
				notyf.error("You are not authorized to perform this action.");
				return;
			}

			await api.post("/users/reset-password", {
				newPassword: newPassword.value
			})

			notyf.success("Password reset successfully");
			newPassword.value = "";

		} catch (err) {

			// if(err.response.data.message) {
				notyf.error("{Password reset failed. Please contact administrator");
				console.log(err);
		
		}
	}

</script>