import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";

function CommentComponent({ comment, userId }) {
    const user = useSelector((state) => state.session.user);
    return (
        <>
            <p>{comment.body}</p>
            <p> - {comment.userUsername}</p>
            {user && comment.userId === user.id &&
                <>
                    <OpenModalButton
                        buttonText="Edit Comment"
                        modalComponent={<EditCommentModal comment={comment} userId={userId} />}
                    />
                    <OpenModalButton
                        buttonText="Delete Comment"
                        modalComponent={<DeleteCommentModal commentId={comment.id} userId={userId} />}
                    />
                </>
            }
        </>
    )
}

export default CommentComponent;
