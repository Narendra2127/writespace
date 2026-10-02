import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const articles = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    author: "Narendra Wankhede",
    content:
      "Artificial intelligence is becoming one of the most important technologies of our generation. From education and healthcare to robotics and cybersecurity, AI is changing how we solve problems."
  },
  {
    id: 2,
    title: "Getting Started With Cloud Computing",
    author: "Alex Sharma",
    content:
      "Cloud computing allows developers and organizations to access computing resources over the internet instead of managing everything locally."
  },
  {
    id: 3,
    title: "Why Developers Are Learning Linux",
    author: "Rahul Mehta",
    content:
      "Linux is widely used in servers, cloud computing, cybersecurity and DevOps. Learning Linux gives developers a better understanding of modern infrastructure."
  }
];

function Article() {
  const { id } = useParams();

  const article = articles.find(
    (article) => article.id === Number(id)
  );

  if (!article) {
    return <h1>Article not found</h1>;
  }

  return (
    <>
      <Navbar />

      <main className="article-page">
        <h1>{article.title}</h1>

        <p className="article-author">
          Written by {article.author}
        </p>

        <div className="article-text">
          <p>{article.content}</p>

          <p>
            Technology continues to evolve rapidly, creating new opportunities
            for students and developers who are willing to learn and experiment.
          </p>
        </div>
      </main>
    </>
  );
}

export default Article;