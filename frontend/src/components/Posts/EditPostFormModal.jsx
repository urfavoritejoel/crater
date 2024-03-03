import { useState } from "react";
import { getCurrentUserPostsThunk, putPostThunk } from "../../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

const EditPostFormModal = ({ post }) => {
    let postId = post.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // Temporary consts until later features implemented
    const themeId = 1;
    const postType = "update";
    const pinned = false;
    const commentsDisabled = false;

    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const updatedPost = {
            themeId,
            postType,
            title,
            body,
            pinned,
            commentsDisabled,
        }

        const res = await dispatch(putPostThunk(updatedPost, postId));

        if (res.errors) {
            setValidationErrors(res.errors);
        } else {
            setHasSubmitted(false);
            await dispatch(getCurrentUserPostsThunk(user.id))
            closeModal();
        }
    };

    const cancelSubmit = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className="pageContainer">
            <div className="header">
                <h1>Edit Post</h1>
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
                {hasSubmitted && validationErrors.title &&
                    <p>{validationErrors.title}</p>}
                <label>Post:
                    <textarea
                        placeholder="Give us an update..."
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                </label>
                {hasSubmitted && validationErrors.body &&
                    <p>{validationErrors.body}</p>}
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={cancelSubmit}>Cancel</button>
            </form>
        </div>
    )

};

export default EditPostFormModal;
