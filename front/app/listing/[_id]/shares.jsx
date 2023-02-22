import { FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, LinkedinShareButton, LinkedinIcon } from "next-share";
import settings from "../../settings";
import "../../style.scss";
import axios from "axios";

function Share({ article, setArticle }) {
    const {_id} = article
    const handleShares = async () => {
        try {
            const res = await axios.post(`${settings.endpointUrl}/articles/${_id}/increment-shares`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            const updatedShares = res.data;
            setArticle(updatedShares);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="d-flex">
            <FacebookShareButton
                url={`${settings.endpointUrl}/articles/${_id}`}
                onShareWindowClose={handleShares}>
                <FacebookIcon className="share-button" />
            </FacebookShareButton>
            <PinterestShareButton
                url={`${settings.endpointUrl}/articles/${_id}`}
                onShareWindowClose={handleShares}>
                <PinterestIcon className="share-button" />
            </PinterestShareButton>
            <LinkedinShareButton
                url={`${settings.endpointUrl}/articles/${_id}`}
                onShareWindowClose={handleShares}>
                <LinkedinIcon className="share-button" />
            </LinkedinShareButton>
        </div>
    )
}
export default Share
