import { isAxiosError } from "axios";
import { toast } from "sonner";

export function useErrorHandling(isError: boolean, error: unknown) {
  if (isError) {
    if (isAxiosError(error)) {
      console.log({ error });
      if (error.response) {
        const data = error.response.data;
        if (data?.status?.error_code === 429) {
          toast.error(data.status.error_message);
        } else if (error.response.status === 404) {
          toast.error(
            "The requested data could not be found. Please try again later."
          );
        } else if (error.response.status === 500) {
          toast.error("There was a server issue. Please try again later.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        if (error.code === "ERR_NETWORK") {
          toast.error("Rate limit reached try after some time");
        } else {
          toast.error(
            "An unexpected network error occurred. Please try again."
          );
        }
      }
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
}
