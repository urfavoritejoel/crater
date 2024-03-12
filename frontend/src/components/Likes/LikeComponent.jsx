import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteLikeThunk, postLikeThunk } from "../../redux/likes";
import { getAllPostsThunk, getUserIdPostsThunk } from "../../redux/posts";
import { getAllCommentsThunk } from "../../redux/comments";

function LikeComponent({ user, element, elementType, post }) {
    const dispatch = useDispatch();
    const likes = element.Likes;

    let userLiked = likes?.find(like => like?.userId === user?.id);

    const toggleLiked = async () => {
        if (userLiked) {
            await dispatch(deleteLikeThunk(userLiked.id));
        } else {
            await dispatch(postLikeThunk(elementType, element.id));
        }

        await dispatch(getAllPostsThunk());
        await dispatch(getUserIdPostsThunk(post?.User.id))
    }

    return (
        <div>
            {user &&
                <>
                    {userLiked
                        ?
                        <FaHeart onClick={toggleLiked} />
                        :
                        <FaRegHeart onClick={toggleLiked} />
                    }
                </>
            }
            {!user &&
                <>
                    {likes?.length > 0 ?
                        <>
                            <FaHeart />
                        </>
                        :
                        <>
                            <FaRegHeart />
                        </>
                    }
                </>
            }
            {likes?.length > 0 ?
                <>
                    {likes.length}
                </>
                :
                <>
                    No likes
                </>
            }
        </div>
    )
}

export default LikeComponent;
