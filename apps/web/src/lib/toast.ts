import { toast } from "sonner";
import { getErrorResponse } from "./error";

export function showErrorToast(message_en: string, message_th: string) {
  toast.error(message_en, {
    description: message_th,
  });
}

export function getErrorResponseAndShowErrorToast(error: any) {
  const parsedError = getErrorResponse(error);
  toast.error(parsedError.error.message_en, {
    description: parsedError.error.message_th,
  });
}
