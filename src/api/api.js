import axios from 'axios';

const BAZE_URL = 'https://pixabay.com/api/'

const getPhotosService = async (value, page) => {

    const { data } = await axios(BAZE_URL, {
        params: {
            key: '38571221-0f6f89c913260bc990fe2f825',
            q: `${value}`,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page: page,
            per_page: 12,
        }
    });
    return data;
}

export { getPhotosService };