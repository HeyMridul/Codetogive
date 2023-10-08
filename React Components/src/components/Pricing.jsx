import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

export default function Features() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }, 
  });

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    background: 'url("https://vinamrasharma.com/wp-content/uploads/2022/08/Screenshot-2022-08-19-at-3.22.22-PM.png") center/cover no-repeat', 
  };

  const cardStyle = {
    width: '20rem',
    height: 'auto',
    backgroundColor: '#f5f5f5', // Add a background color
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
    margin: '0 1rem',
  };

  const cardImgTopStyle = {
    width: '100%',
    height: '14rem', // Increase image height
    objectFit: 'cover',
  };

  const cardContentStyle = {
    padding: '1rem',
  };

  const buttonStyle = {
    display: 'block',
    margin: '0 auto',
    backgroundColor: '#007bff', // Change button color
    color: '#fff', // Text color
    padding: '0.5rem 1rem', // Increase padding
    borderRadius: '5px', // Rounded corners
    transition: 'background-color 0.3s ease', // Add hover effect
  };

  const listStyle = {
    listStyleType: 'disc', // Use bullet points
    paddingLeft: '1rem', // Indent list items
  };


  return (
    <animated.div style={{ ...containerStyle, ...fadeIn }}>
    <div style={containerStyle}>
      <div className="card" style={cardStyle}>
        <img
          src="https://via.placeholder.com/400x300" // Replace with your image URL
          className="card-img-top"
          alt="Basic Package"
          style={cardImgTopStyle}
        />
        <div className="card-body" style={cardContentStyle}>
          <h5 className="card-title">BASIC PACKAGE</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <ul>
            <li>Neil Armstrong</li>
            <li>Alan Bean</li>
            <li>Peter Conrad</li>
            <li>Edgar Mitchell</li>
            <li>Alan Shepard</li>
          </ul>
          <Link to="/register" className="btn btn-primary" style={buttonStyle}>
            Go somewhere
          </Link>
        </div>
      </div>

      <div className="card" style={cardStyle}>
        <img
          src="https://via.placeholder.com/400x300" // Replace with your image URL
          className="card-img-top"
          alt="Premium Package"
          style={cardImgTopStyle}
        />
        <div className="card-body" style={cardContentStyle}>
          <h5 className="card-title">PREMIUM PACKAGE</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <ul>
            <li>Neil Armstrong</li>
            <li>Alan Bean</li>
            <li>Peter Conrad</li>
            <li>Edgar Mitchell</li>
            <li>Alan Shepard</li>
          </ul>
          <Link to="/register" className="btn btn-primary" style={buttonStyle}>
            Go somewhere
          </Link>
        </div>
      </div>
    </div>
    </animated.div>
  );
}
