import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://mxpertztestapi.onrender.com/api/sciencefiction";
const IMAGE_BASE = "https://ik.imagekit.io/dev24/";

const HomePage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(API_BASE);
        setStories(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stories.");
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-black text-white">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold">Story Adventures</h1>
      </header>
      <main className="p-6 grid grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
          >
            <img
              src={`${IMAGE_BASE}${story.Image}`}
              alt={story.Storyadvenure.Storytitle}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                {story.Storyadvenure.Storytitle}
              </h2>
              <p className="text-sm mb-4">
                {story.Storyadvenure.content[0]?.Paragraph[0]?.substring(
                  0,
                  100
                )}
                ...
              </p>
              <Link
                to={`/story/${story._id}`}
                className="text-blue-400 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HomePage