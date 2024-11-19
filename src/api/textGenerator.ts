import axios from "axios";

export const randomText = async () => {
    const res = await axios.get('https://fakerapi.it/api/v2/texts?_quantity=1&_characters=350');
    if (res?.data?.data?.[0]?.content) {
        return res.data.data[0].content;
    }
    return ""; // Fallback in case of error or no data
};