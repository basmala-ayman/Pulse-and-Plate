const URL = "http://localhost:3050/api/product";

const getToken =_=> localStorage.getItem("token");

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Fetch all users (likely admin-only)
export async function fetchAllProducts() {
  try {
    const response = await fetch(`${URL}/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch products");
    }
    // console.log(response.json());
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function addNewMeal(meal) {
  try {
    const response = await fetch(`${URL}/add-item`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(meal),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add a new meal!!");
    }

    return data;
  } catch (error) {
    console.error("Error adding a new meal:", error);
    throw error;
  }
}

export async function deleteMeal(mealName) {
  try {
    const response = await fetch(`${URL}/${encodeURIComponent(mealName)}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to delete ${mealName}!!`);
    }

    return data;
  } catch (error) {
    console.error(`Error deleting ${mealName}:`, error);
    throw error;
  }
}

export async function updateMeal(meal, mealName) {
  try {
    const response = await fetch(`${URL}/update/${mealName}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(meal),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to update meal!!`);
    }

    return data;
  } catch (error) {
    console.error(`Error updating meal:`, error);
    throw error;
  }
}
