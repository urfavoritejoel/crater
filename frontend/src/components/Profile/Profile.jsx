import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPostsThunk } from "../../redux/posts";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getAllPostsThunk());
    }, [dispatch]);

    return (
        <div>
            Hello
        </div>
    )
}

export default Profile;
