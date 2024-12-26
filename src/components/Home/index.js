import React, { useEffect, useState } from 'react';
import './index.scss';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import MathImg from '../../assets/math-symbols.jpg';
import ReadingImg from '../../assets/reading.png';
import ScienceImg from '../../assets/science.jpg';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const general_description = "This web service simplifies the search for educational materials by gathering math, reading, and science resources from across the web and organizing them in one place. Designed to support tutors, it provides easy access to lesson plans, practice exercises, and learning tools, all curated to save time and enhance teaching. Whether you're preparing for a session or looking for new ways to engage students, this platform makes finding quality resources effortless and convenient."
    const math_description = "The math section compiles a variety of resources, including worksheets, interactive tools, and practice problems, tailored to help tutors teach concepts ranging from basic arithmetic to advanced topics. It’s your go-to spot for making math engaging and accessible for students of all levels. It also offers a range of learning materials and interactive tools, like graphing calculators and equation solvers, inspired by platforms such as Desmos. These resources are designed to help tutors teach mathematical concepts more effectively, from basic arithmetic to advanced topics like calculus and geometry.";
    const reading_description = "The reading section brings together stories, comprehension exercises, and vocabulary-building tools to support tutors in developing students' literacy skills. It offers a variety of materials to make reading fun, enriching, and tailored to different age groups and proficiency levels.";
    const science_description = "The science section focuses on providing learning materials that help students understand key concepts in subjects like biology, chemistry, and physics. Tutors can use these resources to simplify complex topics and build a strong foundation in science.";
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
