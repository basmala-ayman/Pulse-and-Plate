import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import "../../App.css";
import "./UpdateMeal.css";
import { fetchAllProducts, updateMeal } from "../../api/ProductsAPI";

export default function UpdateMeal() {
  const [submitError, setSubmitError] = useState(null);
  const [mealNames, setMealNames] = useState([]);
  const [selectedMealName, setSelectedMealName] = useState("");
  const [selectedMealData, setSelectedMealData] = useState(null);
  const [allMeals, setAllMeals] = useState([]);

  const validationSchema = yup.object().shape({
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
    category: yup.string().required("Category is required"),
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .integer("Quantity must be an integer")
      .positive("Quantity must be positive")
      .nullable()
      .required("Quantity is required"),
  });

  useEffect(() => {
    getMealNames();
  }, []);

  const getMealNames = async () => {
    try {
      const response = await fetchAllProducts();
      const menu = response.menu;
      const meals = menu.flatMap((category) => category.items || []);
      setAllMeals(meals);
      setMealNames(meals.map((meal) => meal.name));
    } catch (error) {
      console.error("Error fetching meals: ", error);
    }
  };

  const handleMealSelect = (name) => {
    setSelectedMealName(name);
    const meal = allMeals.find((m) => m.name === name);
    if (meal) {
      setSelectedMealData(meal);
    } else {
      setSelectedMealData(null);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center update-content">
      <div className=" p-5 rounded col-11 col-sm-10 col-md-8 col-lg-6 col-xl-7 ">
        <h1 className="text-center mb-4">Update Meal</h1>

        <Form.Group className="mb-3">
          <Form.Select
            aria-label="Select a meal"
            value={selectedMealName}
            onChange={(e) => handleMealSelect(e.target.value)}
          >
            <option value="">Select a Meal</option>
            {mealNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {selectedMealData && (
          <Formik
            enableReinitialize
            initialValues={{
              description: selectedMealData.description || "",
              calories: selectedMealData.calories || "",
              price: selectedMealData.price || "",
              quantity:
                selectedMealData.quantity !== undefined
                  ? selectedMealData.quantity
                  : "",
              category: selectedMealData.category || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitError(null);
              try {
                const updatedMeal = {
                  description: values.description,
                  calories: Number(values.calories),
                  price: Number(values.price),
                  quantity:
                    values.quantity !== "" ? Number(values.quantity) : null,
                  category: values.category,
                };
                await updateMeal(updatedMeal, selectedMealName);
                alert("Meal updated successfully!");
                resetForm();
                setSelectedMealName("");
                setSelectedMealData(null);
                getMealNames();
              } catch (error) {
                setSubmitError(error.message || "Error updating meal");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
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

                <Form.Group className="mb-3">
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    type="number"
                    name="calories"
                    value={formik.values.calories}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.calories && formik.errors.calories
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.calories}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
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

                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formik.values.quantity ?? ""}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "quantity",
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.quantity && formik.errors.quantity
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.quantity}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={formik.values.category}
                    disabled
                    readOnly
                  />
                </Form.Group>

                {submitError && (
                  <div className="text-danger mb-3">{submitError}</div>
                )}

                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-100"
                >
                  {formik.isSubmitting ? "Updating..." : "Update Meal"}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
