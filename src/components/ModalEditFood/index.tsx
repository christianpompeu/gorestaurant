import { Form } from "@unform/web";
import { FiCheckSquare } from "react-icons/fi";
import Input from "../Input";
import Modal from "../Modal";
import { ModalEditProps, Food } from "../../types";
import { useRef } from "react";

export default function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}: ModalEditProps) {
  const formRef = useRef(null);

  function handleSubmit(data: Food) {
    handleUpdateFood(data);
    setIsOpen();
  }

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          {/* <Input />
          <Input />
          <Input />
          <Input /> */}
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
