import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { postCommentThunk } from "../../../redux/comments";
import { getUserIdPostsThunk } from "../../../redux/posts";

const NewCommentFormModal = ({ postId, setShowComments, userId }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userUsername = user.username;

    const [body, setBody] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const newComment = {
            userId: user.id,
            userUsername,
            postId,
            body,
        }

        const res = await dispatch(postCommentThunk(newComment, postId, user.id));

        if (res.errors) {
            setValidationErrors(res.errors);
        } else {
            setHasSubmitted(false);
            await dispatch(getUserIdPostsThunk(userId));
            setShowComments(true);
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
                <h1>Add Comment</h1>
            </div>
            <form onSubmit={handleSubmit} className="formContainer">
                <label>Comment Text:
                    <textarea
                        placeholder="Comment..."
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

export default NewCommentFormModal;
