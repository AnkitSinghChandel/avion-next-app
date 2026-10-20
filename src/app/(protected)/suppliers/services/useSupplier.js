import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/apis/queryKeys";
import {
  fetchAllSuppliers,
  fetchSupplierById,
  addSupplier,
  updateSupplierById,
  deleteSupplierById,
} from "../services/suppliersApi";

export const useFetchSuppliers = ({ page, limit, payload }) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.SUPPLIER.LIST, page, limit, payload],
    queryFn: () => fetchAllSuppliers({ page, limit, payload }),
  });
};

export const useFetchSupplierById = (supplierId) => {
  return useQuery({
    queryKey: QUERY_KEYS.SUPPLIER.DETAIL(supplierId),
    queryFn: () => fetchSupplierById(supplierId),
    enabled: !!supplierId, // supplierId ho tabhi API chale
  });
};

export const useAddSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: addSupplier,
    mutationFn: (payload) => addSupplier(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SUPPLIER.LIST,
      });
    },
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ supplierId, payload }) =>
      updateSupplierById(supplierId, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SUPPLIER.LIST,
      });

      queryClient.invalidateQueries({
        // yani jis team ko update kiya gaya tha, usi team id ki detail cache refresh karo ===  variables.teamId
        queryKey: QUERY_KEYS.SUPPLIER.DETAIL(variables.supplierId),
      });
    },
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supplierId) => deleteSupplierById(supplierId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SUPPLIER.LIST,
      });
    },
  });
};
