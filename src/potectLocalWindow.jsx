// यह कोड पूरी प्रोजेक्ट के लिए localStorage, sessionStorage, window को सेफ बना देता है

if (typeof window === "undefined") {
  const fakeStorage = {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
  };
  global.localStorage = fakeStorage;
  global.sessionStorage = fakeStorage;
  global.location = { hostname: "" };
}
