<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
	  <div class="container-fluid">
	    <!-- <a class="navbar-brand" href="#">ZUITT</a> -->
	    <!-- router-link is used to navigate to pages using the vue-router system -->
	    <!-- This will prevent the pages from refeshing when switching -->
	    <!-- :to is router link option that tells the router which page to go to -->
	    <router-link :to="{name: 'Home'}" class="navbar-brand text-dark fw-bold">ZUITT</router-link>
	    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	      <span class="navbar-toggler-icon"></span>
	    </button>
	    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
	      <div class="navbar-nav ms-auto">
	        <router-link :to="{name: 'Courses'}" class="nav-link active" aria-current="page" href="#">Courses</router-link>
	        <!-- ACTIVITY SOLUTION START -->
	        <router-link :to="{ name: 'News' }" class="nav-link">News</router-link>
	         <router-link :to="{ name: 'Profile' }" class="nav-link" v-if="user.email">Profile</router-link>
	        <!-- ACTIVITY SOLUTION END -->
	       
	        <router-link :to="{name: 'Register'}" class="nav-link active" aria-current="page" href="#" v-if="!user.email">Register</router-link>
	        <!-- mem1 start -->
	        <router-link :to="{ name: 'AddCourse' }" class="nav-link" v-if="user.email && user.isAdmin">Add Course</router-link>
	        <!-- mem1 end -->
	        <router-link :to="{name: 'Login'}" class="nav-link active" aria-current="page" href="#" v-if="!user.email">Login</router-link>
	        <router-link :to="{name: 'Logout'}" class="nav-link active" aria-current="page" href="#" v-else>Logout</router-link>
	       
	      </div>
	    </div>
	  </div>
	</nav>
</template>

<script setup>
	import { onBeforeMount, ref } from 'vue';
	import { useGlobalStore } from '../stores/global.js';

	// deconstruct the values from the useGlobalStore to access it directly
	const { user } = useGlobalStore();
	// reactive state for checking if the user is logged in
	/*const email = ref("");

	// onBeforeMount() is a lifecycle hook that runs the function before the page component/template is loaded unto the screen
	onBeforeMount(() => {
		// the value stored in the local Storage key "email" will be saved in the email reactive state
		// If there is no email key in the local Storage, it will store null
		email.value = localStorage.getItem("email");
	}) */
</script>