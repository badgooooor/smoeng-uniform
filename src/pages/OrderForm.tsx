import * as React from "react";
import { Formik, Form, Field, FieldArray } from 'formik';
import Layout from "../containers/Layout"
import { Select } from 'material-ui-formik-components/Select'
import { TextField } from "material-ui-formik-components/TextField";
import { Button, Grid, IconButton, Box, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SummaryDialog from "../components/SummaryDialog";
import Product from "../types/product";

interface OrderFormValue {
  status: string;
  orders: Array<Object>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function OrderForm() {
  const classes = useStyles();
  const initialValues: OrderFormValue = { status: "unpaid", orders: [] };
  const [summaryOpen, setSummaryOpen] = React.useState(false);

  return (
    <Layout>
      <React.Fragment>
        <h2>สร้างคำสั่งซื้อใหม่</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values, actions);
            setSummaryOpen(true)
          }}
          validate={(values) => {
            let errors: Array<any> = [];

            values.orders.forEach((order: Product, index) => {
              if (!order.product) errors[index].product = true;
              if (!order.size) errors[index].size = true;
              if (!order.amount) errors[index].amount = true;
            });
            return errors;
          }}
          render={({ values, isValid }) => (
            <Form>
              <FieldArray
                name="orders"
                render={arrayHelpers => (
                  <div>
                    {values.orders && values.orders.length > 0 ? (
                      values.orders.map((order, index) => (
                        <Box p={1}>
                          <Paper>
                            <Box p={2}>
                              {index + 1}.
                          <Grid container spacing={2} alignItems="center" key={index}>
                                <Grid item xs={12} sm={4}>
                                  <Field
                                    required
                                    component={Select}
                                    name={`orders.${index}.product`}
                                    label="สินค้า"
                                    options={[
                                      { value: "เสื้อชอป", label: "เสื้อชอป" },
                                      { value: "เสื้อโปโล", label: "เสื้อโปโล" }
                                    ]}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <Field
                                    required
                                    component={Select}
                                    name={`orders.${index}.size`}
                                    label="ขนาด"
                                    options={[
                                      { value: "S", label: "S" },
                                      { value: "M", label: "M" },
                                      { value: "L", label: "L" },
                                      { value: "XL", label: "XL" }
                                    ]}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                  <Field
                                    required
                                    name={`orders.${index}.amount`}
                                    type="number"
                                    label="จำนวน"
                                    component={TextField}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={1}>
                                  <IconButton onClick={() => arrayHelpers.remove(index)}>
                                    <DeleteIcon fontSize="large" />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Box>
                          </Paper>
                        </Box>
                      ))
                    ) : (
                        <></>
                      )}
                    <Button onClick={() => arrayHelpers.push('')} fullWidth>
                      {
                        values.orders.length == 0 ? (
                          <Box display="flex" component="span" justifyContent="center">
                            <AddIcon fontSize="small" />
                            <span>เพิ่มออร์เดอร์เพื่อเริ่มการสั่งซื้อ</span>
                          </Box>
                        ) : (
                            <Box display="flex" component="span" justifyContent="center">
                              <AddIcon fontSize="small" />
                              <span>เพิ่มออร์เดอร์</span>
                            </Box>
                          )
                      }
                    </Button>
                    <Button
                      type="submit"
                      disabled={values.orders.length == 0}
                      fullWidth
                    >
                      <Box display="flex" component="span" justifyContent="center">
                        <ShoppingCartIcon fontSize="small" />
                        <span>สั่งซื้อ</span>
                      </Box>
                    </Button>
                  </div>
                )}
              />
              <SummaryDialog
                open={summaryOpen}
                onClose={() => {
                  setSummaryOpen(false);
                }}
                orders={values.orders}
              />
            </Form>
          )}
        />
      </React.Fragment>
    </Layout>
  )
}