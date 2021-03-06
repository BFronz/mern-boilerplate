import React from 'react';
import { Switch, Route } from "react-router-dom";
import About from "./about";
import Home from "./home";
import Login from "./RegisterLogin";
import Register from "./RegisterLogin/register.js";



function App() {
  return (
    <div>
      <Switch>
        
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/"      component={Home} />
      </Switch>
    </div>
  );
}


export default App;
