import Auth from '../utilities/auth.js';

const auth = new Auth();

export default () => {
  if (typeof window !== 'undefined') {
    const isAuthenticated = auth.isAuthenticated();
    return (
      <div>
        {isAuthenticated ? (<h1>you're logged in</h1>) : <h1>you're logged out</h1>}
        {isAuthenticated ? <button onClick={auth.logout}>Logout</button> : <button onClick={auth.login}>Login</button> }
      </div>
    )
  };
  return null;
}
