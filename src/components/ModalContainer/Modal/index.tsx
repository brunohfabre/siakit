import React, { useCallback, useState, useEffect } from 'react';

import { ModalItem, useModal } from '../../../hooks/modal';

import { Container, ModalContent } from './styles';

interface Props {
  modal: ModalItem;
}

const Modal: React.FC<Props> = ({ modal }) => {
  const { removeModal } = useModal();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleRemoveModal = useCallback(() => {
    setVisible(false);

    setTimeout(() => {
      removeModal(modal.id);
    }, 300);
  }, [removeModal, modal.id]);

  return (
    <Container onClick={handleRemoveModal} visible={visible}>
      <ModalContent onClick={(e) => e.stopPropagation()} visible={visible}>
        {modal.title}

        {modal.content()}
      </ModalContent>
    </Container>
  );
};

export default Modal;
