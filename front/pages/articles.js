import Row from "@/components/Row"
import Layout from "@/components/Layout"
import Link from "next/link"
import { useRouter } from "next/router";

function Article({articles}) {
  const router = useRouter()
  console.log(articles);
  
  const onDelete = async(_id) => {
    const res = await fetch(`http://localhost:4000/articles/${_id}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    console.log(data)
    router.reload();
  }

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Your Articles Are Here</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Content</th>
          </tr>
          {articles?.map((article) => (
            <Row
              key={article._id}
              _id={article._id}
              title={article.title}
              category={article.category}
              strippedContent={article.strippedContent}
              onDelete={() => onDelete(article._id)}
            />
          ))}
        </tbody>
      </table>
      <Link href="add_article">
        <button
          type="button"
          className="btn btn-dark"
          style={{ position: "fixed", top: "60px", right: "20px" }}
        >
          Add Article
        </button>
      </Link>
    </div>
  )
}
export default Article

export async function getServerSideProps(){
  const res = await fetch(`http://localhost:4000/articles`)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      articles : data
    }
  }
}

Article.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout> 
}