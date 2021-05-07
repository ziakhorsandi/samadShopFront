export const createHeader = (token) => {
  let config = { 'Content-Type': 'application/json' };
  if (token) {
    config['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export const validateEmail = (emailAdress) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
};
