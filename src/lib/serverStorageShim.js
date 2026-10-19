// if (typeof window === "undefined") {
//   const makeStorage = () => ({
//     getItem: () => null,
//     setItem: () => {},
//     removeItem: () => {},
//     clear: () => {},
//     key: () => null,
//     length: 0,
//   });

//   for (const name of ["localStorage", "sessionStorage"]) {
//     Object.defineProperty(globalThis, name, {
//       value: makeStorage(),
//       configurable: true,
//       writable: true,
//     });
//   }
// }
