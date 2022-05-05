<script setup lang="ts">
import { Ref, ref } from "vue";

import { FormKit } from "@formkit/vue";

type FormData = Partial<{
  name: string;
  email: string;
  phone: string;
  content: string;
}>;

const submitted: Ref<boolean> = ref(false);
const formData: Ref<FormData> = ref({});

function submit() {
  console.log(formData);
  submitted.value = true;
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
  <div v-if="submitted">
    <h2>Submission successful!</h2>
  </div>
  <pre wrap>{{ formData }}</pre>
</template>
<style lang="css">
.formkit-message {
  color: var(--del-color);
}
</style>
