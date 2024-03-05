import { useSelector } from "react-redux";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import EditPostFormModal from "./EditPostFormModal";
import DeletePostModal from "./DeletePostModal";
import CommentComponent from "../Comments/CommentComponent";
import NewCommentFormModal from "../Comments/NewCommentFormModal";

function PostComponent({ post }) {
    const user = useSelector((state) => state.session.user);
    const comments = post?.Comments;

    console.log("length?", comments.length);

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
            <p>{post?.body}</p>
            {user.id !== undefined &&
                <OpenModalButton
                    buttonText="Add Comment"
                    modalComponent={<NewCommentFormModal postId={post.id} setShowComments={setShowComments} />}
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
                        modalComponent={<EditPostFormModal post={post} />}
                    />
                    <OpenModalButton
                        buttonText="Delete Post"
                        modalComponent={<DeletePostModal post={post} />}
                    />
                </>
            }
            {comments?.length > 0 && showComments === true &&
                <div>
                    {post.Comments.map(comment => (
                        <div key={comment.id}><CommentComponent comment={comment} /></div>
                    ))}
                </div>
            }
        </>
    )
}

export default PostComponent;
