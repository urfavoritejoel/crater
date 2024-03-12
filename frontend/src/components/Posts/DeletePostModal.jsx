import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deletePostThunk, getUserIdPostsThunk } from '../../redux/posts';

function DeletePostModal({ post }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const res = await dispatch(deletePostThunk(post.id, user.id))

        if (res.errors) {
            setErrors(res.errors);
        } else {
            await dispatch(getUserIdPostsThunk(user.id));
            closeModal();
        }
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
