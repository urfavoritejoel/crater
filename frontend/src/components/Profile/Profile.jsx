import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserPagesThunk } from "../../redux/pages";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const page = useSelector((state) => state.pages.byUser[user.id]["0"])

    useEffect(() => {
        dispatch(getCurrentUserPagesThunk(user.id));
    }, [dispatch, user.id]);

    if (!page) return <h1>...</h1>

    return (
        <div>
            <button onClick={() => navigate(`../pages/${page.id}`)}>View your page</button>
        </div>
    )
}

export default Profile;
