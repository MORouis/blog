import { AiOutlineSend } from 'react-icons/ai';
import settings from "../../settings";
import "../../style.scss";
import { useForm } from "react-hook-form";
import axios from "axios";

function Comments({ article, fetchData }) {
    const { _id } = article
    const handleComments = async (commentText) => {
        try {
            const res = await axios.post(`${settings.endpointUrl}/add-comment`,
                {
                    articleId: _id,
                    commentText: commentText
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            fetchData()
            
        } catch (error) {
            console.error(error)
        }
    }
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        handleComments(data.comments)
        reset()
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-grow-1 ml-4">
                <div className="input-group">
                    <input type="text" placeholder="Add a comment..." {...register('comments')} className="form-control" />
                    <button className="btn btn-secondary" >
                        <AiOutlineSend />
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Comments
