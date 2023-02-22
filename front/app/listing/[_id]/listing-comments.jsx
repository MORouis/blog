import axios from 'axios';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import settings from '../../settings';

function ListingComments({ comments, setComments, fetchData }) {
  
  const onDeleteComment = async (_id) => {
    try {
      const res = await axios.delete(`${settings.endpointUrl}/comments/${_id}`)
      setComments(comments?.filter(comment => comment._id !== _id))
      console.log('comment deleted');
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const onEditComment = async (newComment) => {
    try {
      const res = await axios.put(`${settings.endpointUrl}/comments/${_id}`, newComment)
      console.log('comment edited');
      fetchData()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {comments?.map(comment => (
        <div key={comment?._id} className="card mt-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <p className="card-text mb-0">{comment.commentText}</p>
            <div>
              <button onClick={() => onDeleteComment(comment._id)} className="btn btn-light-delete hover-icon-delete" >
                <FaTrash className="me-2" />
              </button>
              <button onClick={() => onEditComment(comment)} className="btn btn-light-edit hover-icon-edit">
                <FaPencilAlt className="me-2" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ListingComments;
