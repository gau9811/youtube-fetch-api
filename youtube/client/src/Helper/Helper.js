const { default: Axios } = require('axios')
let Apitoken = 'Inject your own api to get access of api request'
let Accesstoken = 'Inject Your Acces token to add comment'



let getAllvideos = () => {
    return Axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=100&prettyPrint=true&key=${Apitoken}`
        , {
            Accept: 'application/json'
        })
}

let getCommentOnVideo = ({ urlId }) => {
    return Axios.get(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${urlId}&key=${Apitoken}`
        , {
            Accept: "application/json"
        })
}



let addComment = ({ urlId, comment }) => {

    let obj = {

        "snippet": {
            "videoId": `${urlId}`,
            "topLevelComment": {
                "snippet": {
                    "textOriginal": `${comment}`
                }
            }
        }

    }

    return fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${Apitoken}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${Accesstoken}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })

}


let SearchVideo = ({ Search }) => {
    return Axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${Search}&key=${Apitoken}`
        , {

            Accept: "application/json"
        })
}


let getvideoDetail = ({ urlId }) => {
    return Axios.get(` https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${urlId}&key=${Apitoken}`
        , {

            Accept: "application/json"
        })
}

module.exports = {
    getAllvideos,
    getCommentOnVideo,
    addComment,
    SearchVideo,
    getvideoDetail,
}