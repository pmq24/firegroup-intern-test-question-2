<script setup lang="ts">
import { ref } from "vue";
import { contactsRef } from "@/Database";

const contacts = ref(contactsRef);
</script>

<template>
  <div class="headings">
    <h1>Database</h1>
    <h4>
      Note: Data is stored in LocalStorage and will be delete when browser data
      is cleared
    </h4>
  </div>
  <table>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Time</th>
      <th>Content</th>
    </tr>
    <tr v-for="(contact, index) in contacts" :key="index">
      <td>{{ contact.name }}</td>
      <td>{{ contact.email }}</td>
      <td>{{ contact.phone }}</td>
      <td>{{ contact.time }}</td>
      <td>{{ contact.content }}</td>
    </tr>
  </table>
</template>
