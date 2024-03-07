

function PreviewTheme({ theme }) {
    return (
        <div
            className="postBox"
            style={{
                backgroundColor: theme?.bgColor,
                color: theme?.textColor,
                borderStyle: theme?.borderStyle,
                borderColor: theme?.borderColor,
                borderWidth: `${theme?.borderSize}px`,
                borderRadius: `${theme?.borderRadius}px`,
                fontSize: `${theme?.textSize}px`,
                fontFamily: `${theme?.font}, serif, sans-serif`,
                boxShadow: `${theme?.shadowOffsetX}px ${theme?.shadowOffsetY}px ${theme?.shadowBlur}px ${theme?.shadowColor} ${theme?.shadowInset ? 'inset' : ''}`
            }}
        >
            <p
                style={{
                    margin: `${theme?.borderRadius / 3}px`,
                }}>Preview</p>
        </div>
    )
}

export default PreviewTheme
