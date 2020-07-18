import * as React from 'react';
import { Container, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import NavBar from "../components/NavBar";
import Footer from '../components/Footer';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100vw'
  },
  body: {
    padding: '20px 10px'
  }
}));

export default function Layout(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <Box className={classes.body}>
        {props.children}
      </Box>

    </div>
  )
}