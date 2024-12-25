import React, { useEffect, useState } from 'react';
import './index.scss';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import MathImg from '../../assets/math-symbols.jpg';
import ReadingImg from '../../assets/reading.png';
import ScienceImg from '../../assets/science.jpg';
import { useNavigate } from 'react-router-dom';

function GetDescriptions(textfile) {
    const [text, setText] = useState("");

    useEffect(() => {
        fetch(`/textfiles/${textfile}`)
        .then((response) => response.text())
        .then((data) => setText(data))
        .catch((error) => console.error("Error loading text file", error));
    }, []);

    // Return the text value so it can be accessed
    return text;
}

function HomePage() {
    const general_description = GetDescriptions('description.txt');
    const math_description = GetDescriptions('math-description.txt');
    const reading_description = GetDescriptions('reading-description.txt');
    const science_description = GetDescriptions('science-description.txt');
    const model_disclaimers = GetDescriptions('model-disclaimers.txt');
    const model_strengths = GetDescriptions('model-strengths.txt');
    const header = <img alt="Card" className='card-img' src={MathImg} />;
    const reading_header = <img alt='Card' className='card-img' src={ReadingImg} />;
    const science_header = <img alt='Card' className='card-img' src={ScienceImg} />;
    const navigate = useNavigate();
    
    const math_footer = (
        <>
            <Button label='-->' onClick={() => {
                window.location.href = '/LearnToBeTutorResources/math-resources/home'
            }}/>
        </>
    )

    const reading_footer = (
        <>
            <Button label='-->' onClick={() => {
                navigate('/ai');
            }}/>
        </>
    )

    const science_footer = (
        <>
            <Button label='-->' onClick={() => {
                navigate('/ai');
            }}/>
        </>
    )

    return (
        <div className='index-wrapper'>
            <div className='content-wrapper'>
                <div className='space'>
                    <h1>Free Online Resource Finder + Online Tools For Learn To Be Tutors</h1>
                    <p className="p-text-primary general-description-txt">{general_description}</p>
                </div>

                <div className='flex-row'>
                    <div className='flex-column three-card-columns'>
                        <Card className='cards' footer={math_footer} title="Math Resources" subTitle="Use this to find basic math resources for your students" header={header}>
                            <p className="description-text">
                                {math_description}
                            </p>
                        </Card>
                    </div>

                    <div className='flex-column three-card-columns'>
                        <Card className='cards' footer={reading_footer} title="Reading Resources" subTitle="Use this to find basic reading resources for your students" header={reading_header}>
                            <p className="description-text">
                                {reading_description}
                            </p>
                        </Card>
                    </div>

                    <div className='flex-column three-card-columns'>
                        <Card className='cards' footer={science_footer} title="Science Resources" subTitle="Use this to find basic science resources for your students" header={science_header}>
                            <p className="description-text">
                                {science_description}
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
