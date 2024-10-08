import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import {useLoaderData} from "react-router-dom";
import DOMPurify from "dompurify";

function SinglePage() {
  const post = useLoaderData();
  console.log(post)
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                {/*<div className="price">$ {singlePostData.price}</div>*/}
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.description)} }></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/restaurant2.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}</p>

              </div>
            </div>
            <div className="feature">
              <img src="/acces.png" alt="" />
              <div className="featureText">
                <span>Accessibilité</span>
                <p>{post.postDetail.accessibilite}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Tarif</span>
                <p>{post.postDetail.tarif} €</p>
              </div>
            </div>
          </div>
          {/*<p className="title">Sizes</p>*/}
          {/*<div className="sizes">*/}
          {/*  <div className="size">*/}
          {/*    <img src="/size.png" alt="" />*/}
          {/*    <span>80 sqft</span>*/}
          {/*  </div>*/}
          {/*  <div className="size">*/}
          {/*    <img src="/bed.png" alt="" />*/}
          {/*    <span>2 beds</span>*/}
          {/*  </div>*/}
          {/*  <div className="size">*/}
          {/*    <img src="/bath.png" alt="" />*/}
          {/*    <span>1 bathroom</span>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<p className="title">Nearby Places</p>*/}
          {/*<div className="listHorizontal">*/}
          {/*  <div className="feature">*/}
          {/*    <img src="/school.png" alt="" />*/}
          {/*    <div className="featureText">*/}
          {/*      <span>School</span>*/}
          {/*      <p>250m away</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="feature">*/}
          {/*    <img src="/pet.png" alt="" />*/}
          {/*    <div className="featureText">*/}
          {/*      <span>Bus Stop</span>*/}
          {/*      <p>100m away</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="feature">*/}
          {/*    <img src="/fee.png" alt="" />*/}
          {/*    <div className="featureText">*/}
          {/*      <span>Restaurant</span>*/}
          {/*      <p>200m away</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
