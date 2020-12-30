import React, { useEffect, useState } from 'react'
import Navbar from '../extras/Navbar'
import { SearchVideo } from '../Helper/Helper'
import { Row, Col, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import SideBar from '../extras/SideBar'
const Search = ({ match }) => {
    let Search = match.params.search_name

    let history = useHistory()

    const [list, setList] = useState([])
    const [key, setKey] = useState("")

    useEffect(() => {
        SearchVideo({ Search })

            .then(res => {
                if (res.data && res.status === 200) {
                    let setter = res.data.items.map((item) => {
                        let obj = {
                            videoId: item.id.videoId ? item.id.videoId : item.id.channelId,
                            channelTitle: item.snippet.channelTitle,
                            description: item.snippet.description,
                            thumbnails: item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : item.snippet.thumbnails.default.url,
                            title: item.snippet.title,
                            channelId: item.snippet.channelId
                        }

                        return obj
                    })

                    setList(setter)
                    setKey(res.data.nextPageToken)
                }

            })


    }, [Search])




    const RedirectToVideo = (videoId) => {
        history.replace('/')
        history.replace(`video/${videoId}`)
    }

    const GetVideos = () => (
        <div className="mt-5">
            {<Row >
                {list.map(item => {
                    return (

                        <Link onClick={() => RedirectToVideo(item.videoId)} key={item.videoId} style={{ textDecoration: "none" }}>
                            <Card key={item.videoId} className="video-card" style={{ background: "rgb(0,0,0,0.8)", marginLeft: "200px", width: "1000px" }} >
                                <Row>
                                    <Col sm="6" style={{ width: "500px" }}>
                                        <CardImg src={item.thumbnails} className="video-card-image" alt="Card image cap" height="350px" width="50px" />
                                    </Col>
                                    <Col sm="6">
                                        <CardTitle tag="h5" className="video-card-title  text text-truncate">{item.title}</CardTitle>
                                        <CardText className="video-card-channel">Channel: {item.channelTitle}</CardText>
                                    </Col>
                                </Row>
                            </Card>
                        </Link>
                    )
                })}
            </Row>}
        </div>
    )

    return (
        <div className="Home-screen">
            <Navbar />
            <SideBar />
            {list.length == 0 ? <p className="text text-dark mt-5">Error</p> : <GetVideos />}
        </div>
    )
}

export default Search
