import * as React from 'react';
import { Container, Box } from '@material-ui/core';

import NavBar from "../components/NavBar";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

export default function Layout(props: Props) {
  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <Box my={2}>
          {props.children}
        </Box>
      </Container>
    </React.Fragment>
  )
}