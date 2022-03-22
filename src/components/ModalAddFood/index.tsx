import { useRef } from "react";
import Modal from "../Modal";
import { Form } from './styles';

interface ModalAddProps {
  isOpen: boolean;
  setIsOpen: () => void;
}
export default function ModalAddFood({ isOpen, setIsOpen }: ModalAddProps) {
  const formRef = useRef();
  function handleSubmit(){
    return
  }
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>

        </Form>
      </Modal>
    </>
  );
}
