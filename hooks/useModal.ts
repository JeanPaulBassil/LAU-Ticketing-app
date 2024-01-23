import { useState } from "react"

const useModal = (initialState: boolean = false) => {
    const [visible, setVisible] = useState<boolean>(initialState);

    const openModal: () => void = () => {
        setVisible(true);
        
    }
    const closeModal: () => void = () => setVisible(false);

    return { visible, openModal, closeModal };
}

export default useModal;