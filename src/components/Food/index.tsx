import { FiEdit3, FiTrash } from "react-icons/fi";
import { Container } from "./styles";
import api from "../../services/api";
import { FoodInterface } from "../../types";

interface FoodProps{
  food: FoodInterface,
  handleEditFood: (food: FoodInterface)=>void,
}


export default function Food({food, handleEditFood}: FoodProps) {
  async function toggleAvailable() {
    const isAvailable = food.available;
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });
    
    const toggledAvailableFood = food;
    toggledAvailableFood.available = !isAvailable;
    food = toggledAvailableFood;    
  }

  function setEditingFood(){
    handleEditFood(food);
  }

  return (
    <Container>
      <header>
        <img src={food.image} alt={food.name}/>
      </header>
      {/* <section>
      </section>
      <section>

      </section> */}
    </Container>
  );
}
