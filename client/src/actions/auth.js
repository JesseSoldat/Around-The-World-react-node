import axios from 'axios';

export const register = (_id, token) => ({
  type: 'REGISTER',
  _id,
  token
});

export const startRegister = (username, email, password) => {
  const user = {username, email, password};

  return async (dispatch) => {
    
    try {
      const res = await axios.post('auth/register', user);
      const { data: { _id, tokens } } = res;
      const token = tokens[0].token;
      
      localStorage.setItem('user', JSON.stringify({_id, token}));
      dispatch(register(_id, token));
    } catch(err) {
      console.log('startRegister', err);             
    }
  }
}

export const login = (_id, token) => ({
  type: 'LOGIN',
  _id,
  token
});

export const startLogin = (email, password) => {
  const user = { email, password };
  return async (dispatch) => {
    try {
      const res = await axios.post('auth/login', user);
      const { data: { _id, tokens } } = res;
      const token = tokens[0].token;

      localStorage.setItem('user', JSON.stringify({_id, token}));   
      dispatch(login(_id, token));
    } catch (err) {
      console.log('startLogin', err); 
    }
  }
}