import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import './NewsCard.css'

export default function NewsCard(props) {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 125 }}
        image={props.news.urlToImage ? props.news.urlToImage : 'https://i.imgur.com/QoMTW46.jpg' }
        alt="News image"
      />
      <div className='news-card-container | flex flex-col justify-start items-start gap-2 '>
        <div className='news-card-header | text-xl'>
          {props.news.title
            .split(".").splice(0, 1).join(" ")
          }
        </div>
        <div className='news-card-description | flex justify-start'>
          {props.news.description.split(".").splice(0 , 1).join(" ")}
        </div>
        <a target="_blank" href={props.news.url}>
          <button className='news-button | flex justify-center items-center text-base rounded px-5 py-1 '>
            Learn More
          </button>
        </a>
      </div>   
    </Card>
  );
}
