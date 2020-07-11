import * as React from "react";
import { Formik, Form, Field, FieldArray } from 'formik';
import Layout from "../containers/Layout"
import { Select } from 'material-ui-formik-components/Select'
import { TextField } from "material-ui-formik-components/TextField";

interface OrderFormValue {
  status: string;
  orders: Array<Object>;
}

export default function OrderForm() {
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
                        <div key={index}>
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
                          <Field name={`orders.${index}.amount`} type="number" label="จำนวน" component={TextField} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                        <button type="button" onClick={() => arrayHelpers.push('')}>
                          Add order
                        </button>
                      )}
                  </div>
                )}
              />
              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          )}
        />
      </React.Fragment>
    </Layout>
  )
}