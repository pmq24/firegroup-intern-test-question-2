<script setup lang="ts">
import { Ref, ref } from "vue";

import { FormKit } from "@formkit/vue";

import Database from "@/Database";

type FormData = Partial<{
  name: string;
  email: string;
  phone: string;
  content: string;
}>;

type ContactRecord = {
  name: string;
  email: string;
  phone: string;
  content: string;
  time: string;
};

const formData: Ref<FormData> = ref({});
const contacts: Ref<Array<ContactRecord>> = ref([]);

Database.on("ready", () => {
  contacts.value = Database.getCollection("contacts").data;
});

async function submit() {
  await Database.getCollection("contacts").insert({
    ...formData.value,
    time: new Date(Date.now()).toISOString(),
  });
  contacts.value = Database.getCollection("contacts").data;
}
</script>

<template>
  <h3>Contact Form</h3>
  <FormKit type="form" v-model="formData" @submit="submit">
    <FormKit type="text" name="name" label="Your name" validation="required" />
    <FormKit
      type="email"
      name="email"
      label="Your email"
      validation="required|email"
    />
    <FormKit
      type="text"
      name="phone"
      label="Phone"
      validation="required|matches:/\d+/|length:10,10"
      :validation-messages="{
        matches: 'Please enter a valid phone',
        length: 'Phone must be 10-digit long',
      }"
    />
    <FormKit
      type="textarea"
      name="content"
      label="Content"
      validation="required"
    />
  </FormKit>
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
<style lang="css">
.formkit-message {
  color: var(--del-color);
}
</style>
