import { memo, useEffect, useState } from "react";
import { getUserIdPostsThunk, putPostThunk } from "../../../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { getUserIdThemesThunk } from "../../../redux/themes";

const EditPostFormModal = ({ post, propTheme }) => {
    let postId = post.id;
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const themes = useSelector((state) => state.themes.byUser[user.id])
    // Temporary consts until later features implemented
    const postType = "update";
    const pinned = false;
    const commentsDisabled = false;

    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [theme, setTheme] = useState(propTheme);
    const [themeTitle, setThemeTitle] = useState(propTheme.title);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getUserIdThemesThunk(user.id));
    }, [dispatch, user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const updatedPost = {
            themeId: theme.id,
            postType,
            title,
            body,
            pinned,
            commentsDisabled,
        }

        const res = await dispatch(putPostThunk(updatedPost, postId, user.id));

        if (res.errors) {
            setValidationErrors(res.errors);
        } else {
            await dispatch(getUserIdPostsThunk(user.id));
            setHasSubmitted(false);
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
                <label>Theme:
                    <select
                        name="theme"
                        value={themeTitle}
                        onChange={(e) => {
                            setTheme(themes.find(theme => theme.title === e.target.value));
                            setThemeTitle(e.target.value);
                        }}>
                        {themes?.map(theme => (
                            <option value={theme.title} key={theme.id}>{theme.title}</option>
                        ))}
                    </select>
                </label>
                <button onClick={handleSubmit} type="submit">Submit</button>
                <button onClick={cancelSubmit}>Cancel</button>
            </form>
        </div>
    )

};

export default memo(EditPostFormModal);
