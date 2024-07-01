import { Modal, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";

const WrongModal:React.FC = (  ) => {
    return(
        <Modal>
            <ModalHeader>Header</ModalHeader>
            <ModalBody>Body</ModalBody>
            <ModalFooter>Footer</ModalFooter>
        </Modal>
    )
}

export default WrongModal;