<script lang="ts">
import { defineComponent } from "vue";
import ContactForm from "@/components/ContactForm.vue";

export default defineComponent({
  name: "App",
  components: { ContactForm },
});
</script>

<template>
  <div class="container">
    <ContactForm />
  </div>
</template>
