import LokiJs from "lokijs";

const Database = new LokiJs("contacts.db", {
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
}

export default Database;
