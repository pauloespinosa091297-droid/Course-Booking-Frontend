// to make it easier creating request to our server, this will act as a blueprint or starter template for our request
import axios from 'axios';

// created an "api" variable that will store the isntance of axios that will be used throughout the application
// "api" variable contains the properties and functions of axios that we can use to make request
const api = axios.create({
	// baseURL - this will be the common url used by all your requests
	// the urlof your request will always start with value retrieved from the environment variable "VITE_COURSE_BOOKING_API"
	baseURL: import.meta.env.VITE_COURSE_BOOKING_API
})

// interceptors.request - special functions that allows you to intercept or modify your HTTP request before sending then
api.interceptors.request.use((config) => {
	// our interceptors will check if therte is a token stored in the localStorage
	const token = localStorage.getItem('token');
	// if there is a value stored in the key "tokem"
	if(token) {
		// add the authorization header with the bearer token
		config.headers.Authorization = `Bearer ${token}`;
	}

	// after modifying te request we will return it so that it will continue
	return config;
})

export default api;