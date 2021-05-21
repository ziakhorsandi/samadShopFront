export const createHeader = (token, hasFile) => {
  let config = '';
  if (hasFile) {
    config = { 'Content-Type': 'multipart/form-data' };
  } else {
    config = { 'Content-Type': 'application/json' };
  }
  if (token) {
    config['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export const validateEmail = (emailAdress) => {
  // eslint-disable-next-line
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
};

export const dataURItoBlob = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};
