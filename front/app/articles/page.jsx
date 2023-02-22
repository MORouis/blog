'use client';

import Link from "next/link";
import Row from "../components/row/page";
import { use, useEffect, useState } from "react";
import axios from "axios";
import settings from "../settings";
import "../style.scss";


function Articles() {
  const [articles, setArticles] = useState([])
  
  const onDelete = async (_id) => {
    try {
      const res = await axios.delete(`${settings.endpointUrl}/articles/${_id}`)
      setArticles(articles.filter(article => article._id !== _id))
      getArticles()
    } catch (error) {
      console.error(error)
    }
  }

  const getArticles = async () => {
    try {
      const res = await axios.get(`${settings.endpointUrl}/articles`)
      setArticles(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArticles()
  })

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Articles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Category</th>
          </tr>
          {articles?.map((article) => (
            <Row
              key={article?._id}
              data={article}
              onDelete={() => onDelete(article?._id)}
            />
          ))}
        </tbody>
      </table>
      <Link href="/add-article" className="btn btn-outline-secondary float-right">
        Add Article
      </Link>
    </div>
  )
}
export default Articles
