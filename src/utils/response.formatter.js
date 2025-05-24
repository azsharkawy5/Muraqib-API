export const formatSuccess = (data, message = "Success") => ({
  success: true,
  message,
  data,
});

export const formatError = (message = "Error", errors = null) => ({
  success: false,
  message,
  errors,
});
