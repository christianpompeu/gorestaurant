import { FiEdit3, FiTrash } from "react-icons/fi";
import { Container } from "./styles";
import api from "../../services/api";
import { FoodInterface } from "../../types";
import { useState } from "react";

interface FoodProps {
  food: FoodInterface;
  handleEditFood: (food: FoodInterface) => void;
  handleDelete: (foodId: number) => void;
}

export default function Food({
  food,
  handleEditFood,
  handleDelete,
}: FoodProps) {
  const [actualFood, setActualFood] = useState<FoodInterface>(food);
  const [actualFoodIsAvailable, setActualFoodIsAvailable] = useState(food.available)
  
  async function toggleAvailable() {
    const isAvailable = actualFoodIsAvailable;
    await api.put(`/foods/${actualFood.id}`, {
      ...actualFood,
      available: !isAvailable,
    });

    const toggledAvailableFood = actualFood;
    toggledAvailableFood.available = !isAvailable;
    setActualFood(toggledAvailableFood);
    setActualFoodIsAvailable(!isAvailable);
  }

  function setEditingFood() {
    handleEditFood(food);
  }

  return (
    <Container available={actualFoodIsAvailable}>
      <header>
        <img src={actualFood.image} alt={actualFood.name} />
      </header>
      <section className="body">
        <h2>{actualFood.name}</h2>
        <p>{actualFood.description}</p>
        <p className="price">
          R$ <b>{actualFood.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>
          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>
        <div className="availability-container">
          <p>{actualFoodIsAvailable ? "Disponível" : "Indisponível"}</p>
          <label htmlFor={`available-switch-${actualFood.id}`} className="switch">
            <input
              id={`available-switch-${actualFood.id}`}
              type="checkbox"
              checked={actualFoodIsAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${actualFood.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
