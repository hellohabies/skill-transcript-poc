import type { ErrorResponse } from "../../../api/src/schemas/response.schema";
import { showErrorToast } from "./toast";

export function getErrorResponse(error: any): ErrorResponse {
  return error.value as unknown as ErrorResponse;
}

export function handleError(error: any) {
  if (import.meta.env.NODE_ENV !== "production") {
    console.error(error);
    showErrorToast(error.toString(), "");
  }
}
