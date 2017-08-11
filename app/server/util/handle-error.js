export function handleError(req, res, next) {
  if (res.status === 500) {
    res.send('Api error');
  }

  next();
}
