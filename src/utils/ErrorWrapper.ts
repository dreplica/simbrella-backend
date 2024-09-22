import { errorModel } from "../db/models";

const handleError = (error: unknown) => {
  const standardError = error as Error;
  return {
    message: (standardError as Error).message || "An error occurred.",
  };
};

const errorLogger = async (err: unknown, errorMessage = "An error occurred.") => {
  const error = err as Error;
  console.error(error);

  try {
    const errorDocument = await errorModel.create({
      message: errorMessage,
      errorDetails: error.stack || error.toString(),
    });
  } catch (saveError) {
    console.error("Failed to save error to database:", saveError);
  }
};

const manageError = {
  handleError,
  errorLogger,
};

export default manageError;