<!-- ACTIVITY SOLUTION START -->
<script setup>

    import { watch, ref, onBeforeMount } from 'vue';
    import { Notyf } from 'notyf';
    import { useGlobalStore } from "../stores/global";
    import { useRouter } from 'vue-router';
    // import axios from 'axios';
    import api from '../api.js';

    
    const router = useRouter();
    const { user, getUserDetails } = useGlobalStore();

    const email = ref("");
    const password = ref("");
    const isEnabled = ref(false);

    const notyf = new Notyf();


    onBeforeMount(() => {
        if (user.email) {
            router.push({ path: '/courses' });
        }
    });

    watch([email,password], (currentValue, oldValue) => {

        if(currentValue.every(input => input !== "")){
            isEnabled.value = true
        } else {
            isEnabled.value = false
        }
    });

    // axios() method needs the await/async to function
    async function handleSubmit(e){
        e.preventDefault();

        // will contain the HTTP request to login the user
        try {
            // crated a variable "res" which will store the response from our request
            /*let res = await axios({
                method: 'post',
                url: 'http://localhost:4000/users/login',
                data: {
                    email: email.value,
                    password: password.value
                }
            });*/


            let res = await api.post('/users/login', {
                 
                    email: email.value,
                    password: password.value
                
            })

            console.log(res);

            if(res.data) {
                notyf.success("Login Successful");

                // localStorage is a web storage API provided by most web browserthat allows us to store key-value pairs in the user's browser. That data stored even after shutdown will not be deleted.
                // .setItem() method will allow us to save key-value pairs in the localStorage. data are stored as json in localStorage.
                localStorage.setItem("token", res.data.access);

                getUserDetails(res.data.access);

                email.value = "";
                password.value = "";

                // this will allow us to reload the page
                // window.location.reload();

                router.push({ path: '/courses' });
            }

            // if the request sends a 4xx or 5xx response
            // the response from the axios request will be serve in the "err"
        } catch(err) {
                if(err.response.status === 404 || err.response.status === 401 || err.response.status === 400 ) {
                    notyf.error(err.response.data.message);
                } else {
                    notyf.error('Login Failed. Please contact administrator.')
                }
        }
    }

        /*notyf.success("Login Successful");

        // localStorage is a web storage API provided by most web browserthat allows us to store key-value pairs in the user's browser. That data stored even after shutdown will not be deleted.
        // .setItem() method will allow us to save key-value pairs in the localStorage. data are stored as json in localStorage.
        localStorage.setItem("email", email.value);

        getUserDetails(email.value);

        email.value = "";
        password.value = "";

        // this will allow us to reload the page
        // window.location.reload();

        router.push({ path: '/courses' });
    }*/
</script>

<template>
	<div class="container-fluid">
	    <h1 class="my-5 pt-3 text-primary text-center">Login Page</h1> 
	    <div class="row d-flex justify-content-center">
	        <div class="col-md-5 border border rounded-3 mx-auto p-5">
	            <form v-on:submit="handleSubmit">
	                <div class="mb-3">
	                    <label for="emailInput" class="form-label">Email Address</label>
	                    <input type="email" class="form-control" id="emailInput" v-model="email" />
	                </div>
	                <div class="mb-3">
	                    <label for="passwordInput" class="form-label">Password</label>
	                    <input type="password" class="form-control" id="passwordInput" v-model="password" />
	                </div>
	                <div class="d-grid mt-5">
	                	<button type="submit" class="btn btn-primary btn-block"  v-if="isEnabled">Login</button>
                		<button type="submit" class="btn btn-danger btn-block" disabled v-else>Login</button>
	                </div>
	            </form>
	        </div>
	    </div>
    </div>
</template>
<!-- ACTIVITY SOLUTION END -->