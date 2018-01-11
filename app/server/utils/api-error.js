import httpStatus from 'http-status';
import { jsonStack } from './json-stack';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic, orginalError) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This i  s required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);

    this.parsedStack = jsonStack(orginalError || this);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
    orginalError
  ) {
    super(message, status, isPublic, orginalError);
  }
}

export default APIError;
