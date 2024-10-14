import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Slider.css";

function Slider() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Fetch data from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/popular-posts/");
        const data = await response.json();
        setPosts(data); // Save posts to state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const timeOut =
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 5000);

    return () => clearTimeout(timeOut);
  }, [current, autoPlay]);

  const slideRight = () => {
    setCurrent((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  const slideLeft = () => {
    setCurrent((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const goToPostDetail = (postId) => {
    navigate(`/posts/${postId}`); // Navigate to post details page
  };

  return (
    <div
      className="carousel"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <div className="carousel_wrapper">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={post.id}
              className={
                index === current
                  ? "carousel_card carousel_card-active"
                  : "carousel_card"
              }
              onClick={() => goToPostDetail(post.id)} // Make each card clickable
            >
              <img
                className="card_image"
                src={post.thumbnail}
                alt={post.title}
              />
              <div className="card_overlay">
                <h2 className="card_title">{post.title}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <div className="carousel_arrow_left" onClick={slideLeft}>
          &lsaquo;
        </div>
        <div className="carousel_arrow_right" onClick={slideRight}>
          &rsaquo;
        </div>
        <div className="carousel_pagination">
          {posts.map((_, index) => (
            <div
              key={index}
              className={
                index === current
                  ? "pagination_dot pagination_dot-active"
                  : "pagination_dot"
              }
              onClick={() => setCurrent(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
