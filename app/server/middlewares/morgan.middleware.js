import morgan from 'morgan';
import { chWarning, chError, chSuccess, chProcessing } from '<utils>/chalk';
import { padString } from '<utils>/string.helper';

export default morgan((tokens, req, res) => {
  const reqStatus = tokens.status(req, res);
  const reqContentLength = tokens.res(req, res, 'content-length');
  const reqMethod = tokens.method(req, res);
  const reqUrl = tokens.url(req, res);
  const reqTime = tokens['response-time'](req, res);

  let chStatus;

  switch (reqStatus[0]) {
    case '2':
      chStatus = chSuccess;
      break;
    case '3':
      chStatus = chWarning;
      break;
    default:
      chStatus = chError;
      break;
  }

  const chTime = reqTime < 100 ? chSuccess : chWarning;

  const contentLength = padString(reqContentLength, 8);
  const status = chStatus(reqStatus);
  const method = chProcessing(padString(reqMethod, 4));
  const time = chTime(padString(reqTime, 8));

  return [status, method, contentLength, '-', time, chTime('ms'), reqUrl].join(' ');
});
