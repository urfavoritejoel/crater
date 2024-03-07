import { useSelector } from "react-redux";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import EditPostFormModal from "./EditPostFormModal";
import DeletePostModal from "./DeletePostModal";
import CommentComponent from "../Comments/CommentComponent";
import NewCommentFormModal from "../Comments/NewCommentFormModal";
import './PostComponent.css'

function PostComponent({ post, userId, theme }) {
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
                {post?.body}
            </div>
            {user?.id !== undefined &&
                <OpenModalButton
                    buttonText="Add Comment"
                    modalComponent={<NewCommentFormModal postId={post.id} userId={userId} setShowComments={setShowComments} />}
                />
            }
            {comments?.length > 0 &&
                <>
                    {showComments === true ?
                        <button onClick={toggleShowComments}>Hide Comments</button>
                        :
                        <button onClick={toggleShowComments}>Show Comments</button>
                    }
                </>
            }
            {post?.userId === user?.id &&
                <>
                    <OpenModalButton
                        buttonText="Edit Post"
                        modalComponent={<EditPostFormModal post={post} userId={userId} />}
                    />
                    <OpenModalButton
                        buttonText="Delete Post"
                        modalComponent={<DeletePostModal post={post} userId={userId} />}
                    />
                </>
            }
            {comments?.length > 0 && showComments === true &&
                <div>
                    {post.Comments.map(comment => (
                        <div key={comment.id}><CommentComponent comment={comment} userId={userId} /></div>
                    ))}
                </div>
            }
        </>
    )
}

export default PostComponent;
