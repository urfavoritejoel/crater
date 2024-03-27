import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getThemeByIdThunk, getUserIdThemesThunk, postThemeThunk, putThemeThunk } from "../../../redux/themes";
import PreviewTheme from "../PreviewTheme/PreviewTheme";

function EditThemeForm() {
    const { themeId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const theme = useSelector((state) => state.themes.byId[themeId]);
    const [title, setTitle] = useState(theme?.title);
    const [bgColor, setBgColor] = useState(theme?.bgColor);
    const [shadowOffsetX, setShadowOffsetX] = useState(theme?.shadowOffsetX);
    const [shadowOffsetY, setShadowOffsetY] = useState(theme?.shadowOffsetY);
    const [shadowBlur, setShadowBlur] = useState(theme?.shadowBlur);
    const [shadowColor, setShadowColor] = useState(theme?.shadowColor);
    const [shadowInset, setShadowInset] = useState(theme?.shadowInset);
    const [textColor, setTextColor] = useState(theme?.textColor);
    const [textSize, setTextSize] = useState(theme?.textSize);
    const [font, setFont] = useState(theme?.textFont);
    const [borderStyle, setBorderStyle] = useState(theme?.borderStyle);
    const [borderColor, setBorderColor] = useState(theme?.borderColor);
    const [borderSize, setBorderSize] = useState(theme?.borderSize);
    const [borderRadius, setBorderRadius] = useState(theme?.borderRadius);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    let previewTheme = {
        userId: user.id,
        title: title,
        bgColor,
        shadowOffsetX,
        shadowOffsetY,
        shadowBlur,
        shadowColor,
        shadowInset,
        textColor,
        textSize,
        textFont: font,
        borderStyle,
        borderColor,
        borderSize,
        borderRadius
    };

    useEffect(() => {
        dispatch(getThemeByIdThunk(themeId))
    }, [dispatch]);

    useEffect(() => {
        previewTheme = {
            userId: user.id,
            title: title,
            bgColor,
            shadowOffsetX,
            shadowOffsetY,
            shadowBlur,
            shadowColor,
            shadowInset,
            textColor,
            textSize,
            textFont: font,
            borderStyle,
            borderColor,
            borderSize,
            borderRadius
        }
    }, [user.id, title, bgColor, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor,
        shadowColor, shadowInset, textColor, textSize, font, borderStyle, borderColor,
        borderSize, borderRadius])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const updatedTheme = {
            userId: user.id,
            title,
            bgColor,
            shadowOffsetX,
            shadowOffsetY,
            shadowBlur,
            shadowColor,
            shadowInset,
            textColor,
            textSize,
            textFont: font,
            borderStyle,
            borderColor,
            borderSize,
            borderRadius
        }

        const res = await dispatch(putThemeThunk(updatedTheme, theme.id, user.id));

        if (res.errors) {
            setValidationErrors(res.errors);
        } else {
            setHasSubmitted(false);
            await dispatch(getUserIdThemesThunk(user.id));
            navigate('/profile')
        }
    }

    return (
        <div className="page-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Edit Theme</h1>
                <div className="section">
                    <div className="header">Title</div>
                    <label>Title
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    {hasSubmitted && validationErrors.title &&
                        <p>{validationErrors.title}</p>}
                </div>
                <hr />
                <div className="section">
                    <div className="header">Background and Shadow</div>
                    <label>Background Color
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                        />
                    </label>
                    <label>Shadow Horizontal Offset (Negatives allowed)
                        <input
                            type='number'
                            value={shadowOffsetX}
                            min='-100'
                            max='100'
                            onChange={(e) => setShadowOffsetX(e.target.value)}
                        />
                    </label>
                    <label>Shadow Vertical Offset (Negatives allowed)
                        <input
                            type='number'
                            value={shadowOffsetY}
                            min='-100'
                            max='100'
                            onChange={(e) => setShadowOffsetY(e.target.value)}
                        />
                    </label>
                    <label>Shadow Blur
                        <input
                            type='number'
                            value={shadowBlur}
                            min='0'
                            max='100'
                            onChange={(e) => setShadowBlur(e.target.value)}
                        />
                    </label>
                    <label>Shadow Color
                        <input
                            type="color"
                            value={shadowColor}
                            onChange={(e) => setShadowColor(e.target.value)}
                        />
                    </label>
                    <label>Shadow Inset
                        <input
                            type="checkbox"
                            checked={shadowInset}
                            onChange={(e) => setShadowInset(e.target.checked)}
                        />
                    </label>
                </div>
                <hr />
                <div className="section">
                    <div className="header">Text</div>
                    <label>Text Color
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                        />
                    </label>
                    <label>Text Size (Max 100)
                        <input
                            type='number'
                            value={textSize}
                            min='0'
                            max='100'
                            onChange={(e) => setTextSize(e.target.value)}
                        />
                    </label>
                    <label>Font
                        <select
                            name="Font"
                            value={font}
                            onChange={(e) => setFont(e.target.value)}>
                            <option value={'arial'}>Arial</option>
                            <option value={'courier'}>Courier</option>
                            <option value={'georgia'}>Georgia</option>
                            <option value={'verdana'}>Verdana</option>
                            <option value={'impact'}>Impact</option>
                            <option value={'webdings'}>Webdings (Not Recommended)</option>
                        </select>
                    </label>
                </div>
                <hr />
                <div className="section">
                    <div className="header">Border</div>
                    <label>Border Style
                        <select
                            name="borderStle"
                            value={borderStyle}
                            onChange={(e) => setBorderStyle(e.target.value)}>
                            <option value={'none'}>None</option>
                            <option value={'solid'}>Solid</option>
                            <option value={'dotted'}>Dotted</option>
                            <option value={'dashed'}>Dashed</option>
                            <option value={'double'}>Double</option>
                            <option value={'groove'}>Groove</option>
                            <option value={'ridge'}>Ridge</option>
                            <option value={'inset'}>Inset</option>
                            <option value={'outset'}>Outset</option>
                        </select>
                    </label>
                    <label>Border Color
                        <input
                            type="color"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                        />
                    </label>
                    <label>Border Size (Max 100)
                        <input
                            type='number'
                            value={borderSize}
                            min='0'
                            max='100'
                            onChange={(e) => setBorderSize(e.target.value)}
                        />
                    </label>
                    <label>Border Radius (Max 60)
                        <input
                            type='number'
                            min='0'
                            max='60'
                            value={borderRadius}
                            onChange={(e) => setBorderRadius(e.target.value)}
                        />
                    </label>
                </div>
                <button onClick={handleSubmit} type="submit">Update Theme</button>
            </form>
            <div className="previewContainer">
                <h2>Preview Post:</h2>
                <PreviewTheme theme={previewTheme} />
            </div>
        </div>
    )
}

export default EditThemeForm;
