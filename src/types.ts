export interface Food {
  id: BigInt;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export interface Foods {
  foods: Food[];
  edditingFood: Food;
  modalOpen: boolean;
  editModalOpen: boolean;
}

export interface ModalAddProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Food) => Promise<void>;
}

export interface ModalEditProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: Food) => Promise<void>;
  editingFood: Food;
}