import { useState } from "react";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood/index";
import ModalEditFood from "../../components/ModalEditFood";
import api from "../../services/api";
import { Food, Foods } from "../../types";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [foods, setFoods] = useState<Foods>();

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  async function handleAddFood(food: Food) {
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

  async function handleUpdateFood(food: Food) {
    try {
      const foodUpdated = await api.put(`/foods/${foods?.edditingFood.id}`, {
        ...foods?.edditingFood,
        ...food,
      });

      const updatedFoods = foods;
      const foodsUpdated = updatedFoods?.foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );
      updatedFoods!.foods = foodsUpdated as Food[];
      setFoods(updatedFoods);
    } catch (err) {
      console.log(err);
    }
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
        editingFood={foods?.edditingFood as Food}
        handleUpdateFood={handleUpdateFood}
      />
    </>
  );
}

export default Dashboard;
