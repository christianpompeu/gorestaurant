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
