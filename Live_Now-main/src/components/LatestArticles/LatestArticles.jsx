import React, { useEffect, useState } from 'react'
import "./LatestArticles.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
const LatestArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    //making api request for articles
    const getData = async () => {
      const { data: { articles } } = await axios.get("https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey=2ef21a5c05834c1099d8c3148cb152d5");
      setArticles(articles.slice(4));
    }
    getData()
  }, [])
  return (
    <div className='latestArticlesContainer'>
      <h1 style={{ margin: "15px 0px" }}>Latest Articles  </h1>
      <div className="cardContainer">
        {
          articles.map((article, i) => {
            return (
              <>
                <Link to={article?.url} key={i} className="newsCard" style={{ width: "23rem",textDecoration:"none",color:"black", marginTop: "20px" }}>
                  <img className="latestImg" style={{ width: "100%", height: "13rem", background:"grey"}} src={article?.urlToImage} alt="article img" />
                  <span id='publishedId' style={{ float: "left" }}>{new Date(article?.publishedAt).toDateString()}</span>

                  <h2>{article?.title}</h2>
                  <p style={{ textAlign: "justify" }}>{article?.content}</p>
                </Link>

              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default LatestArticles
