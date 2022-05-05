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

  runProgramLogic();
}

function runProgramLogic() {
  var entryCount = db.getCollection("entries").count();
  console.log("number of entries in database : " + entryCount);
}
