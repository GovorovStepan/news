function validatePassword(password) {
  const uppers = /[A-Z]/.test(password);
  const lowers = /[a-z]/.test(password);
  const numbers = /\d/.test(password); 
  const symbols = /[!@#$%^&*_]/.test(password); 
  const onlylatin = /^[A-Za-z\d!@#$%^&*_]{8,16}$/.test(password);
  return uppers && lowers && numbers && onlylatin && symbols;
}

export const passwordValidator = (rule, value, callback) => {
  if (value && !validatePassword(value)) {
    callback("Password should contain atleast one number in uppper case, one number in lower case, one digit, one special character and be atleast 8 symbols length !");
  } else {
    callback();
  }
}