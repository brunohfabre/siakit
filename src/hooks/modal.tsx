import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import ModalContainer from '@components/ModalContainer';

export interface ModalItem {
  id: string;
  title: string;
  content: () => JSX.Element;
}

interface ModalContextData {
  addModal(item: Omit<ModalItem, 'id'>): void;
  removeModal(id: string): void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const addModal = useCallback(({ title, content }: Omit<ModalItem, 'id'>) => {
    const id = uuid();

    const modal = {
      id,
      title,
      content,
    };

    setModals((state) => [...state, modal]);
  }, []);

  const removeModal = useCallback((id) => {
    setModals((state) => state.filter((modal) => modal.id !== id));
  }, []);

  return (
    <ModalContext.Provider value={{ addModal, removeModal }}>
      {children}

      <ModalContainer modals={modals} />
    </ModalContext.Provider>
  );
};

function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}

export { ModalProvider, useModal };
