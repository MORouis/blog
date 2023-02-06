import Link from "next/link"

function Row({ _id, title, category, strippedContent, onDelete }) {
  return (
    <tr>
      <td>{title}</td>
      <td>{category}</td>
      <td>{strippedContent}</td>
      <td>
      { {title} && {strippedContent} && {category} && <button className="btn btn-danger" onClick={onDelete}>
          <i className="bi bi-trash"></i> Delete
        </button>}
      </td>
      <td>
        <Link href={`editing/${_id}`} >
          { {title} && {strippedContent} && {category} && <button className="btn" style={{ backgroundColor: 'green', color: 'white' }}>
            <i className="bi bi-pencil"></i> Edit
          </button>}
        </Link>
      </td>
    </tr>
  )
}
export default Row
