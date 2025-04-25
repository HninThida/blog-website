import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}


const BASE_URL = import.meta.env.VITE_API_URL;
export const take=import.meta.env.VITE_LIST_COUNT
type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' |"PUT"

async function request<TResponse>(
  endpoint: string,
  method: HttpMethod,
  data?: unknown
): Promise<TResponse> {
  const token = import.meta.env.VITE_TOKEN

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const config: RequestInit = {
    method,
    headers,
  }

  if (data) {
    config.body = JSON.stringify(data)
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config)

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Something went wrong')
  }

  return res.json()
}

export function getData<TResponse>(endpoint: string) {
  return request<TResponse>(endpoint, 'GET')
}

export function postData<TResponse>(endpoint: string, data: unknown) {
  return request<TResponse>(endpoint, 'POST', data)
}

export function patchData<TResponse>(endpoint: string, data: unknown) {
  return request<TResponse>(endpoint, 'PATCH', data)
}
export function putData<TResponse>(endpoint: string, data: unknown) {
  return request<TResponse>(endpoint, 'PUT', data)
}

export function deleteData<TResponse>(endpoint: string, data?: unknown) {
  return request<TResponse>(endpoint, 'DELETE', data)
}
