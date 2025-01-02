import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { albums } from "../data/albums";

const PhotoGallery = () => {
  const { id } = useParams(); // Get album ID from URL
  const navigate = useNavigate();
  const album = albums.find((album) => album.id === parseInt(id));

  // Handle back button to redirect to the main gallery page
  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true }); // Redirect to the main gallery
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  if (!album) {
    return <h2>Album not found!</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Center the title */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "brown",
          fontSize: "3rem",
        }}
      >
        {album.name}
      </h1>

      {/* Grid layout for photos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Responsive grid
          gap: "20px",
        }}
      >
        {album.photos.map((photo, index) => (
          <Link to={`/albums/${id}/photos/${index}`} key={index}>
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                border: "1px solid #ccc",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            />
          </Link>
        ))}
      </div>

      {/* Back to gallery button */}
      <button
        onClick={() => navigate("/")}
        style={{
          display: "flex", // Enable Flexbox
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          marginTop: "50px",
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "150px", // Optional: specify button width if necessary
          marginLeft: "auto", // Center the button horizontally
          marginRight: "auto", // Center the button horizontally
        }}
      >
        Back to Gallery
      </button>
    </div>
  );
};

export default PhotoGallery;
