import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as formik from "formik";
import * as yup from "yup";
import "../../App.css";
import "./AddMeal.css";
import { addNewMeal } from "../../api/ProductsAPI"; // adjust import path

export default function AddMeal() {
  const { Formik } = formik;
  const [submitError, setSubmitError] = useState(null);
  const fileInputRef = useRef();

  const validationSchema = yup.object().shape({
    mealImage: yup
      .mixed()
      .required("Meal image is required")
      .test("fileSelected", "Please upload an image", (value) => {
        return value instanceof File;
      }),

    mealName: yup.string().required("Meal name is required"),
    description: yup.string().required("Description is required"),
    calories: yup
      .number()
      .typeError("Calories must be a number")
      .positive("Calories must be positive")
      .required("Calories are required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    category: yup
      .string()
      .required("Category is required")
      .notOneOf([""], "Category is required"),
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .integer("Quantity must be an integer")
      .positive("Quantity must be positive")
      .nullable(),
  });

  // to convert image file to base64 string
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className=" p-5 rounded  col-11 col-sm-10 col-md-8 col-lg-6 col-xl-7">
        <h1 className="text-center mb-4">Add Meal</h1>

        <Formik
          initialValues={{
            mealName: "",
            description: "",
            calories: "",
            price: "",
            category: "",
            quantity: null,
            mealImage: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            setSubmitError(null);
            try {
              // Convert image file to base64
              const base64Image = await toBase64(values.mealImage);

              const meal = {
                name: values.mealName,
                image: base64Image,
                description: values.description,
                calories: Number(values.calories),
                category: values.category,
                price: Number(values.price),
                ...(values.quantity
                  ? { quantity: Number(values.quantity) }
                  : {}),
              };

              await addNewMeal(meal);
              alert("Meal added successfully!");
              resetForm();
            } catch (error) {
              setSubmitError(error.message || "Error adding meal");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="mealName">
                <Form.Label>Meal Name</Form.Label>
                <Form.Control
                  type="text"
                  name="mealName"
                  placeholder="Enter a UNIQUE Meal Name..."
                  value={formik.values.mealName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.mealName && formik.errors.mealName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.mealName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Meal Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.description && formik.errors.description
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="calories">
                <Form.Label>Meal Calories</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  name="calories"
                  value={formik.values.calories}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.calories && formik.errors.calories}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.calories}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Meal Price</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.price && formik.errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <FloatingLabel
                controlId="floatingSelect"
                label="Categories"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Category select"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.category && formik.errors.category}
                >
                  <option value=""></option>
                  <option value="Salads">Salads</option>
                  <option value="Grilled">Grilled</option>
                  <option value="Wraps">Wraps</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.category}
                </Form.Control.Feedback>
              </FloatingLabel>

              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Meal Quantity</Form.Label>
                <Form.Control
                  type="number"
                  step="1"
                  min="1"
                  name="quantity"
                  value={formik.values.quantity ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    formik.setFieldValue(
                      "quantity",
                      value === "" ? null : Number(value)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.quantity && formik.errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mealImage">
                <Form.Label>Meal Image</Form.Label>
                <Form.Control
                  type="file"
                  name="mealImage"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "mealImage",
                      event.currentTarget.files[0]
                    );
                  }}
                  ref={fileInputRef}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.mealImage && formik.errors.mealImage
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.mealImage}
                </Form.Control.Feedback>
              </Form.Group>

              {submitError && (
                <div className="text-danger mb-3">{submitError}</div>
              )}

              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-100"
              >
                {formik.isSubmitting ? "Adding..." : "Add Meal"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
