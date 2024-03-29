import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserIdPostsThunk } from "../../redux/posts";
import OpenModalButton from "../OpenModalButton";
import NewPostFormModal from "../Posts/NewPostFormModal";
import PostComponent from "../Posts/PostComponent";
import "./PageView.css";
import { getAllUsersThunk } from "../../redux/users";
import NotFound from "../NotFound";
import { getUserIdThemesThunk } from "../../redux/themes";

function PageView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector((state) => state.session.user);
    const idUser = useSelector((state) => state.users.byId[userId]);
    const posts = useSelector((state) => state.posts.byUser[userId]);
    const themes = useSelector((state) => state.themes.byUser[userId]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getUserIdPostsThunk(userId));
        dispatch(getAllUsersThunk());
        dispatch(getUserIdThemesThunk(userId));
        setIsLoaded(true);
    }, [dispatch, userId]);

    if (isLoaded && !idUser) return <NotFound />

    return (
        <div className="pageContainer">
            {posts?.length === 0 && userId === `${user?.id}` &&

                <p>You don&apos;t have any posts yet, get creative!</p>
            }
            {posts?.length === 0 && !user &&

                <p>This creator doesn&apos;t have any posts yet!</p>
            }
            {posts?.length > 0 &&
                <div >
                    {posts.map(post => (
                        <div className="postContainer" key={post.id} >
                            <PostComponent post={post} userId={userId} theme={post?.Theme} showButtons={true} />
                        </div>
                    ))}
                </div>
            }
            {`${user?.id}` === userId && themes?.length > 0 &&
                <OpenModalButton
                    buttonText="New Post"
                    modalComponent={<NewPostFormModal />}
                />
            }
            {themes?.length <= 0 &&
                <div>
                    <div>
                        <button disabled='true'>New Post</button>
                    </div>
                    You must have at least one theme to create posts.
                    <button onClick={() => navigate('/themes/new')}>Create New Theme</button>
                </div>
            }
        </div>
    )
}

export default PageView;
