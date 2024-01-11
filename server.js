// server.js
const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = 3001;

const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const region = process.env.REACT_APP_AWS_REGION;
const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;

// Use these variables in your AWS configuration

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

const s3 = new AWS.S3();

app.get('/presigned-url/:key', async (req, res) => {
  const { key } = req.params;

  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 60, // Set the expiration time in seconds
  };

  try {
    const presignedUrl = await s3.getSignedUrlPromise('getObject', params);
    res.json({ url: presignedUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
