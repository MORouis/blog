import Layout from "@/components/Layout"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import  {AiFillHeart, AiOutlineHeart, AiOutlineSend}  from 'react-icons/ai';
import { BsFillShareFill } from "react-icons/bs";

function listingId() {
  const [article, setArticle] = useState({});
  const [like, setLike] = useState(false)
  const [comment, setComment] = useState('')
  const router = useRouter()
  const { _id } = router.query;
  console.log(_id);

  const handleComments = async () => {
    const response = await fetch(`http://localhost:4000/articles/${_id}/increment_comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const updatedComments = await response.json()
      setArticle(updatedComments)
      setComment('');
    }
  }

  const handleLikes = async () => {
    setLike(!like)
    const response = await fetch(`http://localhost:4000/articles/${_id}/increment_likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const updatedLikes = await response.json()
      setArticle(updatedLikes)
    }
  }
  
  useEffect(() => {
    if(_id){
      const fetchData = async() => {
        const res = await fetch(`http://localhost:4000/articles/${_id}`);
        const article = await res.json();
        setArticle(article);
        console.log(article, 'this is the data of one article');
      }
      fetchData()
    }
  }, [_id])
  
  return (
    <div className="mb-3">
      <div key={article._id} className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-primary font-weight-bold">{article.title}</h5>
          <p className="card-text text-secondary">{article.category}</p>
          <p className="card-text text-secondary text-justify">{article.strippedContent}</p>
        </div>
      </div>
      <div className="ml-3 font-weight-bold">{article.totalLikes}</div>
      <div className="d-flex align-items-center mb-3">
        <div className="input-group w-75">
          <div className="input-group-prepend">
            <button className="btn btn-outline-primary" onClick={handleLikes}>
              {like ? <AiFillHeart color="red" /> : <AiOutlineHeart color="red" />}
            </button>
          </div>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="form-control border-primary"
            placeholder="Add a comment..."
          />
          <div className="input-group-append">
            <button className="btn btn-outline-primary">
              <AiOutlineSend/>
            </button>
          </div>
          <button onClick={handleComments} className="btn btn-outline-primary ml-2">
            <BsFillShareFill />
          </button>
        </div>
      </div>
      <div>
      <p>{comment}</p>
      </div>
    </div>
  )
}
export default listingId

listingId.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout> 
}