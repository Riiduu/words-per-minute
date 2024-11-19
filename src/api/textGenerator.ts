import axios from "axios";

export const randomText =
    axios.get('https://fakerapi.it/api/v2/texts?_quantity=1&_characters=350')
        .then(function (res) {
            if (res != null) {
                return res.data.data[0].content;
            }
        })