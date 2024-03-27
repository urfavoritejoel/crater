import { useEffect, useState } from "react";
import { createPostThunk, getCurrentUserPostsThunk, getUserIdPostsThunk } from "../../../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { getUserIdThemesThunk } from "../../../redux/themes";

const NewPostFormModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const themes = useSelector((state) => state.themes.byUser[user.id])
    // Temporary consts until later features implemented
    const postType = "update";
    const pinned = false;
    const commentsDisabled = false;

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [theme, setTheme] = useState('');
    const [themeTitle, setThemeTitle] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getUserIdThemesThunk(user.id));
    }, [dispatch, user.id]);

    if (themes?.length > 0 && isLoaded === false) {
        setIsLoaded(true);
        setTheme(themes[0]);
        setThemeTitle(themes[0].title);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const newPost = {
            userId: user.id,
            themeId: theme.id,
            postType,
            title,
            body,
            pinned,
            commentsDisabled,
        }

        const res = await dispatch(createPostThunk(newPost, user.id));

        if (res.errors) {
            setValidationErrors(res.errors);
        } else {
            setHasSubmitted(false);
            await dispatch(getUserIdPostsThunk(user.id));
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

export default NewPostFormModal;
