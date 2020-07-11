import * as React from 'react';
import OrderForm from "./pages/OrderForm"
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <OrderForm />
    </ThemeProvider>
  )
}
export default App;
