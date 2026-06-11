<script setup>
	import { onBeforeMount } from 'vue';
	import { useGlobalStore } from '../stores/global.js';
	import { useRouter } from 'vue-router';

	const { getUserDetails } = useGlobalStore();
	const router = useRouter();

	onBeforeMount(() => {

		// claers the localStorage
		localStorage.clear();

		getUserDetails(null);

		// allows us to redirect to the login page after logging out
		// window.location.href = "/login";

		router.push({path: "/login"});
	})
</script> 

<!-- A vue component is required to have a template tag -->
<template></template>