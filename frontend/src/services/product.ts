import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { allProductTypesResponse, productDetailTypes } from "@/types/product";
/* import { toast } from "sonner"; */

interface getAllProductsProps {
  category?: string;
  sort?: string;
  price?: number[];
  page?: number;
}

async function getAllProducts(
  filters: getAllProductsProps
): Promise<allProductTypesResponse> {
  const queryParts: string[] = [];
  /* console.log(filters) */

  if (filters.category) {
    queryParts.push(`category=${encodeURIComponent(filters.category)}`);
  }

  if (filters.sort) {
    queryParts.push(`sort=${encodeURIComponent(filters.sort)}`);
  }

  if (filters.price) {
    queryParts.push(
      `price[lte]=${encodeURIComponent(filters.price.toString())}`
    );
  }

  if (filters.page) {
    queryParts.push(`page=${encodeURIComponent(filters.page)}`);
  }

  const queryString = queryParts.join("&");

  /*   console.log(queryString); // For debugging */

  const response = await axiosInstance.get<allProductTypesResponse>(
    `product/?${queryString}`
  );

  return response.data;
}

export function useGetAllProducts(filters: getAllProductsProps) {
  return useQuery<allProductTypesResponse>({
    queryKey: ["allproducts", filters],
    queryFn: () => getAllProducts(filters),
    refetchOnWindowFocus: true,
  });
}

async function getProductDetails(id: string): Promise<productDetailTypes> {
  const response = await axiosInstance.get<productDetailTypes>(`product/${id}`);
  return response.data;
}

export function useGetProductDetails(id: string) {
  return useQuery<productDetailTypes>({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
    refetchOnWindowFocus: true,
  });
}
