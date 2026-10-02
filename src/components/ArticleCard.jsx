import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <img src={article.image} alt={article.title} />

      <div className="article-content">
        <h2>{article.title}</h2>

        <p>{article.description}</p>

        <div className="author">
          By {article.author}
        </div>

        <Link to={`/article/${article.id}`} className="read-btn">
          Read Article →
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;