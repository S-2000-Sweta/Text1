import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import AlbumList from "./components/AlbumList";
import PhotoGallery from "./components/PhotoGallery";
import PhotoDetails from "./components/PhotoDetails";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlbumList />} />
        <Route path="/albums/:id" element={<PhotoGallery />} />
        <Route path="/albums/:id/photos/:photoIndex" element={<PhotoDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
