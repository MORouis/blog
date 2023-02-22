'use client';

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import { BsFillShareFill } from "react-icons/bs";
import settings from "../settings";
import "../style.scss";
import parse from 'html-react-parser';

async function getArticles() {
  try {
    const res = await axios.get(`${settings.endpointUrl}/articles`)
    return res.data
  } catch (error) {
    console.error(error);
  }
}

function GetArticles() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    try {
      getArticles().then(setArticles);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4 article-title display-4 fw-bold">Articles</h1>

      <div className="category-select-container">
        <label htmlFor="cat-select" className="form-label">Choose By Category:</label>
        <select
          className="form-select mb-4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(articles
            ?.map((a) => a.category)))
            ?.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      </div>
      {articles
        ?.filter((a) => !selectedCategory || a.category === selectedCategory)
        ?.map((article) => (
          <Link key={article._id} href={`/listing/${article._id}`} className="btn btn-light">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title article-card-title">{article?.title}</h5>
                <p className="card-text article-card-category">{article?.category}</p>
                <p className="card-text article-card-content">{parse(article?.content)}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <AiFillHeart className="likes-number mx-3" /> {article?.totalLikes}
                    <AiOutlineMessage className="comments-number mx-3" /> {article?.totalComments}
                    <BsFillShareFill className="shares-number mx-3" /> {article?.totalShares}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
export default GetArticles;
