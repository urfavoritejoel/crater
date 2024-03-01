import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { postSongThunk } from "../../../redux/songs";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    return (
        <div>
            <h1>Welcome to Crater</h1>
            <h3>To get started, set up your initial page, or create a theme to customize your content!</h3>
            <p>
                <button>Set up Your Page</button>
                <button onClick={() => {
                    navigate('/themes/new')
                }}>Create a Theme</button>
            </p>
        </div>
    )
}

export default Profile;
