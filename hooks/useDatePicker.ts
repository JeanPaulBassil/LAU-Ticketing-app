import { useState } from "react"

const useDatePicker = (initialDate: Date = new Date()) => {
    const [date, setDate] = useState<Date>(initialDate);
    const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);

    const showPicker: () => void = () => setIsPickerVisible(true);
    const hidePicker: () => void = () => setIsPickerVisible(false);
    const handleConfirm: (date: Date) => void = (date) => {
        hidePicker();
    }

    return { date, setDate, isPickerVisible, showPicker, hidePicker, handleConfirm };
}

export default useDatePicker;