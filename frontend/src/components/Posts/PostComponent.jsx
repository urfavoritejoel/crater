import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import EditPostFormModal from "./EditPostFormModal";
import DeletePostModal from "./DeletePostModal";
import { useState } from "react";

function PostComponent({ post }) {
    const user = useSelector((state) => state.session.user);

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
            {showComments === true ?
                <button onClick={toggleShowComments}>Hide Comments</button>
                :
                <button onClick={toggleShowComments}>Show Comments</button>
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
        </>
    )
}

export default PostComponent;
