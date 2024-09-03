<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/api'
import type { User, ApplicationError } from '@/types'
import { isApplicationError } from '@/composables/useApplicationError'

const user = ref({} as User)
const erro = ref<ApplicationError>()
const loading = ref(true)

const route = useRoute()

onMounted(async () => {
  try {
    const res = await api.get(`/users/${route.params.id}`)
    user.value = res.data.data
  } catch (e) {
    if (isApplicationError(e)) {
      erro.value = e
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <h1>{{ user }}</h1>
  <h2 class="text-center mb-4">User Information</h2>
  <p v-if="erro">{{ erro.response?.data.error.message }}</p>
  <div v-else class="card">
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input type="text" class="form-control" id="name" value="John Doe" readonly />
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">Username:</label>
          <input type="text" class="form-control" id="username" value="johndoe" readonly />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            value="john.doe@example.com"
            readonly
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input type="password" class="form-control" id="password" value="password123" readonly />
        </div>
        <div class="mb-3">
          <label for="role" class="form-label">Role:</label>
          <select class="form-select" id="role" disabled>
            <option selected>Admin</option>
            <option>User</option>
            <option>Guest</option>
          </select>
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-primary">Edit</button>
      <button class="btn btn-danger">Logout</button>
    </div>
  </div>
</template>
