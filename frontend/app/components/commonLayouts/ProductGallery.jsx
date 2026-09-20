"use client";

import { useState } from "react";

export default function ProductGallery({ mainImage, galleryImages, productName }) {
  const allImages = [mainImage, ...(galleryImages || []).map((g) => g.image)];
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <article className="gallery-wrap">
      <div className="img-big-wrap">
        <a href="#">
          <img src={selectedImage} alt={productName} />
        </a>
      </div>

      {allImages.length > 1 && (
        <div className="img-small-wrap d-flex mt-3" style={{ gap: "10px" }}>
          {allImages.map((img, index) => (
            <a
              key={index}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedImage(img);
              }}
              style={{
                border: selectedImage === img ? "2px solid #007bff" : "1px solid #ddd",
                borderRadius: "4px",
                overflow: "hidden",
                display: "inline-block",
              }}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                style={{ width: 60, height: 60, objectFit: "cover" }}
              />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}