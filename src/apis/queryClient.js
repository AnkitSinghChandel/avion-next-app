import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // api fail hone ke bad 1 bar dobara retrty krega.
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // vs code dobara chrome me jane pe api nhi run hogi qki false hai.
      refetchOnReconnect: true, // Component dubara mount hua api run hogi.
      refetchOnMount: true, // add ke api fail hui to automatically ek aur try.
    },
    mutations: {
      retry: 1,
    },
  },
});
