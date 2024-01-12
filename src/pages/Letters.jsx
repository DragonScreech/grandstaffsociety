import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react'
import { storage } from '../config/firebase-config';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Song } from './Song';
import { useNavigate } from 'react-router-dom'
import ModalContext from '../context/ModalContext';
import { SongContext } from '../context/SongContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const Letters = () => {
    const { modal, setModal } = useContext(ModalContext)
    const [pdf, setPdf] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const { dispatch } = useContext(SongContext)

    const getPdfs = (letter) => {
        setSelectedLetter(letter);
        setLoading(true);
        listAll(ref(storage, letter)).then((res) => {
            let items = res.items;
            let trebleItems = items.filter(itemRef => itemRef.name.includes("C_Major") && itemRef.name.includes("Treble"));
            let pianoItems = items.filter(itemRef => itemRef.name.includes("C_Major") && itemRef.name.includes("piano"));

            let pianoSongs = new Set(pianoItems.map(item => item.name.replace('.pdf', '').split('_piano')[0]));
            let filePromises = trebleItems.map((itemRef) => {
                let baseName = itemRef.name.replace('.pdf', '').split('_Treble')[0];
                baseName = baseName.replace(/_/g, ' '); // Replace underscores with spaces

                const hasGrandStaff = pianoSongs.has(itemRef.name.replace('.pdf', '').split('_Treble')[0]);
                let displayName = baseName + (hasGrandStaff ? ' *' : '');

                return { name: displayName };
            });

            Promise.all(filePromises).then((files) => {
                setFileList(files);
            });
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        console.log(fileList)
    }, [fileList])


    return (
        <div className='navdiv'>
            <Navbar></Navbar>
            <div className="container">
                <div className='card'>
                    <h2>Search and Download Tagore Sheet Music for free!</h2>
                    <p>All songs are organized by their first letter. Click on a letter to generate a list of all available Rabrindra Sangeet starting with that letter arranged alphabetically. Click on the song name you are looking for to find the sheet music of that song. You can download or print the sheet music pdf for free. In addition to sheet music, you will find transliterated lyrics and other details such as the song category, rhythm, raaga, and additional information about the song.</p>
                </div>
                <div className="button-grid">
                    <Button letter="A" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="B" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="C" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="D" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="E" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="G" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="H" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="I" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="J" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="K" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="L" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="M" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="N" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="O" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="P" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="R" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="S" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="T" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="U" setModal={setModal} getPdfs={getPdfs} />
                    <Button letter="W" setModal={setModal} getPdfs={getPdfs} />
                </div>
                <ul>
                    {!selectedLetter ? '' : fileList.length == 0 ? 'No songs found' : loading ? 'Loading...' :
                        fileList.map((file, index) => (
                            <li key={index} onClick={() => {
                                setPdf(file.url)
                                let songName = file.name;
                                songName = songName.split(' C Major')[0]
                                songName = songName.replace(/ /g, "_");
                                console.log(songName)
                                dispatch({ type: "CHANGE_NAME", payload: songName });
                                navigate("../song");
                            }}>
                                {file.name.replace('C Major', '')}
                            </li>
                        ))}
                </ul>
            </div>
            <p>* means that the song has a grand staff version</p>
            <Footer></Footer>
        </div>

    );
}
