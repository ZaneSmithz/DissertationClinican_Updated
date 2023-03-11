import React, {useEffect} from 'react'
import {Card, Button} from 'react-bootstrap';
import '../CSS/Dashboard.css';

const HomeCard = (props) => {

    const onClick = () => {
        props.setSelected(props.user)
    }


    //${props.selected.first_name === props.firstName ? 'homeCardMain2' : 'homeCardMain'}

    return (
        <Card
        onClick={onClick}
        className={`${props.selected != null && props.selected.data.first_name === props.firstName ? 'homeCardMain2' : 'homeCardMain'} shadow-inner rounded homeCardSpacing`}>
                <Card.Body>
                <div className="homeCardTextAlign">
                    <div className='paragraphBlocking'>
                    <p> {props.firstName} {props.lastName}</p>
                    </div>
                    <div className='paragraphBlocking'>
                    <p className="mx-5">Module {props.moduleNum}</p>
                    </div>
                    <div className='paragraphBlocking'>
                    <p className="mx-3">Chapter {props.chapterNum}</p>
                    </div>
                    </div>
                </Card.Body>
        </Card>
    )
}

export default HomeCard;