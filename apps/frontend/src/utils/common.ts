// Validate form
export const validateForm = (zodSchema: any, values: Record<string, any>) => {
  const result = zodSchema.safeParse(values);
  const errors: Record<string, string> = {};

  if (!result.success) {
    result.error.errors.forEach((err: any) => {
      const field = err.path[0];
      if (field) errors[field] = err.message;
    });
  }

  return errors;
};

// Base64 encoding
export const encodeToBase64 = (val: string) =>
  Buffer.from(val).toString('base64');

// Base64 decoding with error handling
export const decodeFromBase64 = (val: string) => {
  if (!val) return { error: 'Invalid base64 decoding', isError: true };

  return Buffer.from(val, 'base64').toString('utf-8');
};

// Check if the user has any of the allowed roles
export const hasCertifiedRoles = (
  userRoles: string[] | undefined,
  allowedRoles: string[],
  except?: string[],
) => {
  if (!userRoles || userRoles.length === 0) return false;

  // If 'except' is provided and user has any of those roles, return false immediately
  if (
    except &&
    except.length > 0 &&
    userRoles.some((role) => except.includes(role))
  ) {
    return false;
  }

  if (!allowedRoles || allowedRoles.length === 0) return false;

  return userRoles?.some((role) => allowedRoles.includes(role));
};
