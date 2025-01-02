import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { albums } from "../data/albums";
import { FaChevronLeft, FaChevronRight, FaSearchPlus, FaSearchMinus } from "react-icons/fa"; // Import zoom icons

const PhotoDetails = () => {
  const { id, photoIndex } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const album = albums.find((a) => a.id === parseInt(id));
  const currentIndex = parseInt(photoIndex);
  const photo = album?.photos[currentIndex];

  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname.includes(`/albums/${id}/photos`)) {
        navigate(`/albums/${id}`, { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [id, location.pathname, navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        goToPreviousPhoto();
      } else if (event.key === "ArrowRight") {
        goToNextPhoto();
      } else if (event.key === "+" || event.key === "=") {
        zoomIn();
      } else if (event.key === "-") {
        zoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, album, id, navigate, zoom]);

  if (!album || !photo) {
    return <h2>Photo not found!</h2>;
  }

  const goToPreviousPhoto = () => {
    const prevIndex = (currentIndex - 1 + album.photos.length) % album.photos.length;
    navigate(`/albums/${id}/photos/${prevIndex}`, { replace: true });
  };

  const goToNextPhoto = () => {
    const nextIndex = (currentIndex + 1) % album.photos.length;
    navigate(`/albums/${id}/photos/${nextIndex}`, { replace: true });
  };

  const goToAlbum = () => {
    navigate(`/albums/${id}`);
  };

  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  };

  const zoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
        <span
          onClick={goToPreviousPhoto}
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            userSelect: "none",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#007bff")}
          onMouseLeave={(e) => (e.target.style.color = "black")}
        >
          <FaChevronLeft />
        </span>

        <img
          src={photo}
          alt={`Photo ${currentIndex + 1}`}
          style={{
            width: `${zoom * 800}px`,
            height: `${zoom * 600}px`,
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ccc",
            transition: "transform 0.2s ease-in-out",
          }}
        />

        <span
          onClick={goToNextPhoto}
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            userSelect: "none",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#007bff")}
          onMouseLeave={(e) => (e.target.style.color = "black")}
        >
          <FaChevronRight />
        </span>
      </div>

      {/* Zoom Controls */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <span
          onClick={zoomOut}
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            userSelect: "none",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#007bff")}
          onMouseLeave={(e) => (e.target.style.color = "black")}
        >
          <FaSearchMinus />
        </span>
        <span
          onClick={zoomIn}
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            userSelect: "none",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#007bff")}
          onMouseLeave={(e) => (e.target.style.color = "black")}
        >
          <FaSearchPlus />
        </span>
      </div>

      <button
        onClick={goToAlbum}
        style={{
          display: "block",
          margin: "20px auto 0",
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default PhotoDetails;
