import { useState } from "react"
import Layout from "@/components/Layout";
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from "next/router";

function Add_article() {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    
    const handleSubmit = async () => {
      const strippedContent = content.replace(/(<([^>]+)>)/ig, "");
      const response = await fetch(`http://localhost:4000/add_article`, {
        method: 'POST',
        body: JSON.stringify({ title, category, strippedContent, totalLikes: 0, totalComments: 0 }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      router.push('/articles')
      console.log(data, 'data submitted')
    }

  return (
    <div className="container my-5">
      <h2 className="text-center">Add Article</h2>
      <div className="input-group mb-3">
        <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className="form-control" placeholder="Title" aria-label="Title" aria-describedby="button-addon2" 
        />
      </div>
      <div className="input-group mb-3">
        <input 
        type="text" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="form-control" placeholder="Category" aria-label="Category" aria-describedby="button-addon2" 
        />
      </div>
      <Editor
          id="FIXED_ID"
          apiKey="my-api-key"
          value={content}
          onEditorChange={setContent}
          init={{
          height: 500,
          branding: false,
          menubar: 'file edit view insert format tools table help',
          plugins: [
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
                   ],
          toolbar: `undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl`
          }}
          />
      <div className="form-group d-flex flex-column">
        {/*<label htmlFor="content">Content</label>
          <textarea 
          className="form-control mb-3" 
          id="content"
          value={content} 
          onChange={(e) => setContent(e.target.value)}
          ></textarea>*/}
        <div className="d-flex justify-content-end mt-3">
          <button 
            onClick={handleSubmit} 
            className="btn btn-primary" type="button" id="button-addon2">
              Publish
          </button>
        </div>
      </div>
    </div>
  )
}
export default Add_article

Add_article.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout> 
}