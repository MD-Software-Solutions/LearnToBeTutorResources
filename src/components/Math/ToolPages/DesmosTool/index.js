import React from 'react';

const DesmosEmbed = () => {
    return (
        <div style={{ width: '100%', height: '90vh' }}>
            <iframe
                src="https://www.desmos.com/calculator"
                title="Desmos Calculator"
                style={{ width: '100%', height: '100%', border: 'none' }}
            />
        </div>
    );
};

export default DesmosEmbed;
