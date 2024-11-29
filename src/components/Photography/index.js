import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from "react-slick";
import 'react-lazy-load-image-component/src/effects/blur.css'; // for blur effect
import AWS from 'aws-sdk';
import './index.scss'; // Import your SCSS file for styling
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Photography = () => {
  const albums = [
    { name: 'Cancun', folder: 'Cancun' },
    { name: 'Amsterdam & Belgium', folder: 'Amsterdam&Belgium' },
  ];

  const [presignedUrls, setPresignedUrls] = useState([]);

  const initializeAWSCredentials = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_AWS_FUNCTION_URL);
      const { accessKeyId, secretAccessKey, region, bucketName } = await response.json();
  
      AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region,
      });
  
      return new AWS.S3({ params: { Bucket: bucketName } });
    } catch (error) {
      console.error("Error fetching AWS credentials:", error);
    }
  };

  useEffect(() => {
    const fetchPresignedUrls = async () => {
      const s3 = await initializeAWSCredentials();
      if (!s3) return;

      const generatePresignedUrlsForAlbum = async (folder) => {
        try {
          const objects = await s3.listObjectsV2({ Prefix: `${folder}/` }).promise();
          return await Promise.all(
            objects.Contents.map(async (object) => {
              const params = { Key: object.Key, Expires: 360 };
              const url = await s3.getSignedUrlPromise('getObject', params);
              return { name: object.Key, presignedUrl: url };
            })
          );
        } catch (error) {
          console.error(`Error generating presigned URLs for ${folder}:`, error);
          return [];
        }
      };

      const urls = await Promise.all(
        albums.map(async (album) => {
          const albumUrls = await generatePresignedUrlsForAlbum(album.folder);
          return { ...album, photos: albumUrls };
        })
      );
      setPresignedUrls(urls);
    };

    fetchPresignedUrls();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="photography-page">
      {presignedUrls.map((album, index) => (
        <div key={index}>
          <h2 className="album-name">{album.name}</h2>
          <Slider {...settings}>
            {album.photos.map((photo, photoIndex) => (
              <div className="photo-wrapper" key={photoIndex}>
                <LazyLoadImage
                  className="photo"
                  src={photo.presignedUrl}
                  effect="blur"
                  alt={photo.name}
                  style={{ maxHeight: '300px', width: 'auto', display: 'block', margin: '0 auto' }}
                />
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default Photography;