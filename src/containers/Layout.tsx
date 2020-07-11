import * as React from 'react';
import { Container, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import NavBar from "../components/NavBar";
import Footer from '../components/Footer';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column"
    },
    body: {
      height: "90vh",
      flexGrow: 1,
    },
    footer: {
      height: "30px"
    }
  }),
);

export default function Layout(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <Container className={classes.body}>
        <Box my={2}>
          {props.children}
        </Box>
      </Container>
      <Footer className={classes.footer} />
    </div>
  )
}