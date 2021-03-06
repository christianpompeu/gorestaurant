import { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { FoodInterface } from "../../types";
import Input from "../Input";
import Modal from "../Modal";
import { Form } from "./styles";
import { ModalAddProps } from "../../types";

export default function ModalAddFood({
  isOpen,
  setIsOpen,
  handleAddFood,
}: ModalAddProps) {
  const formRef = useRef(null);

  async function handleSubmit(data: FoodInterface) {
    handleAddFood(data);
    setIsOpen();
  }

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" icon="" />
          <Input name="name" placeholder="Ex: Moda Italiana" icon="" />
          <Input name="price" placeholder="Ex: 19.90" icon="" />
          <Input name="description" placeholder="Descrição" icon="" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    </>
  );
}
