import React, { useEffect, useState } from 'react'
import "./Featured.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
const Featured = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // api request --->
    const getData = async () => {
      const { data: { articles } } = await axios.get("https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey=2ef21a5c05834c1099d8c3148cb152d5");
      setArticles(articles);

    }
    getData()
  }, [])
  return (
    <div className='FeaturedContainer'>
      <h1 className='featuredLogo'>Featured Articles</h1>

      <div className="newsContainer">
        <Link to={articles[0]?.url} style={{ textDecoration: "none", color: "black", width: "49%" }} className="FeaturedLeft">
          <img src={articles[0]?.urlToImage} alt="img" />
          <span id='publishedId'>{new Date(articles[0]?.publishedAt).toDateString()}</span>
          <h2 style={{ display: "block" }}>{articles[0]?.title}</h2>
          <p>{articles[0]?.content}</p>
        </Link>
        <div className="FeaturedRight" style={{ width: "49%" }}>
          {
            articles.slice(1, 4).map((article, i) => {
              return (
                <>
                  <Link to={article?.url} key={i} style={{ textDecoration: "none", color: "black" }} className="card">
                    <div className="leftCard" style={{ width: "80%" }}>
                      <img style={{ width: "100%", height: "100%" }} src={article?.urlToImage} alt="img" />
                    </div>
                    <div className="rightCard">
                      <span id='publishedId'>{new Date(article?.publishedAt).toDateString()}</span>

                      <h2 className='featuredHeading'>{article?.title}
                      </h2>

                    </div>
                  </Link>
                  <hr style={{ color: "grey", margin: "35px 0px" }} />
                </>
              )
            })
          }

        </div>

      </div>
    </div>
  )
}

export default Featured
