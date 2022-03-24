import { useEffect, useState } from "react";
import Food from "../../components/Food";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood/index";
import ModalEditFood from "../../components/ModalEditFood";
import api from "../../services/api";
import { FoodInterface, FoodMenu } from "../../types";
import { FoodsContainer } from "./styles";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [foodMenu, setFoodMenu] = useState<FoodMenu>();
  const [foods, setFoods] = useState<FoodInterface[]>([]);

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get("/foods");
      const loadedFoods = response.data;
      setFoods(loadedFoods);
    }
    loadFoods();
  }, []);

  console.log(foods);

  useEffect(() => {
    const newFoodMenu = {
      foods: foods,
      edditingFood: {},
      modalOpen: false,
      editModalOpen: false,
    }
    setFoodMenu(newFoodMenu as FoodMenu);
  }, [foods]);

  console.log(foodMenu);

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

      const updatedFoods = foodMenu;
      updatedFoods?.foods.push(response.data);
      setFoodMenu(updatedFoods);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodInterface) {
    try {
      const foodUpdated = await api.put(`/foods/${foodMenu?.edditingFood.id}`, {
        ...foodMenu?.edditingFood,
        ...food,
      });

      const updatedFoods = foodMenu;
      const foodsUpdated = updatedFoods?.foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );
      updatedFoods!.foods = foodsUpdated as FoodInterface[];
      setFoodMenu(updatedFoods);
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
      {/* <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        handleUpdateFood={handleUpdateFood}
        editingFood={foodMenu?.edditingFood as FoodInterface}
      /> */}
      <FoodsContainer data-testid="foods-list">
        {foodMenu?.foods &&
          foodMenu?.foods.map((food) => (
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
