import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserIdThemesThunk } from "../../redux/themes";
import "./Profile.css";
import { DeleteThemeModal, PreviewTheme } from "../Themes";
import OpenModalButton from "../OpenModalButton/OpenModalButtton";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const themes = useSelector((state) => state.themes.byUser[user?.id])
    const [showThemes, setShowThemes] = useState(false);

    useEffect(() => {
        dispatch(getUserIdThemesThunk(user?.id));
    }, [dispatch, user?.id]);

    const toggleShowThemes = () => {
        if (showThemes === true) {
            setShowThemes(false)
        } else {
            setShowThemes(true)
        }
    }

    if (!user) return <h1>You must be logged in to view profile!</h1>
    if (!themes) return <h1>Loading...</h1>

    return (
        <div>
            <h1>Welcome to your Crater Profile Page</h1>
            <div className="section">
                <div className="header"><h2>Themes</h2></div>
                <button onClick={() => navigate('/themes/new')}>Create New Theme</button>
                {themes?.length > 0 &&
                    <>
                        {showThemes === true ?
                            <button onClick={toggleShowThemes}>Hide Your Themes</button>
                            :
                            <button onClick={toggleShowThemes}>Show Your Themes</button>
                        }
                    </>
                }
                {showThemes &&
                    <>
                        <h3>Your themes:</h3>
                        {themes?.map(theme => (
                            <div className="themeContainer" key={theme.id}>
                                <h3>{theme.title}</h3>
                                <PreviewTheme theme={theme} />
                                <NavLink to={`/themes/${theme.id}`}>
                                    <button>Update Theme</button>
                                </NavLink>
                                <OpenModalButton
                                    buttonText="Delete Theme"
                                    modalComponent={<DeleteThemeModal theme={theme} userId={user.id} />}
                                />
                            </div>
                        ))}
                    </>
                }
            </div>
        </div>
    )
}

export default Profile;
