// यह कोड पूरी प्रोजेक्ट के लिए localStorage को सेफ बना देता है
if (typeof window === "undefined") {
  global.localStorage = {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
  };
}
