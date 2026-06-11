<template>
    <div>
        <button class="btn btn-primary" @click="openModal">Edit</button>

        <div
            class="modal fade"
            :id="modalId"
            tabindex="-1"
            aria-hidden="true"
            ref="modalRef"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="updateCourse">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Course</h5>
                            <button type="button" class="btn-close" @click="hideModal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="courseName" class="form-label">Name</label>
                                <input
                                    type="text"
                                    id="courseName"
                                    class="form-control"
                                    v-model="form.name"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="courseDescription" class="form-label">Description</label>
                                <textarea
                                    id="courseDescription"
                                    class="form-control"
                                    v-model="form.description"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="coursePrice" class="form-label">Price</label>
                                <input
                                    type="number"
                                    id="coursePrice"
                                    class="form-control"
                                    v-model.number="form.price"
                                    required
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="hideModal">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary" :disabled="loading">
                                {{ loading ? "Updating..." : "Save Changes" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "../api.js";
import { Modal } from "bootstrap";


const props = defineProps({
    course: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["status-updated"]);

// Refs & State
const modalRef = ref(null);
const modalId = `editCourseModal-${props.course._id}`;
let modalInstance = null;
const loading = ref(false);
const notyf = new Notyf();

const form = reactive({
    name: props.course.name,
    description: props.course.description,
    price: props.course.price,
});


watch(() => props.course, (newCourse) => {
    form.name = newCourse.name;
    form.description = newCourse.description;
    form.price = newCourse.price;
}, { deep: true });

const openModal = () => {
    if (!modalInstance) {
        modalInstance = new Modal(modalRef.value);
    }
    modalInstance.show();
};

const hideModal = () => {
    if (modalInstance) modalInstance.hide();
};

const updateCourse = async () => {
    try {
        loading.value = true;
        const token = localStorage.getItem("token");

        await api.patch(
            `/courses/${props.course._id}`,
            {
                name: form.name,
                description: form.description,
                price: form.price,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        notyf.success("Course updated successfully!");
        emit("status-updated"); // Tells AdminView to refresh the list
        hideModal();
    } catch (err) {
        console.error("Update Error:", err);
        const errorMsg = err.response?.data?.message || "Failed to update course.";
        notyf.error(errorMsg);
    } finally {
        loading.value = false;
    }
};
</script>