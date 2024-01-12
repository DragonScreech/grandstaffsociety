import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import mainVideo from '../assets/main.mp4';
import teamImg from '../assets/team.jpg';
import rabiImg from '../assets/rabi.jpg'
import Drik from '../assets/drik.jpg'
import Oishani from '../assets/OishaniHeadshot.jpg'
import Champakali from '../assets/ChampakaliHeadShot.jpg'
import Ipsito from '../assets/IpsitoHeadshot.jpg'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';

const Home = () => {
    const navigate = useNavigate()

    const { ref: heroRef, inView: heroVis } = useInView()
    const { ref: visionRef, inView: visionVis } = useInView({
        triggerOnce: true
    });

    const { ref: joinRef, inView: joinVis } = useInView({
        triggerOnce: true
    })

    const { ref: contributeRef, inView: contributeVis } = useInView({
        triggerOnce: true
    })

    return (
        <div className='home'>
            <div className='navdiv'>
                <Navbar />
            </div>
            <section className='video-section'>
                <video muted loop autoPlay>
                    <source src={mainVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className='video-overlay'>
                    <h1 className={`header-message ${heroVis ? 'fade' : ''}`} ref={heroRef}>Download free sheet music for Rabrindranath Tagore's Songs</h1>
                    <button ref={heroRef} className={`get-sheet-music-btn ${heroVis ? 'fade' : ''}`} onClick={() => navigate('letters')}>Get Sheet Music</button>
                </div>
            </section>
            <section className='vision'>
                <div className="vision-content">
                    <div className="image">
                        <img src={rabiImg} alt="Image" />
                    </div>
                    <div className={`text ${visionVis ? 'fade' : ''}`} ref={visionRef}>
                        <h2>Our Vision</h2>
                        <p>We are working to create sheet music for the Rabrindranath Tagore's songs, so they are accessible to
                            anyone who would like to play the Nobel Laureate Poet's music. There are many people who are interested in Tagore's music but unable to
                            read Bengali music notation. Our goal is to build a community for those who are able to learn Tagore's songs by
                            reading sheet music. We hope to bridge the gap between Western and Eastern music by allowing instruments such as
                            violin, piano, flute, and others to play Tagore's songs based on Indian classical raagas and taals.</p>
                    </div>
                </div>
            </section>
            <section className="join">
                <div className="join-content">
                    <div className="image">
                        <img src={teamImg} alt="Image" />
                    </div>
                    <div className={`text ${joinVis ? 'fade' : ''}`} ref={joinRef}>
                        <h2>Join Us</h2>
                        <p>Help the community by supporting our project. You can be a part of our team by: </p>
                        <ul>
                            <li className={`helpList ${joinVis ? 'fade' : ''}`} ref={joinRef}>Writing sheet music</li>
                            <li className={`helpList ${joinVis ? 'fade' : ''}`} ref={joinRef}>Organizing music in the database</li>
                            <li className={`helpList ${joinVis ? 'fade' : ''}`} ref={joinRef}>Adding piano chords</li>
                            <li className={`helpList ${joinVis ? 'fade' : ''}`} ref={joinRef}>Providing techanical support to the website</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className='contributors-section'>
                <div className='contributorTitle'>
                    <h1>Contributors</h1>
                </div>
                <div className='contributors'>
                    <div className={`contributor ${contributeVis ? 'fade' : ''}`} ref={contributeRef}>
                        <h2>Ipsito Banerjee</h2>
                        <img src={Ipsito} alt='Ipsito Banerjee'></img>
                        <p>Music Creator</p>
                    </div>
                    <div className={`contributor ${contributeVis ? 'fade' : ''}`} ref={contributeRef}>
                        <h2>Oishani Banerjee</h2>
                        <img src={Oishani} alt='Oishani Banerjee'></img>
                        <p>Music Creator</p>
                    </div>
                    <div className={`contributor ${contributeVis ? 'fade' : ''}`} ref={contributeRef}>
                        <h2>Champakali Banerjee</h2>
                        <img src={Champakali} alt='Champakali Banerjee'></img>
                        <p>Website Creator</p>
                    </div>
                    <div className={`contributor ${contributeVis ? 'fade' : ''}`} ref={contributeRef}>
                        <h2>Drik Banerjee</h2>
                        <img src={Drik} alt='Drik Banerjee'></img>
                        <p>Website Creator</p>
                    </div>
                </div>

            </section>
            <Footer></Footer>
        </div>
    );
};

export default Home;
