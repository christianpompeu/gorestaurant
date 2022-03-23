import { useEffect, useState } from "react";
import Food from "../../components/Food";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood/index";
import ModalEditFood from "../../components/ModalEditFood";
import api from "../../services/api";
import { FoodInterface, Foods } from "../../types";
import { FoodsContainer } from "./styles";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [foods, setFoods] = useState<Foods>();

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get("/foods");
      const updatedFoods = foods;
      updatedFoods?.foods.push(response.data);
      setFoods(updatedFoods);
    }
    loadFoods();
    console.log(foods);
  }, []);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  async function handleAddFood(food: FoodInterface) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      const updatedFoods = foods;
      updatedFoods?.foods.push(response.data);
      setFoods(updatedFoods);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodInterface) {
    try {
      const foodUpdated = await api.put(`/foods/${foods?.edditingFood.id}`, {
        ...foods?.edditingFood,
        ...food,
      });

      const updatedFoods = foods;
      const foodsUpdated = updatedFoods?.foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );
      updatedFoods!.foods = foodsUpdated as FoodInterface[];
      setFoods(updatedFoods);
    } catch (err) {
      console.log(err);
    }
  }

  function handleDeleteFood() {
    return;
  }

  function handleEditFood() {
    return;
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        handleUpdateFood={handleUpdateFood}
        editingFood={foods?.edditingFood as FoodInterface}
      />
      <FoodsContainer data-testid="foods-list">
        {foods?.foods &&
          foods?.foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
