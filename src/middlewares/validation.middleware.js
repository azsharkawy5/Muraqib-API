export const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    const zodError = error.errors || [{ message: 'Validation error' }];
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: zodError,
    });
  }
};
