// Server (SSR / build) pe localStorage aur sessionStorage nahi hote.
// Ye khali version banata hai: getItem hamesha null deta hai, baaki no-op.
// Browser me kuch nahi karta. Isse "localStorage is not defined" nahi aata.
if (typeof window === "undefined") {
  const makeStorage = () => ({
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  });

  for (const name of ["localStorage", "sessionStorage"]) {
    Object.defineProperty(globalThis, name, {
      value: makeStorage(),
      configurable: true,
      writable: true,
    });
  }
}
