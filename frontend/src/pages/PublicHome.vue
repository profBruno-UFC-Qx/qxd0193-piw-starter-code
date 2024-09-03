<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'
import type { User } from '@/types'

const users = ref([] as User[])
const erro = ref<Error>()
const loading = ref(true)
const success = ref(false)

const deleteRequested = ref(false)
const userToRemove = ref<User>()

onMounted(async () => {
  try {
    const res = await api.get('/users')
    users.value = res.data.data
  } catch (e) {
    erro.value = e as Error
  } finally {
    loading.value = false
  }
})

async function removeUser() {
  console.log(`Remover usuário ${userToRemove.value?.id}`)
  try {
    const res = await api.delete(`/users/${userToRemove.value?.id}`)
    const removedUser: User = res.data.data
    const toRemove = users.value.findIndex(u => removedUser.id == u.id)
    users.value.splice(toRemove, 1)
    success.value = true
  } catch (e) {
    erro.value = e as Error
  } finally {
    toogleModal()
  }
}

function askToDelete(id: number) {
  const index = users.value.findIndex(u => u.id === id)
  userToRemove.value = users.value[index]
  toogleModal()
}

function toogleModal() {
  deleteRequested.value = !deleteRequested.value
}
</script>

<template>
  <div v-if="erro" class="alert alert-danger alert-dismissible" role="alert">
    {{ erro.message }}
    <button @click="erro=undefined" type="button" class="btn-close" aria-label="Close"></button>
  </div>

  <div v-if="success" class="alert alert-success alert-dismissible" role="alert">
    O usuário foi removido com sucesso
    <button @click="success=false" type="button" class="btn-close" aria-label="Close"></button>
  </div>

  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
  </div>
</div>

  <table v-else class="table table-striped">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role.name }}</td>
        <td>
          <button @click="askToDelete(user.id)" class="btn btn-danger"><i class="bi bi-trash"></i></button>
          <RouterLink class="btn btn-warning" :to="`/users/${user.id}`"><i class="bi bi-pencil"></i></RouterLink>
          <button class="btn btn-success"><i class="bi bi-eye"></i></button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="modal" tabindex="-1" v-if="deleteRequested">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Remover usuário</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>O usuário <strong>{{ userToRemove?.name }} de id {{ userToRemove?.id }}</strong> será removido. Você tem certeza que deseja realizar esta operação?</p>
      </div>
      <div class="modal-footer">
        <button @click="deleteRequested=false" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
        <button @click="removeUser" type="button" class="btn btn-primary">Sim</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.modal {
  display: block;
}
</style>