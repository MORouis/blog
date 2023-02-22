'use client';

import { useEffect } from "react"
import { Editor } from '@tinymce/tinymce-react';
import settings from "../../settings";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


function EditingArticle({ params }) {
  const { _id } = params
  const router = useRouter()

  const onEditArticle = async (formData) => {
    try {
      const res = await axios.put(`${settings.endpointUrl}/articles/${_id}`, formData)
      router.push('/articles')
    } catch (error) {
      console.error(error);
    }
  }

  const schema = yup.object().shape({
    title: yup.string(),
    category: yup.string(),
    content: yup.string(), //should i change the type of content ?
  })

  const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const title = watch('title');
  const category = watch('category');
  const content = watch('content');

  useEffect(() => {
    if (_id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${settings.endpointUrl}/articles/${_id}`);
          const { title, category, content } = res.data.article
          setValue('title', title);
          setValue('category', category);
          setValue('content', content);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData()
    }
  }, [_id, setValue])

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit(onEditArticle)}>
        <input type="text" placeholder="Title..." {...register('title')} defaultValue={title} className="form-control" />
        <span>{errors.title?.message}</span>
        <input type="text" placeholder="Category..." {...register('category')} defaultValue={category} className="form-control" />
        <span>{errors.category?.message}</span>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <Editor
              value={field.value}
              onEditorChange={field.onChange}
              init={{
                height: 400,
                branding: false,
                language_url: `/tinymce/langs/fr.js`,
                language: 'fr_FR',
                menubar:
                  'file edit view insert format tools table help',
                plugins: [
                  'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
                ],
                toolbar: `undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl`
              }}
            />
          )}
        />
        <span>{errors.content?.message}</span>
        <input type='submit' className="btn btn-success" value="Save" />
      </form>
    </div>
  )
}
export default EditingArticle
