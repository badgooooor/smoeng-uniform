import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import Home from "./pages/Home";
import OrderForm from "./pages/OrderForm";
import OrderList from "./pages/OrderList";
import Profile from "./pages/Profile";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/neworder" component={OrderForm} />
        <Route exact path="/orders" component={OrderList} />
        <Route exact path="/profile" component={Profile} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
