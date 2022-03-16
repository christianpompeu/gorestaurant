import { useState } from "react";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }
  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
      />
    </>
  );
}

export default Dashboard;
