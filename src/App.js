import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/views/Home';
import User from './components/views/User';
import Login from './components/views/Login';
import Navigation from './components/Navigation/Navigation';
import PrivateRoute from './components/PrivateRote';
import routes from './routes/routes';
const AsyncChar = lazy(() =>
  import(
    './components/CharDetails/CharDetails' /* webpackChunkName: 'CharDetails'*/
  )
);

function App() {
  return (
    <div className='App'>
      <Navigation>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={routes.home} exact component={Home} />

            <Route path={routes.charDetails} exact component={AsyncChar} />
            <Route path={routes.login} exact component={Login} />
            <PrivateRoute path={routes.user} exact component={User} />
            <Redirect to={'/login'} />
          </Switch>
        </Suspense>
      </Navigation>
    </div>
  );
}

export default App;
