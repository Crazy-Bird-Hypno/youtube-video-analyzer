import React from 'react';

const Loader = () => {
    const loaderStyle: React.CSSProperties = {
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
    };
    
    // Keyframes for the animation need to be injected into the document head
    // This is a common pattern for CSS-in-JS without a library
    React.useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <div style={containerStyle}>
            <div style={loaderStyle}></div>
            <p style={{ marginLeft: '1rem', color: '#4A5568' }}>Analyzing video, please wait...</p>
        </div>
    );
};

export default Loader;
