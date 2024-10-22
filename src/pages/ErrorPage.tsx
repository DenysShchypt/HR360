import React, { FC } from 'react';

const ErrorPage: FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
        zIndex: 999,
      }}
    >
      <div style={{ width: '100%' }}>
        <div
          style={{
            height: '100vh',
            paddingBottom: '66.66666666666666%',
            position: 'relative',
            width: '100%',
          }}
        >
          <iframe
            title="gif"
            allowFullScreen={false}
            allow="autoplay"
            height="50%"
            src="https://giphy.com/embed/u2wg2uXJbHzkXkPphr/video"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            width="50%"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
