'use client';

import { useRouter } from 'next/navigation';
import axios from "axios";
import "../style.scss";
import settings from "../settings";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Editor } from '@tinymce/tinymce-react';

function AddArticle() {
  const router = useRouter();
  const onSubmit = async (data) => {
    const { title, category, content } = data;
    try {
      const res = await axios.post(`${settings.endpointUrl}/add-article`, {
        title,
        category,
        content,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0
      });
      router.push('/articles');
    } catch (error) {
      console.error(error);
    }
  };

  const schema = yup.object().shape({
    title: yup.string().required('title is required!'),
    category: yup.string().required('category is required!'),
    content: yup.string().required('content is required!'),
  })
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="container my-5">
      <h1 className="text-center">Add Article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Title..." {...register('title')} className="form-control" />
        <span>{errors.title?.message}</span>
        <input type="text" placeholder="Category..." {...register('category')} className="form-control" />
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
        <input type='submit' className="btn btn-success" value="Submit"/>
      </form>
    </div>
  )
}
export default AddArticle