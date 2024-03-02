import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPostsThunk, getCurrentUserPostsThunk } from "../../redux/posts";
import "./PageView.css";

function PageView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getCurrentUserPostsThunk(user.id));
    }, [dispatch]);

    return (
        <h1>Yo</h1>
    )
};

export default PageView;
