<template>
	<div class="container-fluid">
		<h1 class="my-5 pt-3 text-primary text-center">Register Page</h1>

		<div class="row d-flex justify-content">
			<div class="col-md-5 border border rounded-3 mx-auto p-5">
				<form v-on:submit="handleSubmit">

				  <div class="mb-3">
				    <label for="firstNameInput" class="form-label">First Name</label>
				    <input type="text" class="form-control" id="firstNameInput" v-model="firstName" /> 
				  </div>

				  <div class="mb-3">
				    <label for="lastNameInput" class="form-label">Last Name</label>
				    <input type="text" class="form-control" id="lastNameInput" v-model="lastName" /> 
				  </div>

				  <div class="mb-3">
				    <label for="mobileNoInput" class="form-label">Mobile Number</label>
				    <input type="text" class="form-control" id="mobileNoInput" v-model="mobileNo" /> 
				  </div>

				  <div class="mb-3">
				    <label for="emailInput" class="form-label">Email Address</label>
				    <input type="email" class="form-control" id="emailInput" v-model="email" /> 
				  </div>

				  <div class="mb-3">
				    <label for="exampleInputPassword1" class="form-label">Password</label>
				    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" />
				  </div>

				  <div class="mb-3">
				    <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
				    <input type="password" class="form-control" id="exampleInputPassword2" v-model="confirmPass" />
				  </div>

				  <div class="d-grid mt-5">
				  	<button type="submit" class="btn btn-primary btn-block" v-if="isEnabled">Submit</button>
				  	<button type="submit" class="btn btn-danger btn-block" v-else disabled>Submit</button>
				  </div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, watch, onBeforeMount } from 'vue';
	import { Notyf } from 'notyf';
	import { useRouter } from 'vue-router';
	import { useGlobalStore } from '../stores/global';
	import api from '../api.js';

	const router = useRouter();
	const { user } = useGlobalStore();

	// Reactive states for inputs
	const firstName = ref("");
	const lastName = ref("");
	const mobileNo = ref("");
	const email = ref("");
	const password = ref("");
	const confirmPass = ref("");
	const isEnabled = ref(false);

	const notyf = new Notyf();

	onBeforeMount(() => {
	    if (user.email) {
	        router.push({ path: '/courses' });
	    }
	});

	// Watcher to handle form submission button enablement rules
	watch([email, password, confirmPass, firstName, lastName, mobileNo], (currentValue) => {
		if(currentValue.every(input => input !== "") && currentValue[1] === currentValue[2]) {
			isEnabled.value = true;
		} else {
			isEnabled.value = false;
		}
	});

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			// 1. Check if email exists. If status returns 200, it proceeds.
			let emailCheck = await api.post('/users/check-email', {
				email: email.value
			});

			if (emailCheck.status === 200) {
				// 2. Perform actual registration step
				let response = await api.post('/users/register', {
					firstName: firstName.value,
					lastName: lastName.value,
					email: email.value,
					mobileNo: mobileNo.value,
					password: password.value
				});

				if(response.status === 201) {
					notyf.success("Registration Successful");

					// Clear form input fields
					firstName.value = "";
					lastName.value = "";
					mobileNo.value = "";
					email.value = "";
					password.value = "";
					confirmPass.value = "";

					router.push({ path: '/login' });
				}
			}
		} catch(err) {
			console.error("Caught error during handling:", err);

			// Safely handle error payloads returned from the backend instance
			if (err.response && err.response.status) {
				const status = err.response.status;
				if ([400, 401, 404, 409].includes(status)) {
					return notyf.error(err.response.data.message || "An error occurred.");
				}
			}

			// Fallback string parser to manage initial web service cold starts
			if (err.message && err.message.includes("Network Error")) {
				notyf.error("Backend instance is spin-waking up. Please wait a second and click submit again!");
			} else {
				notyf.error("Registration Failed. Please contact administrator.");
			}
		}
	}
</script>