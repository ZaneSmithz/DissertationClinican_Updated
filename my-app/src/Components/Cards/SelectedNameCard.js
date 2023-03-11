import React, { useState } from 'react'
import {Card, Button, Image} from 'react-bootstrap';
import '../CSS/Dashboard.css';

const SelectedNameCard = (props) => {
    return (
        <Card  className={ "userProfileCard shadow-inner rounded"}>
                <Card.Body>
                <div className='userCardTextAlign'>
                <Image className="avatarSmall" 
                src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                 roundedCircle/>
                    <p className='my-4 userCardNameParagraph'> {props.firstName} {props.lastName}</p>
                    <p >Module {props.moduleNum}</p>
                </div>
                
                
                </Card.Body>
        </Card>
    )
}

export default SelectedNameCard;