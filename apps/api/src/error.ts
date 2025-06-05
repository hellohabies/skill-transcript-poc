export const ERROR_RESPONSES = {
  unauthorized: {
    statusCode: 401,
    isSuccess: false,
    error: {
      message: "Unauthorized! Invalid access token.",
    },
    data: null,
  },
  accessDenied: {
    statusCode: 403,
    isSuccess: false,
    error: {
      message: "Access Denied! You do not have permission to access this resource.",
    },
    data: null,
  },
  notFound: {
    statusCode: 404,
    isSuccess: false,
    error: {
      message: "Resource not found.",
    },
    data: null,
  },
};

export function responseError(statusCode: number, message: string, data: any = null) {
  return {
    statusCode,
    isSuccess: false,
    error: {
      message,
    },
    data,
  };
}
