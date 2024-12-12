
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

// Base API URL
const API_BASE = "https://mxpertztestapi.onrender.com/api/sciencefiction";
const IMAGE_BASE = "https://ik.imagekit.io/dev24/";


const StoryPage = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchStory = async () => {
        try {
          const response = await axios.get(`${API_BASE}/${id}`);
          setStory(response.data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch story.");
          setLoading(false);
        }
      };
      fetchStory();
    }, [id]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-black text-white">
        <header className="p-6">
          <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
        </header>
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4">
            {story.Storyadvenure.Storytitle}
          </h1>
          <div className="grid grid-cols-3 gap-6">
            {/* Tab-like structure */}
            {story.Storyadvenure.content.map((contentItem, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Section {index + 1}</h2>
                <img
                  src={`${IMAGE_BASE}${contentItem.Storyimage[0]}`}
                  alt={"Story Section"}
                  className="w-full h-40 object-cover mb-4"
                />
                {contentItem.Paragraph.map((paragraph, idx) => (
                  <p key={idx} className="text-sm mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  };

  export default StoryPage