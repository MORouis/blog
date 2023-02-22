import axios from 'axios';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import settings from "../../settings";
import "../../style.scss";

function Likes({ article, setArticle }) {
    const {_id, totalLikes} = article
    const [like, setLike] = useState(totalLikes > 0)
    const handleLikes = async () => {
        setLike(!like)
        try {
            const res = await axios.post(`${settings.endpointUrl}/articles/${_id}/increment-likes`,
                { like: !like },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            const updatedLikes = res.data;
            setArticle(updatedLikes)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button onClick={handleLikes} className="btn btn-danger" >
                {like ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
        </div>
    )
}
export default Likes
