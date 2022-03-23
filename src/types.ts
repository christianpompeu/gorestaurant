export interface FoodInterface {
  // id: BigInt;
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export interface Foods {
  foods: FoodInterface[];
  edditingFood: FoodInterface;
  modalOpen: boolean;
  editModalOpen: boolean;
}

export interface ModalAddProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: FoodInterface) => Promise<void>;
}

export interface ModalEditProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: FoodInterface) => Promise<void>;
  editingFood: FoodInterface;
}
