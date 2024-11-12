"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPaperclip } from 'react-icons/fa';
import { extractTextFromImage, extractTitle } from '../utils/ocr';

const SearchBar = () => {
  const [query, setQuery] = useState(''); // Holds the text input or extracted title
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Stores the uploaded image file
  const [loading, setLoading] = useState(false); // Shows loading status during OCR processing
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // Stores preview URL for uploaded image
  const router = useRouter();

  // Create a preview URL for the uploaded image
  useEffect(() => {
    if (selectedImage) {
      const previewUrl = URL.createObjectURL(selectedImage);
      setImagePreviewUrl(previewUrl);
      // Clean up the preview URL when the component is unmounted or the image changes
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [selectedImage]);

  // Handles form submission for both text and image-based search
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Perform text-based search if there is a query
      router.push(`/search?query=${encodeURIComponent(query)}`);
    } else if (selectedImage) {
      // Perform image-based search if an image is uploaded
      await handleImageSearch();
    }
  };

  // Handles image selection and sets the selected image file
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected file:", file); // Log the selected file for debugging
      setSelectedImage(file);
      setQuery(''); // Clear any existing text input when an image is selected
    }
  };

  // Processes the uploaded image using OCR to extract text and identify the title
  const handleImageSearch = async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      // Extract text from the image using OCR
      const extractedText = await extractTextFromImage(selectedImage);
      setLoading(false);

      if (extractedText) {
        // Refine the extracted text to determine the probable title
        const title = extractTitle(extractedText);
        console.log("Refined Title:", title); // Log the refined title for debugging
        setQuery(title); // Set the query with the refined title
        router.push(`/search?query=${encodeURIComponent(title)}`); // Redirect to search results
      } else {
        alert("Unable to recognize text in the image.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error processing image:", error);
      alert("There was an error processing the image. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={searchBarStyle}>
      {/* Text input for manual search */}
      <input
        type="text"
        placeholder="Search movies or TV shows"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={inputStyle}
        required={!selectedImage} // Require text input if no image is uploaded
      />
      
      {/* File input for image upload */}
      <label style={iconStyle}>
        <FaPaperclip />
        <input 
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }} // Hide the actual file input, display only the icon
        />
      </label>

      {/* Submit button */}
      <button type="submit" style={buttonStyle} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Optional preview of uploaded image */}
      {imagePreviewUrl && (
        <div style={{ marginTop: '10px', maxWidth: '200px' }}>
          <Image
            src={imagePreviewUrl}
            alt="Selected for OCR"
            width={200}
            height={200}
            style={{ maxWidth: '100%', borderRadius: '4px' }}
          />
        </div>
      )}
    </form>
  );
};

// Inline styles for SearchBar components
const searchBarStyle = {
  background: 'white',
  padding: '16px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  justifyContent: 'center',
};

const inputStyle = {
  flexGrow: 1,
  padding: '8px 16px',
  border: '1px solid #ccc',
  borderRight: 'none',
  borderRadius: '4px 0 0 4px',
};

const buttonStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '0 4px 4px 0',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px',
  boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.15)',
};

const iconStyle = {
  padding: '8px',
  cursor: 'pointer',
};

export default SearchBar;
