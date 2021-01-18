import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Form from '../pages/Form';
import Test from '../pages/Form/Test';
import Charts from '../pages/Charts';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/form" exact component={Form} />
      <Route path="/form/test" exact component={Test} />
      <Route path="/charts" component={Charts} />
    </Switch>
  );
};

export default Routes;
