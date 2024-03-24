import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Stack, Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';

function ConvertDayNight(daynight) {
    if (daynight === 0) {
        return 'night'
    }
    return 'day'
}

function App() {
    const [posts, setPosts] = useState([]);
    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        justifyItems: 'center'
    };


    useEffect(() => {
        axios.get('https://api.weatherapi.com/v1/forecast.json?key=c2f242f11541444eba722535242802&q=94549&days=3&aqi=yes&alerts=yes')
            .then(response => {
              setPosts(response.data);
            })
            .catch(error => {
              console.error(error);
            });
    }, []);
    console.log(posts)
    if (posts.length === 0) {
        return (
            <Stack justifyContent='center' width='100%' alignItems='center'>
                <h3>Loading weather data...</h3>
                <CircularProgress/>
            </Stack>
        );
    }

    return (
        <>
            <Stack justifyContent='center' width='100%' alignItems='center'>
                <Typography variant='h2'>{posts.current.temp_f}° F</Typography>
                <Stack sx={{borderRadius: '16px', ...commonStyles}} justifyContent='center' alignItems='center'>
                    <Typography>The current weather data is
                        from {posts.location.name}, {posts.location.region}.</Typography>
                    <Typography>It is a {posts.current.condition.text.toLowerCase()} {posts.current.temp_f}°
                        F {ConvertDayNight(posts.current.is_day)}, but it feels
                        like {posts.current.feelslike_f} degrees.</Typography>
                    <Typography>Cloud cover: {posts.current.cloud}%</Typography>
                    <Typography>Wind: {posts.current.wind_mph} mph from the {posts.current.wind_dir}.</Typography>
                    <img src={posts.current.condition.icon} alt='weather_image'/>
                </Stack>
                <Stack sx={{borderRadius: '16px', ...commonStyles}}>
                    <Typography>The day {posts.forecast.forecastday[1].date} and
                        min: {posts.forecast.forecastday[1].day.mintemp_f}° F
                        max: {posts.forecast.forecastday[1].day.maxtemp_f}° F</Typography>
                    <img src={posts.forecast.forecastday[1].day.condition.icon}/>
                </Stack>
                <Stack sx={{borderRadius: '16px', ...commonStyles}}>
                    <Typography>The day {posts.forecast.forecastday[2].date} and
                        min: {posts.forecast.forecastday[2].day.mintemp_f}° F
                        max: {posts.forecast.forecastday[2].day.maxtemp_f}° F</Typography>
                    <img src={posts.forecast.forecastday[2].day.condition.icon}/>
                </Stack>

            </Stack>

        </>
    );
}

export default App;