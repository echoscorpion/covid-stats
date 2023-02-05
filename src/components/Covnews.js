import axios from 'axios'
import React,{useEffect, useState} from 'react'

export default function Covnews() {

    const [newsData, setnewsData] = useState([])

    
    useEffect(() => {
        var newsApiArgs = {
            method: 'GET',
            url: 'https://newsdata.io/api/1/news?apikey=YOUR_API_KEY&q=social',
            params: {q: 'covid', lang: 'en', sort_by: 'relevancy', page: '1',  page_size: 6},
            headers: {
              'x-api-key': 'pub_166537198381a37d4af51cc82f7057f20be81'
            }
          };
    

        const getCovidNewsData = async (e) => {
            const getNewsUrl = `https://newsdata.io/api/1/news?apikey=pub_166537198381a37d4af51cc82f7057f20be81&q=covid19&language=en`
            axios.get(getNewsUrl)
            .then(resp => {setnewsData(resp.data.results);})
            .catch(e => {console.log(e);});
        };

        getCovidNewsData()

    },[newsData])
    
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="newsCards">
                    {newsData.map(({title, content, description, image_url, pubDate, url, source, link}) =>(
                        <div className="crds" key={title.trim()+link.trim()}>
                            {/* <div className="newsImg">
                                <img src={image_url} alt={title} />
                            </div> */}
                            <div className="newsTtl">
                                <h5>
                                {pubDate}
                                </h5>
                                <h3>
                                {title}
                                </h3>
                            </div>
                            <div className="newsDesc">
                                <p>
                                {description.slice(0,165)}
                                </p>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
