import PrettyError from 'pretty-error';

const pe = new PrettyError();
// pe.skip((traceLine, lineNumber) => {
//   if ((traceLine.path && traceLine.path.includes('/app/server')) || traceLine.what === 'hotApply') {
//     return false;
//   }

//   return true;
// });

export default pe;
