import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deletePostThunk } from '../../redux/posts';

function DeletePostModal({ post }) {
    const dispatch = useDispatch();
    //const sessionUser = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(deletePostThunk(post.id))
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
        <div className='deletePost modalContainer'>
            <h1>Confirm Delete</h1>

            {errors.message && (
                <p className=''>{errors.message}</p>
            )}

            <p>
                Are you sure you want to remove this post?
            </p>

            <button
                className='deletePost confirmButton'
                type='button'
                onClick={handleConfirmSubmit}
            >
                Yes (Delete Post)
            </button>

            <button
                className='deletePost cancelButton'
                type='button'
                onClick={handleCancelSubmit}
            >
                No (Keep Post)
            </button>

        </div>
    )
}

export default DeletePostModal;
