import { useSelector } from "react-redux";
import { useState } from "react";
import OpenModalButton from "../../OpenModalButton/OpenModalButtton";
import EditPostFormModal from "../EditPostFormModal";
import DeletePostModal from "../DeletePostModal";
import CommentComponent from "../../Comments/CommentComponent/CommentComponent";
import NewCommentFormModal from "../../Comments/NewCommentFormModal/NewCommentFormModal";
import './PostComponent.css'
import LikeComponent from "../../Likes/LikeComponent";

function PostComponent({ post, userId, theme, showButtons }) {
    const user = useSelector((state) => state.session.user);
    const comments = post?.Comments;

    const [showComments, setShowComments] = useState(false);

    const toggleShowComments = () => {
        if (showComments === true) {
            setShowComments(false)
        } else {
            setShowComments(true)
        }
    }

    return (
        <>
            <h1>{post?.title}</h1>
            <div
                className="postBox"
                style={{
                    backgroundColor: theme?.bgColor,
                    color: theme?.textColor,
                    borderStyle: theme?.borderStyle,
                    borderColor: theme?.borderColor,
                    borderWidth: `${theme?.borderSize}px`,
                    borderRadius: `${theme?.borderRadius}px`,
                    fontSize: `${theme?.textSize}px`,
                    fontFamily: `${theme?.font}, serif, sans-serif`,
                    boxShadow: `${theme?.shadowOffsetX}px ${theme?.shadowOffsetY}px ${theme?.shadowBlur}px ${theme?.shadowColor} ${theme?.shadowInset ? 'inset' : ''}`
                }}
            >
                <p style={{ margin: `${theme?.borderRadius / 3}px` }}>{post?.body}</p>
            </div>
            {showButtons && user?.id !== undefined &&
                <OpenModalButton
                    buttonText="Add Comment"
                    modalComponent={<NewCommentFormModal postId={post.id} userId={userId} setShowComments={setShowComments} />}
                />
            }
            {showButtons && comments?.length > 0 &&
                <>
                    {showComments === true ?
                        <button onClick={toggleShowComments}>Hide Comments</button>
                        :
                        <button onClick={toggleShowComments}>Show Comments</button>
                    }
                </>
            }
            {showButtons && post?.userId === user?.id &&
                <>
                    <OpenModalButton
                        buttonText="Edit Post"
                        modalComponent={<EditPostFormModal post={post} userId={userId} propTheme={theme} />}
                    />
                    <OpenModalButton
                        buttonText="Delete Post"
                        modalComponent={<DeletePostModal post={post} userId={userId} />}
                    />
                </>
            }
            <LikeComponent user={user} element={post} post={post} elementType={'post'} />
            {showButtons && comments?.length > 0 && showComments === true &&
                <div>
                    {post.Comments.map(comment => (
                        <div key={comment.id}><CommentComponent comment={comment} userId={userId} post={post} /></div>
                    ))}
                </div>
            }
        </>
    )
}

export default PostComponent;
