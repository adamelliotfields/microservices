const disk = require('diskusage');
const { platform } = require('os');

const path = platform() === 'win32' ? 'c:' : '/';

disk.check(path, (error, info) => {
  if (error) console.error(error);

  // Same as free
  // console.log('available:', info.available);
  console.log('free:', info.free);
  console.log('total', info.total);
});
