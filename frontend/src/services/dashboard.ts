import { allProductTypesResponse } from "@/types/product";
import axiosInstance from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteProductProps,
  deleteProductResponse,
  getAllUsersResponse,
} from "@/types/dashboard";
import { AxiosError } from "axios";

async function getAllProducts(): Promise<allProductTypesResponse> {
  const response = await axiosInstance.get<allProductTypesResponse>(
    `product/?fields=title,price,discountPercentage,image,quantity,createdAt,id&limit=100`
  );
  return response.data;
}

export function useGetAllProducts() {
  return useQuery<allProductTypesResponse>({
    queryKey: ["dashboardAllProducts"],
    queryFn: getAllProducts,
  });
}

async function deleteProduct({
  id,
}: deleteProductProps): Promise<deleteProductResponse> {
  /*   console.log(id); */
  const response = await axiosInstance.delete<deleteProductResponse>(
    `product/${id}`
  );
  return response.data;
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation<deleteProductResponse, AxiosError, deleteProductProps>({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboardAllProducts"],
      });
      queryClient.invalidateQueries({ queryKey: ["productListHome"] });
      queryClient.invalidateQueries({
        queryKey: ["allproducts"],
        exact: false,
      });
      toast.success(data.message || "Product deleted successfully");
    },
    onError: (error) => {
      /*       console.log(error) */
      toast.error(error.message || "Product deletion failed");
    },
  });
}

async function getAllUsers() {
  const response = await axiosInstance.get<getAllUsersResponse>("users/");
  return response.data;
}

export function useGetAllUsers() {
  return useQuery<getAllUsersResponse>({
    queryKey: ["allusers"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: true,
    staleTime: 9000,
  });
}

//@ts-ignore
async function addProduct(productData) {
  const response = await axiosInstance.post(`product/`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      /* console.log(data) */
      queryClient.invalidateQueries({
        queryKey: ["dashboardAllProducts"],
      });
      queryClient.invalidateQueries({ queryKey: ["productListHome"] });
      queryClient.invalidateQueries({
        queryKey: ["allproducts"],
        exact: false,
      });
      toast.success(data.message || "Product added successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add product");
    },
  });
}

async function updateProduct(data) {
  const response = await axiosInstance.patch(``, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboardAllProducts"],
      });
      queryClient.invalidateQueries({ queryKey: ["productListHome"] });
      queryClient.invalidateQueries({
        queryKey: ["allproducts"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["productDetails"],
        exact: false,
      });
      toast.success(data.message || "Product updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update the product");
    },
  });
}
