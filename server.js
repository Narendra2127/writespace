import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "WriteSpace API is running 🚀",
  });
});

// Create article → AWS S3
app.post("/api/articles", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const article = {
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    const fileName = `articles/${Date.now()}.json`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: JSON.stringify(article),
      ContentType: "application/json",
    });

    await s3.send(command);

    res.json({
      message: "Article saved to AWS S3 successfully! 🎉",
      file: fileName,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save article to S3",
    });
  }
});

// Get articles ← AWS S3
app.get("/api/articles", async (req, res) => {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET,
      Prefix: "articles/",
    });

    const listResult = await s3.send(listCommand);

    const articles = [];

    for (const item of listResult.Contents || []) {
      const getCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: item.Key,
      });

      const result = await s3.send(getCommand);

      const text = await result.Body.transformToString();

      articles.push({
        id: item.Key,
        ...JSON.parse(text),
      });
    }

    res.json(articles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch articles from S3",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`WriteSpace API running on port ${PORT}`);
});