import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../api.js';

export const useGlobalStore = defineStore('global', () => {

	let user = reactive({
		token: localStorage.getItem('token'),
		email: null,
		isAdmin: null,
		firstName: null,
		lastName: null,
		mobileNo: null,
		isLoading: false 
	});

	async function getUserDetails(token) {

		user.isLoading = true;

		if (!token) {
			user.token = null;
			user.email = null;
			user.isAdmin = null;
			user.firstName = null;
			user.lastName = null;
			user.mobileNo = null;
			user.isLoading = false;
			return;
		}

		try {
			let { data } = await api.get('/users/details', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			user.token = token;
			user.email = data.email;
			user.isAdmin = data.isAdmin;
			user.firstName = data.firstName;
			user.lastName = data.lastName;
			user.mobileNo = data.mobileNo;

		} catch (error) {
			console.error(error);

			user.token = null;
			user.email = null;
			user.isAdmin = null;
			user.firstName = null;
			user.lastName = null;
			user.mobileNo = null;

		} finally {
			user.isLoading = false;
		}
	}

	return {
		user,
		getUserDetails
	};
});