import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ModalContext from '../context/ModalContext';
import { Modal } from '../components/Modal';
import { SongContext } from '../context/SongContext';
import { storage, db } from '../config/firebase-config';
import { getDownloadURL, ref } from 'firebase/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import AudioPlayer from '../components/AudioPlayer';
import song from '../assets/songTest.mp3'

export const Song = () => {
    const { modal, setModal } = useContext(ModalContext)
    const { name } = useContext(SongContext)
    const [scale, setScale] = useState("C_Major")
    const [clef, setClef] = useState("Treble")
    const [pdf, setPdf] = useState(null)
    const [songFound, setSongfound] = useState(true)
    const [songData, setSongData] = useState(null);
    const [songDataFound, setSongDataFound] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        // If there is no name in the context, redirect to the letters page
        if (!name) {
            navigate("../letters");
        }
    }, []); // Empty array means this effect runs once on component mount

    useEffect(() => {
        const fetchSongDetails = async () => {
            const songSpaceName = name.replace(/_/g, ' ').toLowerCase(); // Convert to lowercase
            console.log(songSpaceName)

            try {
                // Query based on the lowercase name
                const queryRef = query(collection(db, 'Songs'), where('nameLower', '==', songSpaceName));
                const querySnapshot = await getDocs(queryRef);

                if (!querySnapshot.empty) {
                    // If there are matching documents, retrieve the first one
                    const songSnap = querySnapshot.docs[0];
                    setSongData(songSnap.data());
                    setSongDataFound(true);
                } else {
                    console.log('No matching document found.');
                    setSongDataFound(false);
                }
            } catch (error) {
                // Handle any errors in the fetch
            }
        };

        if (name) {
            fetchSongDetails();
        }
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newScale = e.target[0].value;
        const newClef = e.target[1].value;

        setScale(newScale);
        setClef(newClef);

        if (!name) {
            console.error('Name is undefined or empty');
            return; // Or handle error accordingly
        }

        const songName = name + "_" + newScale + "_" + newClef + ".pdf";

        const letter = songName.slice(0, 1);
        const songRef = ref(storage, `${letter}/${songName}`);

        try {
            const url = await getDownloadURL(songRef);
            setPdf(url);
            setModal(true);
            setSongfound(true); // Song found, clear error message if displayed
        } catch (error) {
            // If the URL couldn't be fetched, show the error message
            setPdf(null);
            setSongfound(false);
        }
    };

    return (
        <div className='navdiv'>
            <Navbar></Navbar>
            <div className='modalDiv'>
                <div className='songPage'>
                    <div className="center">
                        <h1>{name.replace(/_/g, ' ')}</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <select>
                                <option value="C_Major">C Major</option>
                                <option value="F_Major">F Major</option>
                                <option value="E_Flat">E Flat</option>
                            </select>
                            <select>
                                <option value="Treble">Treble</option>
                                <option value="Bass">Bass</option>
                                <option value="piano">Grand Staff</option>
                            </select>
                        </div>
                        <button className='btn sub' type='submit'>Get Sheet Music</button>
                        <p>{songFound ? '' : `Sorry, we couldn't find the song with that clef and scale.`}</p>
                    </form>
                    <div className="panels">
                        <div className="panel">
                            <h2>Song Lyrics</h2>
                            <p>{songDataFound ? songData ? songData.lyrics : 'Loading...' : 'No meta-data found'}</p>
                        </div>
                        <div className="panel">
                            <h2>About The Song</h2>
                            <p>{songDataFound ? songData ? 'Taal: ' + songData.taal : 'Loading...' : 'No meta-data found'}</p>
                            <p>{songDataFound ? songData ? 'Raag: ' + songData.raag : 'Loading...' : 'No meta-data found'}</p>
                            <p>{songDataFound ? songData ? 'Category: ' + songData.category : 'Loading...' : 'No meta-data found'}</p>
                        </div>
                    </div>
                    <button className='btn back' onClick={() => {
                        navigate("../letters")
                    }}>Back</button>
                </div>
                {modal === true && <Modal setModal={setModal} pdf={pdf} />}
            </div>
            <Footer></Footer>
        </div>

    )
}
