import React, { useEffect, useState } from 'react'

import Navbar from '../extras/Navbar'
import "../css/Videos.css";
import { getAllvideos } from '../Helper/Helper'
import { Row, Col, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap'
import { Link } from 'react-router-dom'
import Loading from '../img/loading.gif'
import SideBar from '../extras/SideBar'
import Axios from 'axios'

const Home = () => {

    let [listVideos, setListVideos] = useState([])
    let [loading, setLoading] = useState(false)


    let VideoArea = () => {
        return (
            <div style={{ width: "100%" }}>

                <SideBar />
                <div className="main">
                    {loading ? <img src={Loading} style={{ marginLeft: "50%", marginRight: "50%", marginTop: "10%" }} /> :

                        (<Row style={{ marginTop: "100px" }}>
                            {listVideos.map(item => {
                                return (

                                    <Link to={`video/${item.videoId}`} key={item.videoId} style={{ textDecoration: "none", }}>
                                        <Card key={item.videoId} className="video-card" style={{ background: "rgb(0,0,0,0.8)", width: "100%", paddingLeft: "300px" }}>
                                            <Row >
                                                <Col sm="6" style={{ width: "500px" }}>
                                                    <CardImg src={item.thumbnail} className="video-card-image" alt="Card image cap" height="400px" width="250px" />
                                                </Col>
                                                <Col sm="6">
                                                    <CardTitle tag="h5" className="video-card-title">{item.title}</CardTitle>
                                                    <CardText className="video-card-channel">Channel: {item.channeltitle}</CardText>
                                                    <CardText className="video-card-published">Published-At: {item.publishedAt.slice(0, 10)}</CardText>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </Row>)
                    }
                </div>
            </div>
        )
    }

    useEffect(() => {
        getAllvideos().then(res => {
            console.log(res)
            if (res.data && res.status == 200) {

                setLoading(false)

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


            if (res.status !== 200 || !res) {

                setLoading(true)
            }




        })

        console.log(loading)
        if (listVideos.length) {
            setLoading(false)
        }

        if (!listVideos.length) {
            setLoading(true)
        }

    }, [])


    return (
        <div>
            <Navbar />
            <div className="Home-screen">
                <VideoArea />
            </div>
        </div>
    )
}

export default Home
