import * as React from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { user_store } from "../../stores/user";
import { Formik, Form, Field, FieldArray } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "material-ui-formik-components/TextField";
import {
  Paper,
  Box,
  colors,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { values } from "mobx";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  contact: {
    display: "flex",
    padding: "20px",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

interface ContactFormValue {
  telNumber: string;
}

const Contact = observer(() => {
  const classes = useStyles();
  const initialValues: ContactFormValue = { telNumber: "" };
  const [editOn, setEditOn] = React.useState(true);

  const toggleEdit = () => setEditOn(!editOn);

  React.useEffect(() => {
    async function getUser() {
      const userData = await (
        await Axios.get(
          `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/users/${user_store.userId}`
        )
      ).data;

      user_store.updateContact(userData.telNumber);
    }

    getUser();
  }, []);

  return (
    <Paper>
      <Box className={classes.contact}>
        <Box className={classes.header}>
          <h2>Contact</h2>
          <IconButton onClick={toggleEdit}>
            <EditIcon />
          </IconButton>
        </Box>
        {editOn ? (
          <List>
            <ListItem>
              <ListItemText>เบอร์โทรศัพท์</ListItemText>
              <ListItemText>{user_store.telNumber}</ListItemText>
            </ListItem>
          </List>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const userResponse = await Axios.put(
                `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/users/${user_store.userId}`,
                {
                  telNumber: values.telNumber,
                }
              );
              console.log(userResponse);
              user_store.updateContact(values.telNumber);
              toggleEdit();
            }}
          >
            <Form>
              <ListItem>
                <Field
                  required
                  name={`telNumber`}
                  label="เบอร์โทรศัพท์"
                  component={TextField}
                  variant="outlined"
                />
              </ListItem>
              <Button type="submit">อัปเดตข้อมูล</Button>
            </Form>
          </Formik>
        )}
      </Box>
    </Paper>
  );
});

export default Contact;
