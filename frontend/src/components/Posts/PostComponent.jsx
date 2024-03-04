import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import EditPostFormModal from "./EditPostFormModal";
import DeletePostModal from "./DeletePostModal";

function PostComponent({ post }) {
    const user = useSelector((state) => state.session.user);
    console.log("post?", post);
    return (
        <>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
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
