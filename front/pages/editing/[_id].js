import Layout from "@/components/Layout"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Editor } from '@tinymce/tinymce-react';

function Editing() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter()
  const { _id } = router.query;
  console.log(_id);
  
  const onEdit = async(_id) => {
    const strippedContent = content.replace(/(<([^>]+)>)/ig, "");
    const res = await fetch(`http://localhost:4000/articles/${_id}`, 
    {
      method: 'PUT',
      body: JSON.stringify({title, category, strippedContent}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    router.push('/articles')
    console.log(data)
  }

  useEffect(() => {
    if(_id){
      const fetchData = async() => {
        const res = await fetch(`http://localhost:4000/articles/${_id}`);
        const data = await res.json();
        setTitle(data.title)
        setCategory(data.category)
        setContent(data.strippedContent)
        console.log(data, 'this is the data');
      }
      fetchData()
    }
  }, [_id])
  
  return (
    <div>
      <div className="input-group mb-3">
        <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className="form-control" placeholder="Modify Your Article" aria-label="Modify Your Article" aria-describedby="button-addon2" 
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
          value={content}
          onEditorChange={setContent}
          init={{
          height: 500,
          branding: false,
          language_url: `/tinymce/langs/fr.js`,
          language: 'fr_FR',
          menubar: 'file edit view insert format tools table help',
          plugins: [
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
                   ],
          toolbar: `undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl`
          }}
          />
        <button onClick={() => onEdit(_id)} type="button" className="btn btn-success">Save</button>
    </div>
  )
}
export default Editing

Editing.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout> 
}