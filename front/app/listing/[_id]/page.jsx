'use client';

import axios from "axios";
import settings from "../../settings";
import "../../style.scss";
import { useEffect, useState } from 'react';
import Share from "./shares";
import Likes from "./likes";
import Comments from "./comments";
import ListingComments from "./listing-comments";
import parse from 'html-react-parser';
import { AiFillHeart } from "react-icons/ai";

function GetArticleById({ params }) {
  const { _id } = params
  const [article, setArticle] = useState()
  const [comments, setComments] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${settings.endpointUrl}/articles/${_id}`);
      setArticle(res.data.article);
      setComments(res.data.comments);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (_id) {
      fetchData()
    }
  }, [_id]);

  return (
    <div className="containerA">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title mb-4">{article?.title}</h5>
              <p className="card-text text-muted">{article?.category}</p>
              {article?.content && <p className="card-text mt-4">{parse(article?.content)}</p>}
              <hr className="hr"/>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <span className="numbers"> {article?.totalLikes == 1 && <AiFillHeart className="like-color"/>} {article?.totalLikes == 1 && article?.totalLikes}</span>
                  <span className="numbers"> {article?.totalComments} comments</span>
                  <span className="numbers">{article?.totalShares} shares</span>
                </div>
              </div>
              <hr className="hr"/>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <span className="sep-functionalities">{article && <Likes article={article} setArticle={setArticle} />}</span>
                  <span className="sep-functionalities">{article && <Comments article={article} fetchData={fetchData} />}</span>
                  <span className="sep-functionalities">{article && <Share article={article} setArticle={setArticle} />}</span>
                </div>
              </div>
              <hr className="hr"/>
              <ListingComments comments={comments} setComments={setComments} article={article} setArticle={setArticle} fetchData={fetchData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GetArticleById
