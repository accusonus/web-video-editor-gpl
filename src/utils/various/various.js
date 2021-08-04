/*
 * take the file and create the blob (for the Player component)
 */
exports.returnSource = (file) => {
  // No file is given
  if (!file) 
    return undefined;

  return window.URL.createObjectURL(file);
};

/*
 * take duration and create the default start trim (1/3) of the video
 */
exports.setDefaultStart = (duration) => {
  if (!duration)
    return undefined;

  return duration/3;
};

/*
 * take duration and create the default end trim (2/3) of the video
 */
exports.setDefaultEnd = (duration) => {
  if (!duration)
    return undefined;

  return (duration/3) *2;
};

/*
 * convert size in bytes to KB, MB, GB, etc 
 * (source: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript)
 */
exports.formatSizeWithUnits = (bytes) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (bytes === undefined || bytes === null) 
    return null;

  let l = 0, n = parseInt(bytes, 10) || 0;

  while(n >= 1024 && ++l){
    n = n/1024;
  }
  //include two decimal points and a tenths-place digit if presenting 
  //less than ten of KB or greater units
  return(n.toFixed(n < 10 && l > 0 ? 2 : 0) + ' ' + units[l]);
};

/*
 * take the file name and if it's <= 24 characters return as it is
 * if it's more than 24 characters, get the first 20 characters, add the extension and return it
 */
exports.returnFileName = (fileName) => {
  if (fileName === undefined || fileName === null) 
    return null;

  if (fileName.length <= 24)
    return fileName;

  // extract filename without the extension
  let name = fileName.split('.').slice(0, -1).join('.');

  // get the first 20 characters
  name = name. slice(0, 20);
  let extension = fileName.split('.').pop();

  // Extension is bigger than 4 characters, 
  // this means that this file has no valid extension at all
  // so return the first 24 characters of the initial fileName
  if (extension.length > 4) 
    return fileName .slice(0, 24);
  
  const finalName = name + '.' + extension;
  return finalName;
};
