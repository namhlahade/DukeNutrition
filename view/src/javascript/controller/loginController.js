
const verifyLogin = (data) => {
    // Handle the response from the backend
    if (data.error) {
      setAlert({ type: 'danger', message: data.error });
    } else {
      setAlert({ type: 'success', message: data.message });
      const accessToken = data.accessToken;
      const roles = 2001; //user code
      console.log(data.accessToken);
      console.log(data.role);
      console.log(data.message);
      setAuth({ username, password, roles, accessToken });
      setUsername('');
      setPassword('');
      //redirectToHomeContent(true);
      navigate(from, { replace: true });
    }
}

const togglePersist = () => {
    setPersist(prev => !prev);
}


module.exports = {
    verifyLogin
}