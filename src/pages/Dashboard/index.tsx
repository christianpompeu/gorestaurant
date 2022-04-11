import { useEffect, useState } from "react";
import Food from "../../components/Food/index";
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

  useEffect(() => {
    const newFoodMenu = {
      foods: foods,
      edditingFood: {},
      modalOpen: false,
      editModalOpen: false,
    };
    setFoodMenu(newFoodMenu as FoodMenu);
  }, [foods]);

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
      setFoods([...foods, response.data]);

      const updatedFoodMenu = foodMenu;
      updatedFoodMenu!.foods = foods;
      setFoodMenu(updatedFoodMenu);
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

      // const foodsUpdated = foods.map((f) =>
      //   f.id !== foodUpdated.data.id ? f : foodUpdated.data
      // );
      // setFoods(foodsUpdated);
      setFoods(
        foods.map((f) => (f.id !== foodUpdated.data.id ? f : foodUpdated.data))
      );

      const updatedFoodMenu = foodMenu;
      updatedFoodMenu!.foods = foods;
      setFoodMenu(updatedFoodMenu);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(foodId: number) {
    await api.delete(`/foods/${foodId}`);
    const updatedFoods = foods.filter((food) => food.id !== foodId);
    setFoods(updatedFoods);
    const updatedFoodMenu = foodMenu;
    updatedFoodMenu!.foods = updatedFoods;
    setFoodMenu(updatedFoodMenu);
  }

  function handleEditFood(food: FoodInterface) {
    const editedFoodMenu = foodMenu;
    editedFoodMenu!.edditingFood = food;
    editedFoodMenu!.editModalOpen = true;
    setEditModalOpen(editedFoodMenu!.editModalOpen);
    setFoodMenu(editedFoodMenu);
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
        editingFood={foodMenu?.edditingFood as FoodInterface}
      />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
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
