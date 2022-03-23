import { Form } from "./styles";
import { FiCheckSquare } from "react-icons/fi";
import Input from "../Input";
import Modal from "../Modal";
import { ModalEditProps, FoodInterface } from "../../types";
import { useRef } from "react";

export default function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}: ModalEditProps) {
  const formRef = useRef(null);

  async function handleSubmit(data: FoodInterface) {
    handleUpdateFood(data);
    setIsOpen();
  }

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o Link aqui" icon="" />
          <Input name="name" placeholder="Ex: Moda Italiana" icon="" />
          <Input name="price" placeholder="Ex: 19.90" icon="" />
          <Input name="description" placeholder="Descrição" icon="" />
          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    </>
  );
}
