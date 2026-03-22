import type { HttpStatus } from '@/types/common';

const httpStatus: HttpStatus = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  VALIDATION_ERROR: 422,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
};

export default httpStatus;
