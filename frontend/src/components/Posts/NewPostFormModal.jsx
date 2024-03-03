import { useState } from "react";
import { createPostThunk } from "../../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

const NewPostFormModal = (userId) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // Temporary consts until later features implemented
    const themeId = 1;
    const postType = "update";
    const pinned = false;
    const commentsDisabled = false;

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const newPost = {
            userId: user.id,
            themeId,
            postType,
            title,
            body,
            pinned,
            commentsDisabled,
        }

        const res = await dispatch(createPostThunk(newPost))

        if (!res.id) {
            setValidationErrors(res);
            console.log(validationErrors);
        } else {
            closeModal();
        }
    }

    return (
        <div className="pageContainer">
            <div className="header">
                <h1>New Post</h1>
            </div>
            <form onSubmit={handleSubmit} className="formContainer">
                <label>Title:
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <label>Post Content:
                    <textarea
                        placeholder="Give us an update..."
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )

};

export default NewPostFormModal;
