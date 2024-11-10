import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "c3b833c41aa0501fc2cfecb12b6f42a8",
        language: "ko-KR"
    },
})

export default instance