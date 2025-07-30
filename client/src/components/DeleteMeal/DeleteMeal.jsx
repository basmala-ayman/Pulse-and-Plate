import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { fetchAllProducts, deleteMeal } from "../../api/ProductsAPI";

export default function DeleteMeal() {
  const [mealNames, setMealNames] = useState([]);
  const [selectedMealName, setSelectedMealName] = useState("");

  useEffect(() => {
    getMealNames();
  }, []);

  const getMealNames = async () => {
    try {
      const response = await fetchAllProducts();
      const menu = response.menu;
      if (Array.isArray(menu)) {
        const names = menu.flatMap((category) =>
          category.items.map((item) => item.name)
        );
        setMealNames(names);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete "${selectedMealName}"?`
    );
    if (!confirm) return;

    try {
      await deleteMeal(selectedMealName);
      alert("Meal deleted successfully!");
      setSelectedMealName("");
      getMealNames();
    } catch (error) {
      console.error("Error deleting meal:", error);
      alert("Error deleting meal.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="p-5 rounded col-11 col-sm-10 col-md-8 col-lg-6 col-xl-7">
        <h1 className="text-center mb-4">Delete Meal</h1>

        <Form.Group className="mb-3">
          <Form.Select
            aria-label="Select a meal"
            value={selectedMealName}
            onChange={(e) => setSelectedMealName(e.target.value)}
          >
            <option value="">Select a Meal To Delete</option>
            {mealNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="text-center mt-4">
          <Button
            onClick={handleDelete}
            disabled={!selectedMealName}
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            Delete
          </Button>
        </Form.Group>
      </div>
    </div>
  );
}
