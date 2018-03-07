export const checkEmail = (email) => {
  const regex = 	
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let valid = null;
  if(email.length >= 1) {
    valid = regex.test(email)
  } else {
    valid = null;
  }
  return valid;
}