import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteThemeThunk, getUserIdThemesThunk } from '../../redux/themes';

function DeleteThemeModal({ theme, userId }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(deleteThemeThunk(theme.id, userId))

        if (res.error) {
            setErrors(res);
        } else {
            await dispatch(getUserIdThemesThunk(userId));
            closeModal();
        }
    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };


    return (
        <div className='deleteTheme modalContainer'>
            <h1>Confirm Delete</h1>

            {errors.error && (
                <p className='errors'>{errors.error}</p>
            )}

            <p>
                Are you sure you want to remove this theme?
            </p>

            <button
                className='deleteTheme confirmButton'
                type='button'
                onClick={handleConfirmSubmit}
            >
                Yes (Delete Theme)
            </button>

            <button
                className='deleteTheme cancelButton'
                type='button'
                onClick={handleCancelSubmit}
            >
                No (Keep Theme)
            </button>

        </div>
    )
}

export default DeleteThemeModal;
