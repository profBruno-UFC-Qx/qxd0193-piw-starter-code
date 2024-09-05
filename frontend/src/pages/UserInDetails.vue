<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { isAxiosError } from 'axios'
import { api } from '@/api'
import type { User, ApplicationError } from '@/types'
import { isApplicationError } from '@/composables/useApplicationError'

const user = ref({} as User)
const errorMessage = ref<ApplicationError>()
const loading = ref(true)
const updated = ref(false)

const editionMode = ref(false)
const route = useRoute()

function toogleEdit() {
  editionMode.value = !editionMode.value
}

async function updateUser() {
  try {
    loading.value = true
    const res = await api.put(`/users/${user.value.id}`, {
      name: user.value.name,
      username: user.value.username,
      email: user.value.email
    })
    user.value = res.data.data
    updated.value = true
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      errorMessage.value = e.response?.data
    }
  } finally {
    loading.value = false
  }
}

async function loadUser(id: number) {
  try {
    const res = await api.get(`/users/${id}`)
    user.value = res.data.data
  } catch (e) {
    console.log(e)
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      errorMessage.value = e.response?.data
    }
  } finally {
    loading.value = false
  }
}

loadUser(Number(route.params.id))
</script>

<template>
  <h2 class="text-center mb-4"></h2>
  <p></p>
  <div v-if="updated" class="alert alert-success" role="alert">Usuário atualizado com sucesso!</div>
  <p v-if="errorMessage">{{ errorMessage.error.message }}</p>
  <form v-else @submit.prevent="updateUser">
    <div class="card">
      <h3 class="card-header text-center">User Information</h3>
      <div class="card-body">
        <div class="mb-3">
          <a @click="toogleEdit" class="btn btn-outline-secondary btn-sm">
            <template v-if="editionMode">
              <i class="bi bi-lock"></i>
              Desabilitar edição
            </template>
            <template v-else>
              <i class="bi bi-unlock"></i>
              Habilitar edição
            </template>
          </a>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input
            v-model="user.name"
            type="text"
            class="form-control"
            id="name"
            :disabled="!editionMode"
          />
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">Username:</label>
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            id="username"
            :disabled="!editionMode"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            type="email"
            v-model="user.email"
            class="form-control"
            id="email"
            :disabled="!editionMode"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            :disabled="!editionMode"
          />
        </div>
        <div class="mb-3">
          <label for="role" class="form-label">Role:</label>
          <select v-model="user.role" class="form-select" id="role" :disabled="!editionMode">
            <option>admin</option>
            <option>User</option>
            <option>Guest</option>
          </select>
        </div>
      </div>
      <div v-if="editionMode" class="card-footer text-center mt-3">
        <input type="submit" class="btn btn-primary" value="Atualizar" />
      </div>
    </div>
  </form>
</template>
