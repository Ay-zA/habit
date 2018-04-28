export const reduceMongooseValidationError = validationError =>
  Object.values(validationError.errors).reduce((acc, error) => {
    acc.push({ path: error.path, value: error.value });
    return acc;
  }, []);

