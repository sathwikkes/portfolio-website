import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // for blur effect
import AWS from 'aws-sdk';
import arrowImage from '../assets/up-arrow.jpg';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
  bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
});

const s3 = new AWS.S3();

const Photography = () => {
  const albums = [
    {
      name: 'Cancun',
      folder: 'Cancun',
    },
    {
      name: 'Amsterdam & Belgium',
      folder: 'Amsterdam&Belgium',
    },
  ];

  const [presignedUrls, setPresignedUrls] = useState([]);

  const generatePresignedUrlsForAlbum = async (folder) => {
    try {
      const objects = await s3.listObjectsV2({
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Prefix: `${folder}/`,
      }).promise();

      const urls = await Promise.all(
        objects.Contents.map(async (object) => {
          const params = {
            Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
            Key: object.Key,
            Expires: 60,
          };
          const url = await s3.getSignedUrlPromise('getObject', params);
          return { name: object.Key, presignedUrl: url };
        })
      );

      return urls;
    } catch (error) {
      console.error(`Error generating presigned URLs for ${folder}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const generatePresignedUrlsForAlbums = async () => {
      const urls = await Promise.all(
        albums.map(async (album) => {
          const albumUrls = await generatePresignedUrlsForAlbum(album.folder);
          return { ...album, photos: albumUrls };
        })
      );
      setPresignedUrls(urls);
      //console.log(urls)
    };

    generatePresignedUrlsForAlbums();
  }, []);

  return (
  <div className="album-grid">
    <div className="back-to-home">
                <img src={arrowImage} alt="Back to Home" style={{ width: '20px', height: '20px' }} />

                <p>Click on the IMSATH in the header to go back to the main website.</p>

    </div>
    {presignedUrls.map((album, index) => (
      <div key={index}>
        <h2 className="album-name">{album.name}</h2>
        <div className="photo-grid">
          {album.photos.map((photo, photoIndex) => (
            <div className="photo-wrapper" key={photoIndex}>
              <LazyLoadImage className="photo"
                src={photo.presignedUrl}
                effect="blur"
                alt={photo.name}
                height={300}
                width={300}
              />
            </div>
          ))}
        </div>
     </div>
    ))}
  </div>
  );
};

export default Photography;
