<script>
    import { ref } from 'vue';

    export default {
        props: ["name", "description"],

        setup(){

            const likes = ref(0);
            
            const likeNews = () => {
                likes.value += 1;
                
            };

            return{
                likeNews,
                likes            
            };
        }
    };
</script>

<template>
    <div class="col-md-4">
        <div class="card h-100" id="CourseCard">
            <div class="card-body">
                <h4 class="card-title">{{name}}</h4>
                <p class="card-text">{{description}}</p>
                <p>likes: {{likes}}</p>
                <!-- <button v-if="likes === 10" class="btn btn-outline-primary" disabled>Like</button> -->
                <!-- <button class="btn btn-outline-primary" v-on:click="likeNews">Like</button> -->
                <button class="btn btn-outline-primary" v-if="likes <10" @click="likeNews">Like</button>
                <button class="btn btn-outline-primary" v-else disabled>Like</button>
            </div>
        </div>
    </div>
</template>