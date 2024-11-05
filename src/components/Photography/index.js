import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from "react-slick";
import 'react-lazy-load-image-component/src/effects/blur.css'; // for blur effect
import AWS from 'aws-sdk';
import './index.scss'; // Import your SCSS file for styling
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
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
      // Add more albums if needed
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
      };
  
      generatePresignedUrlsForAlbums();
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
                effect="blur"  // Lazy load with a blur effect
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