<template>
	<div class="container py-4">
		<h2 class="mb-4">Search Courses</h2>
		<form v-on:submit="searchCourses">
			<div class="mb-3">
				<input type="text" class="form-control" id="exampleInputPassword1" v-model="name">

				<button type="submit" class="btn btn-primary">Search Courses</button>
			</div>
		</form>
	</div>
	<div class="container">
		<div class="row">
			<CourseComponent v-for="course in courses" :courseData="course"/>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { Notyf } from 'notyf';
	import api from '../api';
	import CourseComponent from './CourseComponent.vue';

	const name = ref("");
	const courses = ref([]);
	const hasSearched =ref(false);

	const notyf = new Notyf();

	async function searchCourses(e) {

		e.preventDefault();

		if(!name.value.trim()) {
			notyf.error("Please enter a course name.");
			return;
		}

		hasSearched.value = true;

		try {

			courses.value = [];

			const response = await api.post("/courses/search", {
				courseName: name.value.trim()
			})

			courses.value = response.data;
		} catch(err) {
			notyf.error("Something went wrong.");
			console.log(err);
		}
	}

</script>