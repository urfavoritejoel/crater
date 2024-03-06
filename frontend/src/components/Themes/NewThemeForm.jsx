import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { postSongThunk } from "../../../redux/songs";
import "./NewThemeForm.css";

function NewThemeForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [title, setTitle] = useState('');
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [textColor, setTextcolor] = useState('#000000');
    const [textSize, setTextSize] = useState('16');
    const [font, setFont] = useState('Arial');
    const [borderStyle, setBorderStyle] = useState('solid');
    const [borderColor, setBorderColor] = useState('#000000');
    const [borderSize, setBorderSize] = useState('1');
    const [borderRadius, setBorderRadius] = useState('1');

    return (
        <div className="page-container">
            <form className="form-container">
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
                </div>
                <hr />
                <div className="section">
                    <div className="header">Background</div>
                    <label>Background Color
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
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
                            onChange={(e) => setTextcolor(e.target.value)}
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
                            <option value={'timesNewRoman'}>Times New Roman</option>
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
            </form>
            <div>
                <h2>Preview Post:</h2>
                <div
                    className="preview-post-box"
                    style={{
                        backgroundColor: bgColor,
                        color: textColor,
                        borderStyle: borderStyle,
                        borderColor: borderColor,
                        borderWidth: `${borderSize}px`,
                        borderRadius: `${borderRadius}px`,
                        fontSize: `${textSize}px`,
                        fontFamily: `${font}, serif, sans-serif`,
                    }}>
                    <p
                        style={{
                            margin: `${borderRadius / 3}px`,
                        }}>Preview</p>
                </div>
            </div>
        </div>
    )
}

export default NewThemeForm;
