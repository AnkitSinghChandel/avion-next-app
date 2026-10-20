"use client";
import { Provider } from "react-redux";
import { reduxStore } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function StoreProvider({ children }) {
  // return <Provider store={reduxStore}>{children}</Provider>;
  return (
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
