import { useState } from "react";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import api from "../../services/api";
import { Food, Foods } from "../../types";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [foods, setFoods] = useState<Foods>();

  function toggleModal() {
    setModalOpen(!modalOpen);
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
  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} />
    </>
  );
}

export default Dashboard;
