/*
 * Pass a number with zeros
 * Idea taken from https://stackoverflow.com/a/2998874
 */
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
}

/*
 * Translates a ##:##:##.## duration to seconds
 */
exports.duration2sec = (duration) => {
  if (duration === undefined || duration === null) 
    return null;
  let parts = duration.split(':');
  // if an input is in format mm:ss.ms then we don't calculate hours
  if (parts.length === 2)
    return parseInt(parts[0] * 60) + parseFloat(parts[1]);
  // if an input is in format ss.ms then we calculate only seconds 
  else if (parts.length === 1)
    return parseFloat(parts[0]);
  else if (parts.length === 0) 
    return null;
    
  return parseInt(parts[0] * 60 * 60) + parseInt(parts[1] * 60) + parseFloat(parts[2]);
};

/*
 * Translates a duration in seconds to various forms depending on length
 */
exports.sec2duration = (sec, fullFormat=false) => {
  if (sec === undefined || sec === null)
    return null;
  
  let hours = parseInt(sec / (60 * 60));
  sec -= hours * 60 * 60;
  let minutes = parseInt(sec / 60);
  sec  -= minutes * 60;

  // Duration in seconds to ##:##:##.## form
  if (fullFormat)
    return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(sec.toFixed(2), 5)}`;

  // If duration is less than a minute, ommit minutes part (##.## form)
  if (minutes === undefined || minutes === null || minutes === 0)
    return `${zeroPad(sec.toFixed(2), 5)}`;

  // If duration is less than 1 hour, ommit hours part (##:##.## form)
  if (hours === undefined || hours === null || hours === 0)
    return `${zeroPad(minutes, 2)}:${zeroPad(sec.toFixed(2), 5)}`;
  
  // Duration in seconds to ##:##:##.## form
  return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(sec.toFixed(2), 5)}`;
};

/*
 * Takes a timestamp and checks if it's valid written, in the mm:ss.ms format
 * Original expression taken from https://stackoverflow.com/questions/8318236/regex-pattern-for-hhmmss-time-string
 * added ms support (1 or more ms are necessary for our timestamp)
 * --- seconds and milliseconds are required in our timestamp ---
 */
exports.timeValidation = (timestamp) => {
  let valid = /^(([0-5]?\d):)?([0-5]?\d)\.(\d+)$/.test(timestamp);
  return valid;
};
