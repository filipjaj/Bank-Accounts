import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToPagination = <T>(
  data: T[],
  page: number,
  perPage: number
) => {
  const start = (page - 1) * perPage;
  const end = page * perPage;

  const numberOfPages = Math.ceil(data.length / perPage);

  const pagination = data.slice(start, end);
  const pageToReturn = page > numberOfPages ? numberOfPages : page;

  return {
    result: pagination,
    page: pageToReturn,
    perPage,
    numberOfPages: Math.ceil(data.length / perPage),
    total: data.length,
  };
};
