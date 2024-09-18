import Joi from "joi";

const validationErrorCodes = {
  "string.base": "STRING_BASE_ERROR",
  "string.empty": "STRING_EMPTY_ERROR",
  "string.min": "STRING_MIN_ERROR",
  "string.max": "STRING_MAX_ERROR",
  "any.required": "ANY_REQUIRED_ERROR",
  "string.email": "STRING_EMAIL_ERROR",
  "any.only": "ANY_ONLY_ERROR",
};

export const deriveValidationError = (errorResponse: Joi.ValidationError) => {
  // Map Joi error messages to custom error codes
  return errorResponse.details.map((err) => ({
    message: err.message,
    code:
      validationErrorCodes[err.type as keyof typeof validationErrorCodes] ||
      "UNKNOWN_ERROR",
  }));
};

export const setEmptyObjectValuesToNull = <T>(values: T): T => {
  const copyObject = {...JSON.parse(JSON.stringify(values))};
  for(let item in copyObject) {
    if (!copyObject[item]) {
      copyObject[item] = null;
    }
  }
  return copyObject;
}