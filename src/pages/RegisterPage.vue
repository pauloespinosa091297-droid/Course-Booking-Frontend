<template>
	<div class="container-fluid">
		<h1 class="my-5 pt-3 text-primary text-center">Register Page</h1>

		<div class="row d-flex justify-content">
			<div class="col-md-5 border border rounded-3 mx-auto p-5">
				<form v-on:submit="handleSubmit">

				  <div class="mb-3">
				    <label for="exampleInputEmail1" class="form-label">First Name</label>
				    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="firstName" /> 
				  </div>

				  <div class="mb-3">
				    <label for="exampleInputEmail1" class="form-label">Last Name</label>
				    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="lastName" /> 
				  </div>

				  <div class="mb-3">
				    <label for="exampleInputEmail1" class="form-label">Mobile Number</label>
				    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="mobileNo" /> 
				  </div>

				  <div class="mb-3">
				    <label for="exampleInputEmail1" class="form-label">Email Address</label>
				    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email" /> 
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

<!-- 
	setup attribute is a new feature in Vue 3 that eases the use of Composition API

	Instead of adding the props, reactive data, computed properties, or methods in the return statement to be used in the template. In <script setup>, we simply have to declare them.

	<script setup> only works for features that can also be used in the setup() statement
-->
<script setup>

	import { ref, watch, onBeforeMount }  from 'vue';
	// import Notyf to allows us access to the notyf package
	import { Notyf } from 'notyf';
	import { useRouter } from 'vue-router';
	import { useGlobalStore} from '../stores/global';
	import api from '../api.js';

	const router = useRouter();
	const { user } = useGlobalStore();

	// created reactive states for each input
	const firstName = ref("");
	const lastName = ref("");
	const mobileNo = ref("");
	const email = ref("");
	const password = ref("");
	const confirmPass = ref("");
	// create a reactive state to conditionally render a button
	const isEnabled = ref(false);

	// creating a variable that will store an instance of the Notyf object
	const notyf = new Notyf();

	onBeforeMount(() => {
	    if (user.email) {
	        router.push({ path: '/courses' });
	    }
	});

	// used the watch hook to watch the reactive states so that whenever the user types into the input, the binded reactive states will also be updated
	// to watch more than 1 reactive state, we cwill add then as an array in the first argument
	// [0] = email, [1] = password, [2] = confirmPass
	// everytime any of the reactive states value changes, the currentValue and oldValue of ALL reactive states will be returned
	watch([email, password, confirmPass, firstName, lastName, mobileNo], (currentValue, oldValue) => {
		// console.log(currentValue);

		// since the currentvalue is an array, we can use the array method .every() to check if ALL reactive states pass the condition
		// also check if the password and the confirmPass values are the same
		if(currentValue.every(input => input !== "") && currentValue[1] === currentValue[2]) {
			isEnabled.value = true;
		} else {
			isEnabled.value = false;
		}
	})

	// this will be our temporary function for mimicking the registration
	async function handleSubmit(e) {
		e.preventDefault();

		/*console.log(email.value);
		console.log(password.value);
		console.log(confirmPass.value);*/

		try {

			await api.post('/users/check-email', {
				email: email.value
			});

			let response = await api.post('/users/register', {
				firstName: firstName.value,
				lastName: lastName.value,
				email: email.value,
				mobileNo: mobileNo.value,
				password: password.value
			})

			if(response.status === 201) {
				notyf.success("Registration Successful");

						// clear values after submission
				 		firstName.value = "";
				 		lastName.value = "";
				 		mobileNo.value = "";
						email.value = "";
						password.value = "";
						confirmPass.value = "";

				router.push({ path: '/login' });
			}

			// if the email already exist int he databasedm the response will be sent and saved in the "err"
			// if the registration response throws 44xx or 5xx status codem the response will be sent and save in "err"
		} catch(err) {

		if(err.response.status === 404 || err.response.status === 401 || err.response.status === 400 || err.response.status === 409){
			notyf.error(err.response.data.message);
		} else {
			console.log(err);
			notyf.error("Registration Failed. Please contact administrator.")
		}
 
 	}
		
}
	
	
</script>