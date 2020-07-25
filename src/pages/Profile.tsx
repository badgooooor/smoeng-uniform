import * as React from "react";
import { observer } from "mobx-react";
import { user_store } from "../stores/user";
import Layout from "../containers/Layout";
import { Grid } from "@material-ui/core";

import Avatar from "../components/Profile/Avatar";
import Contact from "../components/Profile/Contact";

const Profile = observer(() => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Avatar
            photoUrl={user_store.photoUrl}
            displayName={user_store.displayName}
            email={user_store.email}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Contact />
        </Grid>
      </Grid>
    </Layout>
  );
});

export default Profile;
