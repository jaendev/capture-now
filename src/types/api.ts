export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

export interface AuthToken {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
}

/**
 * Context for the route parameters.
 * @property {Object} params - The route parameters (Promise in Next.js 15+).
 * @property {string} params.id - The ID of the note.
 */
export interface RouteContext {
  params: Promise<{ id: string }>
}