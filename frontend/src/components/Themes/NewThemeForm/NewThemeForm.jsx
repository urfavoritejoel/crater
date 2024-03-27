import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserIdThemesThunk, postThemeThunk } from "../../../redux/themes";
import "./NewThemeForm.css";
import PreviewTheme from "../PreviewTheme/PreviewTheme";

function NewThemeForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [title, setTitle] = useState('');
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [shadowOffsetX, setShadowOffsetX] = useState('0');
    const [shadowOffsetY, setShadowOffsetY] = useState('0');
    const [shadowBlur, setShadowBlur] = useState('0');
    const [shadowColor, setShadowColor] = useState('#000000');
    const [shadowInset, setShadowInset] = useState(false);
    const [textColor, setTextColor] = useState('#000000');
    const [textSize, setTextSize] = useState('16');
    const [font, setFont] = useState('Arial');
    const [borderStyle, setBorderStyle] = useState('solid');
    const [borderColor, setBorderColor] = useState('#000000');
    const [borderSize, setBorderSize] = useState('1');
    const [borderRadius, setBorderRadius] = useState('1');
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

    const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    const fontOptions = ['arial', 'courier', 'georgia', 'verdana', 'impact'];
    const borderOptions = ['none', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'];

    const getCharacter = (i) => {
        return hexCharacters[i]
    };

    const generateNewColor = () => {
        let newColor = "#"

        for (let i = 0; i < 6; i++) {
            const randomPosition = Math.floor(Math.random() * hexCharacters.length)
            newColor += getCharacter(randomPosition)
        }

        return newColor
    };

    const getRandomInt = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    const randomBool = () => {
        return Math.random() < 0.5
    }

    const randomize = () => {
        setBgColor(generateNewColor());
        setShadowOffsetX(getRandomInt(-100, 101));
        setShadowOffsetY(getRandomInt(-100, 101));
        setShadowBlur(getRandomInt(0, 21));
        setShadowColor(generateNewColor());
        setShadowInset(randomBool());
        setTextColor(generateNewColor());
        setTextSize(getRandomInt(1, 51));
        setFont(fontOptions[getRandomInt(0, fontOptions.length)]);
        setBorderStyle(borderOptions[getRandomInt(0, borderOptions.length)]);
        setBorderColor(generateNewColor());
        setBorderSize(getRandomInt(1, 51));
        setBorderRadius(getRandomInt(0, 61));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const newTheme = {
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

        const res = await dispatch(postThemeThunk(newTheme, user.id));

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
                <h1>Create a new Theme</h1>
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
                <button onClick={handleSubmit} type="submit">Create Theme</button>
            </form>
            <button onClick={randomize}>Randomize</button>
            <div className="previewContainer">
                <h2>Preview Post:</h2>
                <PreviewTheme theme={previewTheme} />
            </div>
        </div>
    )
}

export default NewThemeForm;
