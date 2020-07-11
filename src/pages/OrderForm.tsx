import * as React from "react";
import { Formik, Form, Field, FieldArray } from 'formik';
import Layout from "../containers/Layout"
import { Select } from 'material-ui-formik-components/Select'
import { TextField } from "material-ui-formik-components/TextField";
import { Button, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface OrderFormValue {
  status: string;
  orders: Array<Object>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function OrderForm() {
  const classes = useStyles();
  const initialValues: OrderFormValue = { status: "unpaid", orders: [] };

  return (
    <Layout>
      <React.Fragment>
        <h1>สร้างคำสั่งซื้อใหม่</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values, actions);
          }}
          render={({ values }) => (
            <Form>
              <FieldArray
                name="orders"
                render={arrayHelpers => (
                  <div>
                    {values.orders && values.orders.length > 0 ? (
                      values.orders.map((order, index) => (
                        <div>
                          <Grid container spacing={2} alignItems="center" key={index}>
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
                              <Field
                                name={`orders.${index}.amount`}
                                type="number"
                                label="จำนวน"
                                component={TextField}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Button onClick={() => arrayHelpers.remove(index)}>
                                -
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      ))
                    ) : (
                        <></>
                      )}
                    <Button onClick={() => arrayHelpers.push('')} fullWidth>
                      เพิ่มออร์เดอร์
                    </Button>
                    <Button
                      type="submit"
                      disabled={values.orders.length == 0}
                      fullWidth
                    >
                      สั่งซื้อ
                    </Button>
                  </div>
                )}
              />
            </Form>
          )}
        />
      </React.Fragment>
    </Layout>
  )
}