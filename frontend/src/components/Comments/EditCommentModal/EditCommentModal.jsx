import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { putCommentThunk } from "../../../redux/comments";
import { getUserIdPostsThunk } from "../../../redux/posts";

const EditCommentModal = ({ comment, userId }) => {
    let commentId = comment?.id;
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [body, setBody] = useState(comment?.body);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const updatedComment = {
            body,
        }

        const res = await dispatch(putCommentThunk(updatedComment, commentId, user.id));

        if (res.errors) {
            setValidationErrors(res.errors);
        } else {
            setHasSubmitted(false);
            await dispatch(getUserIdPostsThunk(userId));
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

export default EditCommentModal;
