import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import  {AiFillHeart, AiOutlineMessage }  from 'react-icons/ai';

function Listing({ articles }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  
  return (
    <div className="container">
      <h1 className="text-center mb-4" style={{ color: '#0275d8', fontSize: '36px' }}>Articles</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <label for="cat-select">Choose By Category:</label>
        <select
          style={{ width: '40%', height: '40px', fontSize: '18px' }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(articles
            .map((a) => a.category)))
            .map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
          ))}
        </select>
      </div>
      {articles
        .filter((a) => !selectedCategory || a.category === selectedCategory)
        .map((article) => (
          <Link key={article._id} href={`listing/${article._id}`}>
            <button
              type="button"
              className="card mb-3"
              style={{ width: '80%', margin: '0 auto' }}
            >
            <div className="card-body">
              <h5 className="card-title" style={{ color: '#0275d8', fontSize: '24px' }}>{article.title}</h5>
              <p className="card-text" style={{ color: '#333', fontSize: '18px' }}>{article.category}</p>
              <p className="card-text" style={{ color: '#333', fontSize: '18px' }}>{article.strippedContent}</p>
              <AiFillHeart /> {article.totalLikes}
              <AiOutlineMessage size={24} color="#333"/> {article.totalComments}
            </div>
          </button>
          </Link>
        ))}
    </div>
  );
}
export default Listing;

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:4000/articles`);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      articles: data,
    },
  };
}

Listing.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout> 
}