import React from 'react';

import { ModalItem } from '../../hooks/modal';

import Modal from './Modal';

interface Props {
  modals: ModalItem[];
}

const ModalContainer: React.FC<Props> = ({ modals }) => {
  return (
    <>
      {modals.map((modal) => (
        <Modal key={modal.id} modal={modal} />
      ))}
    </>
  );
};

export default ModalContainer;
