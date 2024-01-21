import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  isModalVisible: boolean;
  toggleModal: () => void;
  setModalVisible: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const modalContextValue: ModalContextType = {
    isModalVisible,
    toggleModal,
    setModalVisible
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
