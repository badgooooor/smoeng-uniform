import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import Home from "./pages/Home";
import OrderForm from "./pages/OrderForm";
import OrderList from "./pages/OrderList";
import theme from "./styles/theme";
import Settings from "./pages/Settings";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/neworder" component={OrderForm} />
        <Route exact path="/orders" component={OrderList} />
        <Route exact path="/settings" component={Settings} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
