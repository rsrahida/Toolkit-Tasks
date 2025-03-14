import React from "react";
import "./Home.css";
import baby from "../../assets/images/korpem.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home-text">
        <span className="title">e-körpəm</span>
        <p className="description">
          Uşaqlarınız üçün rahat və gözəl geyimlər.
          <br />
          Körpələr üçün ən keyfiyyətli məhsullar burada!
        </p>
        <Link to="/shopping" className="shop-now-btn">
          Alış-verişə başla
        </Link>
      </div>
      <img src={baby} className="babyImage" />
    </div>
  );
};

export default Home;
