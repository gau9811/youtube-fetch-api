import React, { useEffect, useState } from 'react'
import '../css/CommentVID.css'
import { Row, Col, Collapse } from 'reactstrap'
import { getCommentOnVideo, addComment, getAllvideos, getvideoDetail } from '../Helper/Helper'
import Navbar from '../extras/Navbar'
import { Link } from 'react-router-dom'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
const Video = ({ match }) => {

    let urlId = match.params.video_id
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [info, setInfo] = useState("")
    const [loading, setLoading] = useState(false)
    let [listVideos, setListVideos] = useState([])
    let [listVideo, setListVideo] = useState({})
    const [toggle, setToggle] = useState(false)



    var commentLoad = () => {
        setTimeout(() => {
            window.location.reload(false);
        }, 1000)

    }
    console.log(urlId)

    useEffect(() => {
        getCommentOnVideo({ urlId }).then(res => {
            if (res.status == 200 && res.data) {
                setLoading(false)
                let arr = []
                for (let i = 0; i < res.data.items.length; i++) {
                    arr.push(res.data.items[i].snippet.topLevelComment.snippet)
                }

                let comment = arr.map((item) => {
                    let obj = {
                        channelId: item.authorChannelId.value,
                        channelUrl: item.authorChannelUrl,
                        channelAuthorName: item.authorDisplayName,
                        channelAuthorImage: item.authorProfileImageUrl,
                        comment: item.textOriginal,
                        videoId: item.videoId
                    }
                    return obj
                })

                setComments(comment)
            }

            if (res.status !== 200) {
                setLoading(true)
            }

        })
        getAllvideos().then(res => {
            if (res.data && res.status == 200) {
                let videos = res.data.items.map((item, i) => {
                    let num = {
                        videoId: item.id,
                        channelId: item.snippet.channelId,
                        title: item.snippet.title,
                        thumbnail: item.snippet.thumbnails.standard && item.snippet.thumbnails.standard.url ? item.snippet.thumbnails.standard.url : item.snippet.thumbnails.default.url,
                        channeltitle: item.snippet.channelTitle,
                        description: item.snippet.description,
                        publishedAt: item.snippet.publishedAt,
                    }
                    return num
                })

                setListVideos(videos)
            }
        })


        setTimeout(() => {


            getvideoDetail({ urlId })
                .then(res => {
                    console.log(res.data)
                    if (res.data && res.status == 200) {


                        let video = {
                            videoId: res.data.items[0].id,
                            channelId: res.data.items[0].snippet.channelId,
                            title: res.data.items[0].snippet.title,
                            thumbnail: res.data.items[0].snippet.thumbnails.standard && res.data.items[0].snippet.thumbnails.standard.url ? res.data.items[0].snippet.thumbnails.standard.url : res.data.items[0].snippet.thumbnails.default.url,
                            channeltitle: res.data.items[0].snippet.channelTitle,
                            description: res.data.items[0].snippet.description,
                            publishedAt: res.data.items[0].snippet.publishedAt,
                            tags: res.data.items[0].snippet.tags
                        }


                        setListVideo(video)
                    }
                })
        }, 2000)
    }, [getCommentOnVideo, getAllvideos])

    console.log(listVideo)

    let handleChange = (e) => {
        setComment(e.target.value)
    }

    let Addcomment = () => {
        addComment({ urlId, comment })
            .then(res => {
                if (res.status == 401) {

                }
            })
    }

    let handleToggle = () => {
        setToggle(toggle => !toggle)
    }



    let VideoPlay = () => (
        <div className="video-frame">
            <Row>
                <Col>
                    <iframe style={{ marginTop: "150px", marginLeft: "20px" }} width="800" height="450" src={`https://www.youtube.com/embed/${match.params.video_id}`} />
                    <div className="video-desc" onClick={handleToggle}>
                        <p className="text text-white text-lg ml-4 mt-2">{listVideo.title}</p>
                        {!toggle ? <ArrowDropDownIcon style={{ color: "white", marginLeft: "20px", marginRight: "0px", float: "right" }} /> : <ArrowDropUpIcon style={{ color: "white", marginLeft: "20px", marginRight: "0px", float: "right" }} />}
                    </div>
                    <Collapse isOpen={toggle} style={{ width: "600px", wordWrap: "break-word" }}>
                        <p className="ml-5 text-white"> Description 👉 - {listVideo.description}</p>

                        <p className="ml-5 text text-white">Hashtags #️⃣</p>
                        {listVideo.tags && listVideo.tags.map((item, i) => (
                            <Row className="ml-5">
                                <Col key={i}>
                                    <p className="text text-white">{item}</p>
                                </Col>
                            </Row>
                        ))}

                    </Collapse>
                </Col>
                <Col className="videoPlay-video " style={{ marginTop: "130px" }}>
                    {listVideos.map((item, i) => (
                        <Link to={`video/${item.videoId}`.split('/')[1]} key={i} onClick={commentLoad} style={{ textDecoration: "none" }}>
                            <Row style={{ width: "90%" }}>
                                <Col>
                                    <img src={item.thumbnail} width="190px" className="mt-4" />
                                </Col>
                                <Col>
                                    <p className="mt-4 text text-white text-small side-text" >{item.title}</p>
                                    <p className=" text text-white text-small side-text" >channel -- {item.channeltitle}</p>

                                </Col>
                            </Row>
                        </Link>
                    ))}

                </Col>

            </Row>
        </div >
    )


    let CommentSection = () => (
        <Row style={{ width: '700px' }}>
            <Col style={{ width: '450px' }}>
                <hr style={{ width: "200px" }} />
                <h6 className="Comment-Title">{comments.length} Comments</h6>
                <hr style={{ width: "200px" }} />
                {comments.map((item, i) => {
                    return (
                        <Row key={i}>
                            <Col style={{ width: '200px' }}>
                                <img src={item.channelAuthorImage} className="ml-5 mt-5 rounded-circle" style={{ width: "80px", height: "80px" }} />
                            </Col>
                            <Col >
                                <p className="comment-user mt-5">{item.comment}</p>
                            </Col>
                        </Row>
                    )
                })}
                <Col></Col>
            </Col>
        </Row>
    )

    return (

        <div className="Single-video-page">
            <Navbar />
            <VideoPlay />
            <Row style={{ width: '70%' }}>
                <Col style={{ width: '30%' }}><hr style={{ width: '30%' }} /></Col>
            </Row>
            <Row style={{ width: "75%" }}>
                <Col style={{ width: "50%" }}>
                    <input type="text" value={comment} className="form-control ml-5 mt-5" onChange={(e) => handleChange(e)} />
                </Col>
                <Col style={{ width: "20%" }}>
                    <button onClick={Addcomment} className={comment.length ? "btn btn-primary ml-5 mt-5" : "btn btn-dark  ml-5 mt-5"} >Comment</button></Col>
            </Row>
            <CommentSection />
        </div >
    )
}

export default Video
