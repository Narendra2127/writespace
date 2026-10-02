import { useState } from "react";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Publishing...");

    try {
      const response = await fetch("https://writespace-tj2n.onrender.com/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage("🎉 Article published successfully!");

      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to publish article.");
    }
  };

  return (
    <div className="create-page">
      <h1>Create Article</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your article..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">
          Publish Article
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default CreateArticle;