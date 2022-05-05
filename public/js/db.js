const db = new loki("contacts.db", {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000,
});

function databaseInitialize() {
  let entries = db.getCollection("entries");
  if (entries === null) {
    entries = db.addCollection("entries");
  }

  console.info("Printing data...");
  console.table(
    db
      .getCollection("entries")
      .data.map((entry) => _.omit(entry, "meta", "$loki"))
  );
}
