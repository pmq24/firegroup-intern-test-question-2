Vue.createApp({
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      content: "",
    };
  },
  methods: {
    onSubmit: function () {
      db.getCollection("entries").insert({
        name: this.name,
        email: this.email,
        phone: this.phone,
        content: this.content,
        time: Date.now(),
      });
      console.info("Form submited. Printing new data...");
      console.table(
        db
          .getCollection("entries")
          .data.map((entry) => _.omit(entry, "meta", "$loki"))
      );
    },
    onReset: function () {
      this.name = this.email = this.phone = this.content = "";
      console.info("Form reset");
    },
  },
  watch: {
    name: function (newValue, oldValue) {
      console.info(`Name changed from ${oldValue} to ${newValue}`);
    },
    email: function (newValue, oldValue) {
      console.info(`Email changed from ${oldValue} to ${newValue}`);
    },
    phone: function (newValue, oldValue) {
      const sanitizedPhone = sanitizePhone(newValue);
      this.phone = sanitizedPhone;
      console.info(`Phone changed from ${oldValue} to ${sanitizedPhone}`);
    },
    content: function (newValue, oldValue) {
      console.info(`Content changed from "${oldValue}" to "${newValue}"`);
    },
  },
}).mount("#vm");

/**
 * Sanitize phone
 * @param {string} phone phone to sanitize
 * @returns {string} sannitized phone
 */
function sanitizePhone(phone) {
  return truncatePhone(removeNonDigitChars(phone));
}

/**
 * Remove all non-digit chars in phone
 * @param {string} phone phone to be modified
 * @returns {string} phone with non-digit chars removed
 */
function removeNonDigitChars(phone) {
  return phone.replace(/\D{1}/, "");
}

/**
 * Truncate phone if longer than 10 digits
 * @param {string} phone phone to truncate
 * @returns {string} 10-digit phone if it longer than 10 digits, otherwise return without any unmodification
 */
function truncatePhone(phone) {
  if (phone.length > 10) {
    return [...phone].splice(0, 10).join("");
  } else {
    return phone;
  }
}
