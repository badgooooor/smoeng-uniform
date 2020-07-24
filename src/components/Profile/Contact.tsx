import * as React from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { user_store } from "../../stores/user";
import { Formik, Form, Field, FieldArray } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "material-ui-formik-components/TextField";
import { Select } from "material-ui-formik-components/Select";
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
  department: string;
  room: string;
}

const Contact = observer(() => {
  const classes = useStyles();
  const initialValues: ContactFormValue = {
    telNumber: user_store.telNumber,
    department: user_store.department,
    room: user_store.room,
  };
  const [editOn, setEditOn] = React.useState(true);

  const toggleEdit = () => setEditOn(!editOn);

  React.useEffect(() => {
    async function getUser() {
      const userData = await (
        await Axios.get(
          `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/users/${user_store.userId}`
        )
      ).data;

      user_store.updateContact(
        userData.telNumber,
        userData.department,
        userData.room
      );
    }

    getUser();
  }, []);

  return (
    <Paper>
      <Box className={classes.contact}>
        <Box className={classes.header}>
          <h2>ข้อมูลส่วนตัว</h2>
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
            <ListItem>
              <ListItemText>ภาควิชา</ListItemText>
              <ListItemText>{user_store.department}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>ห้อง</ListItemText>
              <ListItemText>{user_store.room}</ListItemText>
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
                  department: values.department,
                  room: values.room,
                }
              );

              user_store.updateContact(
                values.telNumber,
                values.department,
                values.room
              );
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
              <ListItem>
                <Field
                  required
                  name={`department`}
                  label="ภาควิชา"
                  component={TextField}
                  variant="outlined"
                />
              </ListItem>
              <ListItem>
                <Field
                  required
                  component={Select}
                  name={`room`}
                  label="ห้อง"
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                    { value: "6", label: "6" },
                    { value: "7", label: "7" },
                    { value: "8", label: "8" },
                    { value: "9", label: "9" },
                    { value: "10", label: "10" },
                  ]}
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
