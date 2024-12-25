import React from 'react';
import { Card } from 'primereact/card';
import './index.scss'

export default function Footer() {
    return (
        <div className="Footer-wrapper bg-dark">
            <Card className='footer-card bg-dark'>
                <i className='pi pi-comment card-icon'></i> <span className='card-text'>This site was developed by Soham, a current tutor on LTB</span>
            </Card>
        </div>
    );
}
