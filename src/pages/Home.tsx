import * as React from "react";
import Layout from "../containers/Layout";
import { Grid } from "@material-ui/core";

export default function Home() {
  return (
    <Layout>
      <React.Fragment>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <p>สร้าง order ใหม่</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <p>ดูการสั่งซื้อ</p>
          </Grid>
        </Grid>
      </React.Fragment>
    </Layout>
  );
}
