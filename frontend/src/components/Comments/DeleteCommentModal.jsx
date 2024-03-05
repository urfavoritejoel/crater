import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteCommentThunk } from '../../redux/comments';

function DeleteCommentModal({ commentId }) {
    console.log("??", commentId);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(deleteCommentThunk(commentId, user.id))
            .then(closeModal)
            .catch(async (res) => {
                //const data = await res.json();
                if (res && res.errors) {
                    setErrors(res.errors);
                }
            });
    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };


    return (
        <div className='deleteComment modalContainer'>
            <h1>Confirm Delete Comment</h1>

            {errors.message && (
                <p className=''>{errors.message}</p>
            )}

            <p>
                Are you sure you want to remove this comment?
            </p>

            <button
                className='deleteComment confirmButton'
                type='button'
                onClick={handleConfirmSubmit}
            >
                Yes (Delete Comment)
            </button>

            <button
                className='deleteComment cancelButton'
                type='button'
                onClick={handleCancelSubmit}
            >
                No (Keep Comment)
            </button>

        </div>
    )
}

export default DeleteCommentModal;
