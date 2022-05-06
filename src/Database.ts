import LokiJs from "lokijs";
import { Ref, ref } from "vue";

export type ContactEntity = {
  name: string;
  email: string;
  phone: string;
  time: string;
  content: string;
};

export const contactsRef: Ref<ContactEntity[]> = ref([]);

export const Database = new LokiJs("contacts.db", {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000,
});

function databaseInitialize() {
  let entries = Database.getCollection("contacts");
  if (entries === null) {
    entries = Database.addCollection("contacts");
  }

  contactsRef.value = Database.getCollection<ContactEntity>("contacts").data;
}
