// load the package for the css ruleset
// import directive is used to load modules/packages and components into a vue file similar to a "require" directive in express.
// we used the "import" directive to load the bootstrap classes that we will use it in our application
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// we use the "import" directive to load the bootstrap icon classes that we will use in the application
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'notyf/notyf.min.css';
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

// we import/load the pages that will be added in the vue-router
import HomePage from './pages/HomePage.vue';
import CoursesPage from './pages/CoursesPage.vue';

import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LogoutPage from './pages/LogoutPage.vue';
/* ACTIVITY SOLUTION START */
import NewsPage from './pages/NewsPage.vue';
import ErrorPage from './pages/ErrorPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
/* ACTIVITY SOLUTION END */
import ViewCourse from './pages/ViewCourse.vue';

import AddCourse from "./pages/AddCourse.vue";
// import EditCourse from "./pages/EditCourse.vue";

import { createRouter, createWebHistory } from 'vue-router';

// createRouter() is a function that creates a new router instance
const router = createRouter({
	// createWebHistory() creates a history object based on the HTML History API, which allows us to modify the browser url without triggering a full page refresh. It creates a history object that is passed to the create Router() function
	history: createWebHistory(),
	// routes property will contain an array of routes
	routes: [
		// path property will describe the endpoint of thr url
		// name property is used to describe the route.This is most usefuklin navigating using vue-router
		// component property determines the component that will be displayed when the path is accessed
		{
			path: "/",
			name: "Home",
			component: HomePage
		},
		{
			path: "/courses",
			name: "Courses",
			component: CoursesPage
		},
		{
			path: "/register",
			name: "Register",
			component: RegisterPage
		},
		{
			path: "/login",
			name: "Login",
			component: LoginPage
		},
		{
			path: "/logout",
			name: "Logout",
			component: LogoutPage
		},
		/* ACTIVITY SOLUTION START */
		{
		  path: '/news',
		  name: 'News',
		  component: NewsPage
		},
		{
			path: '/profile',
			name: 'Profile',
			component: ProfilePage
		},
		{
		    path: "/addCourse",
		    name: "AddCourse",
		    component: AddCourse,
		},
		{
			path: "/courses/:id",
			component: ViewCourse
		},
		{
		  path: '/:catchAll(.*)',
		  component: ErrorPage
		}

		/* ACTIVITY SOLUTION END */
	]
});

// Every vue application starts by creating an instance of a new application with createApp() method
// App will become our mother component. It will become the root component that will connect all other component/files like children
// .mount() method is used to render/inject the root component into the selected element
// .mount is similar to innerHTML
const app = createApp(App)
// createPinia() method will be used to allows us access to manage Pinia stores in our application
app.use(createPinia());
// app.use() will allows us to use global libraries to our Vue application
app.use(router);
app.mount('#app');
