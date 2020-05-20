import React from 'react';
import { Switch, Route} from "react-router-dom";
import About from "./about";
import Home from "./home";


function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />

      </Switch>
    </div>
  );
}

console.log("Front end connected");
export default App;
