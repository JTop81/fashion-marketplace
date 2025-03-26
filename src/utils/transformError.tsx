export function transformError(error: any): string {
  if (error.status === 400) {
    if (error.data.detail?.type === "UniqueViolation") {
      return "This username is already taken. Please choose a different one.";
    }
    if (error.data.detail?.type === "IntegrityViolation") {
      return "A database integrity constraint was violated.";
    }
    return "There was an issue with your request. Please check your input.";
  }

  if (error.status === 409) {
    return "A conflict occurred. This role has already been assigned.";
  }

  if (error.status === 500) {
    return "A server error occurred. Please try again later.";
  }

  return error.data?.error || "An unexpected error occurred. Please try again.";
}
