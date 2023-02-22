import Link from "next/link"
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

function Row({ data, onDelete }) {
  const { _id, title, category } = data;
  return (
    <tr>
      <td>{title}</td>
      <td>{category}</td>
      <td>
        {{ title } && { category } && <button className="btn btn-danger" onClick={onDelete}>
          <FaTrash className="me-2" />
        </button>}
      </td>
      <td>
        {{ title } && { category } && (
          <Link href={`/editing/${_id}`} className="btn btn-success">
            <FaPencilAlt className=" me-2" />
          </Link>
        )}
      </td>
    </tr>
  )
}
export default Row
