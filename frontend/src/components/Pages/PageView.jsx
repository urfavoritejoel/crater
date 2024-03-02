import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserIdPostsThunk } from "../../redux/posts";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import NewPostFormModal from "../Posts";
import "./PageView.css";

function PageView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pageId } = useParams();
    const user = useSelector((state) => state.session.user);
    const posts = useSelector((state) => state.posts.byUser[userId]);
    console.log(posts);

    useEffect(() => {
        dispatch(getUserIdPostsThunk(userId));
    }, [dispatch, userId]);

    return (
        <div className="pageContainer">
            {posts?.length === 0 &&

                <p>You don&apos;t have any posts yet, get creative!</p>
            }
            {posts?.length > 0 &&
                <div className="postContainer">
                    {posts.map(post => (
                        <div key={post.id} >
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </div>
            }
            <OpenModalMenuItem
                itemText="New Post"
                modalComponent={<NewPostFormModal />}
            />
        </div>
    )
}

export default PageView;
