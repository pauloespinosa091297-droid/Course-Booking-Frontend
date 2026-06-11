<!-- When creating a new VueJS component, it must consist of 3 blocks, template, script and style. -->
<!-- When naming a component, it must consist of two words and preferably in PascalCase -->
<!-- Each SFC block consists of HTML-like tags that encapsulates the block. They can be in any order. -->
<!-- {{}} - Double mustache is used to embed JS expressions in the template block -->
<template>
  <div class="container-fluid">
    <div class="row mb-5 py-5" id="banner">
      <div class="col-md-10 p-5 ms-5">
        <h1 class="mb-3" id="banner-title">{{bannerProps.title}}</h1>
        <p class="mb-5" id="motto">{{bannerProps.tagline}}</p>
        <!-- ACTIVITY SOLUTION START -->
        <router-link class="btn btn-primary btn-lg rounded-pill px-3" :to="{ name: bannerProps.destination }">{{bannerProps.buttonLabel}} <i class="bi bi-arrow-right"></i></router-link>
        <!-- ACTIVITY SOLUTION END -->
      </div>
    </div>
  </div>
</template>

<script>
  // export default allows us to define the components registration and its properties using Options API and Composition API
  // Options API was first used in VueJS Development and is mostly used fir small scale applications. Compositions API was added when VueJS 3 was introduced
  // Defining the props property using the Options API will allow components to be completely reusable. It will allow us to pass data from a parent component to a child component.
  export default {
    // props  property is from the Options API that will allow us to define the propts that can be passed to component
    // VueJS will check the data type of the value passed as a prop to this component
    props: {
      bannerProps : Object
    },
    // mounted a method in Options API that when a component is mounted automatically this will run
    mounted(){
      console.log(this.bannerProps.title);
      console.log(this.bannerProps.tagline);
    }
  }

</script>