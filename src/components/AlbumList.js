import React from "react";
import { Link } from "react-router-dom";
import { albums } from "../data/albums";

const AlbumList = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Center the title */}
      <h1
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "2.5rem",
          textDecoration: "underline",
          color: "brown",
        }}
      >
        Photo Gallery
      </h1>

      {/* Container for the albums */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Responsive grid
          gap: "20px",
          padding: "0 20px",
        }}
      >
        {albums.map((album) => (
          <div
            key={album.id}
            style={{
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              transition: "transform 0.3s",
            }}
          >
            <Link to={`/albums/${album.id}`} style={{ textDecoration: "none", color: "black" }}>
              <img
                src={album.photos[0]} // Display the first photo as the album cover
                alt={album.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3 style={{ marginTop: "10px" }}>{album.name}</h3> {/* Album Name */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
