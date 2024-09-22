import Joi from 'joi';
import mongoose from 'mongoose';
import { projectModel, userModel } from '../db/models';

const validationErrorCodes = {
  'string.base': 'STRING_BASE_ERROR',
  'string.empty': 'STRING_EMPTY_ERROR',
  'string.min': 'STRING_MIN_ERROR',
  'string.max': 'STRING_MAX_ERROR',
  'any.required': 'ANY_REQUIRED_ERROR',
  'string.email': 'STRING_EMAIL_ERROR',
  'any.only': 'ANY_ONLY_ERROR',
};

export const deriveValidationError = (errorResponse: Joi.ValidationError) => {
  // Map Joi error messages to custom error codes
  return errorResponse.details.map((err) => ({
    message: err.message,
    code:
      validationErrorCodes[err.type as keyof typeof validationErrorCodes] ||
      'UNKNOWN_ERROR',
  }));
};

export const setEmptyObjectValuesToNull = <T>(values: T): T => {
  const copyObject = { ...JSON.parse(JSON.stringify(values)) };
  for (let item in copyObject) {
    if (!copyObject[item]) {
      copyObject[item] = null;
    }
  }
  return copyObject;
};

export const mongooseTransaction = async <T>(
  callback: (session: mongoose.ClientSession) => T
): Promise<T> => {
  const session = await mongoose.startSession();
  session.startTransaction(); // Start the transaction
  try {
    const result = await callback(session); // Pass the session to the callback
    await session.commitTransaction(); // Commit if successful
    return result;
  } catch (error) {
    await session.abortTransaction(); // Abort transaction on error
    throw error; // Re-throw the error
  } finally {
    session.endSession(); // Clean up the session
  }
};

export const getProjectUsersWithTaskCount= async (projectId)  =>{
  try {
    const result = await userModel.aggregate([
      {
        $lookup: {
          from: 'projects', // The name of the projects collection
          localField: 'projects',
          foreignField: '_id',
          as: 'userProjects'
        }
      },
      {
        $match: {
          'userProjects._id': new mongoose.Types.ObjectId(projectId) // Match users with the specific project
        }
      },
      {
        $lookup: {
          from: 'tasks', // The name of the tasks collection
          localField: 'tasks',
          foreignField: '_id',
          as: 'userTasks'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          taskCount: {
            $size: {
              $filter: {
                input: '$userTasks',
                as: 'task',
                cond: {
                  $in: [projectId, { $ifNull: ['$$task.projects', []] }] // Default to an empty array if missing
                }
              }
            }
          }
        }
      }
    ]);

    return result;
  } catch (error) {
    console.error('Error fetching users and task counts:', error);
    throw error;
  }
}
