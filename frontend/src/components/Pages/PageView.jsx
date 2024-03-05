import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserIdPostsThunk } from "../../redux/posts";
import { getAllCommentsThunk } from "../../redux/comments";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import { NewPostFormModal } from "../Posts";
import { PostComponent } from "../Posts"
import "./PageView.css";

function PageView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector((state) => state.session.user);
    const posts = useSelector((state) => state.posts.byUser[userId]);

    console.log(userId);
    useEffect(() => {
        dispatch(getUserIdPostsThunk(userId));
    }, [dispatch, userId]);

    return (
        <div className="pageContainer">
            {posts?.length === 0 && userId === `${user.id}` &&

                <p>You don&apos;t have any posts yet, get creative!</p>
            }
            {posts?.length > 0 &&
                <div >
                    {posts.map(post => (
                        <div className="postContainer" key={post.id} >
                            <PostComponent post={post} />
                        </div>
                    ))}
                </div>
            }
            <OpenModalButton
                buttonText="New Post"
                modalComponent={<NewPostFormModal />}
            />
        </div>
    )
}

export default PageView;
