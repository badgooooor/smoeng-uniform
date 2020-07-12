import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import OrderForm from "./pages/OrderForm";
import Home from "./pages/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/newOrder" component={OrderForm} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
