import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Form from '../pages/Form';
import Test from '../pages/Form/Test';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/form" exact component={Form} />
      <Route path="/form/test" exact component={Test} />
    </Switch>
  );
};

export default Routes;
