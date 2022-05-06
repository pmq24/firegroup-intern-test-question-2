<script setup lang="ts">
import { Ref, ref } from "vue";

import { FormKit } from "@formkit/vue";

import { Database, contactsRef } from "@/Database";

type FormData = Partial<{
  name: string;
  email: string;
  phone: string;
  content: string;
}>;

const formData: Ref<FormData> = ref({});

function submit() {
  Database.getCollection("contacts").insert({
    ...formData.value,
    time: new Date(Date.now()).toISOString(),
  });
  contactsRef.value = Database.getCollection("contacts").data;
}

async function reset() {
  formData.value = {};
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
    <FormKit type="button" label="Reset" @click="reset" />
  </FormKit>
</template>

<style lang="css">
.formkit-message {
  color: var(--del-color);
}
</style>
