import { createStore } from "redux";
import withRedux from "next-redux-wrapper";
import { auth } from '../utilities/auth.js';
import makeStore from '../utilities/makeStore';

class Index extends React.Component {
    render() {
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
}

Index = withRedux(makeStore)(Index);

export default Index;
