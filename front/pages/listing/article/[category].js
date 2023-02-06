import Layout from "@/components/Layout"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

function Category() {
  const [articles, setArticles] = useState([]);
  const router = useRouter()
  const { category } = router.query;
  console.log(category);

  useEffect(() => {
    const fetchData = async() => {
        const res = await fetch(`http://localhost:4000/articles/listing/article?category=${category}`);
        if (category) {
          const articles = await res.json();
          setArticles(articles);
          console.log(articles, 'this is the data of one article by category');
        } else {
          console.error(`Request failed with status code ${res.status}`);
        }
        fetchData()
      }
  }, [category])
  
  return (
    <div>
        <h1>hi</h1>
          {articles.length > 0 && articles?.map((article) => (
          <div
            key={article._id}
            type="button"
            className="card mb-3"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            >
          <div className="card-body">
            <h5 className="card-title" style={{ color: '#0275d8' }}>{article.title}</h5>
            <p className="card-text" style={{ color: '#333' }}>{article.category}</p>
            <p className="card-text" style={{ color: '#333' }}>{article.content}</p>
          </div>
        </div>
      ))}
    </div>
    )
}
export default Category

Category.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout> 
}
