import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">

      <section className="hero">
        <div>
          <h1>Ideas worth sharing.</h1>

          <p>
            Write, publish and discover stories from curious minds.
          </p>

          <Link to="/create" className="start-writing">
            Start writing
          </Link>
        </div>
      </section>

      <section className="stories">
        <h2>Latest Stories</h2>

        {loading && <p>Loading stories...</p>}

        {!loading && articles.length === 0 && (
          <p>No stories published yet.</p>
        )}

        <div className="article-list">
          {articles.map((article) => (
            <article className="article-card" key={article.id}>
              <div className="article-content">
                <span className="category">Technology</span>

                <h3>{article.title}</h3>

                <p>
                  {article.content.length > 180
                    ? article.content.substring(0, 180) + "..."
                    : article.content}
                </p>

                <small>
                  {new Date(article.createdAt).toLocaleDateString()}
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;