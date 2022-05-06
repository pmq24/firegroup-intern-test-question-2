<script lang="ts">
import { defineComponent } from "vue";
import ContactForm from "@/components/ContactForm.vue";
import ContactTable from "@/components/ContactTable.vue";

export default defineComponent({
  name: "App",
  components: { ContactForm, ContactTable },
});
</script>

<template>
  <div class="container">
    <h1>Question 2: Contact Form - FireGroup Intern Test</h1>

    <h3>Participant Information: Quang Pham</h3>
    <address>
      Tel (click to call): <a href="tel:0389422279">0389422279</a><br />
      Email (click to mail):
      <a href="mailto:pmq.24.5@gmail.com">pmq.24.5@gmail.com</a>
    </address>

    <ContactForm />
    <ContactTable />
  </div>
</template>
