<!-- ACTIVITY SOLUTION START -->
<template>
	<div id="CourseCard" class="card p-2 h-100">
     	<div class="card-body">
         	<h4 class="card-title">
            	{{courseData.name}}
         	</h4>
         	<p class="card-text mt-3">
             	{{courseData.description}}
         	</p>
         	<p>
             	Price: PHP {{courseData.price}}
         	</p>

         	<!-- <p>
         		Enrollees: {{enrollees}}
         	</p> -->
         	<!-- ACTIVITY SOLUTION START -->
	        <!-- <p>
	          	Seats: {{seats}}
	        </p> -->
         	<!-- <div class="mt-auto text-center d-grid">
	         	 deleted --- v-on: this is a directive to listen to an event. Event listeners? 
	         	click is an event where a user click on a specific element.--- deleted
	         	<button class="btn btn-outline-primary btn-block" v-if="isEnabled" v-on:click="enroll">Enroll</button>
		        <button class="btn btn-outline-danger btn-block" v-else disabled>Enroll</button>
	        </div> -->
			<!-- ACTIVITY SOLUTION END -->
			<div class="mt-auto text-center d-grid">
			  <router-link 
			    class="btn btn-outline-primary d-block" 
			    :to="{ path: `/courses/${courseData._id}` }"
			  >
			    View Course
			  </router-link>
			</div>
     	</div>
	</div>
</template>
<!-- ACTIVITY SOLUTION END -->

<script>

	// watch() hook to track the changes made to the reactive object
	import { ref, watch } from "vue";
	/* ACTIVITY SOLUTION START */
    import { Notyf } from 'notyf';

    const notyf = new Notyf();
	/* ACTIVITY SOLUTION END */

	export default {
		props: {
			courseData: Object
		},
		// emit method can be destructure from the second parameter of the setup
		// emit is used to emit custom events from child component to its parent component.
		setup({courseData}, {emit}){

			// It will create a reference which is a reactive state and its initial state is 0;
			// We did not create a regular variable but instead we created a "reactive state"
			// const enrollees = ref(0);
			/* ACTIVITY SOLUTION START */
	      	// const seats = ref(30);
	      	// we creates reactive state variable yo conditionally render our button
	      	// const isEnabled = ref(true);
			
			// When the enroll button is clicked, this enroll function will automatically be triggered and will 1 in the state of enrollees.
			/*function enroll(){
				enrollees.value += 1; // enrollees.value++
				seats.value--; // seats.value -= 1

				emit('enrollment', 1);
			}*/

			// watch() hook has 2 arguments
			// the first argument is the reactive state that we are tracking
			// the second argument contains the callback function which monitors 2 parameters
				// the first parameter is the currentValue which stores the current value of the reactive state variable
				// the second parameter is the old value of the reactive state variable
			// currentValue = 30, oldValue = null
			// assuming we pressed the enroll button once, currentValue = 29 and oldValue = 30
			// assuming we pressed the neroll button again, currentValue = 28 and oldValue = 29
			// everytime there is a change in the value of the reactive state bnuttn, the callback function also runs
			// watch(seats, (currentValue, oldValue) => {
			// 	if(currentValue === 0) {
			// 		isEnabled.value = false;
			// 		/* ACTIVITY SOLUTION START */
		    //         notyf.error("No more seats available");
			// 		/* ACTIVITY SOLUTION END */
			// 	} else {
			// 		isEnabled.value = true;
			// 	}
			// })

			return {
				courseData
				/*enrollees,
				enroll,
				seats, 
				isEnabled*/
			}
			/* ACTIVITY SOLUTION END */
		}
	}
</script>
