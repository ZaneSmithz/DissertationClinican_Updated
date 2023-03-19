import React, {useEffect, useState} from 'react'
import {Card, Button} from 'react-bootstrap';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../CSS/Dashboard.css';

const HomeCard = (props) => {
    const [count, setCount] = useState(0);

    const navigate = useNavigate();

    const onClick = () => {
        props.setSelected(props.user)
    }

    const clickChat = () => {
        navigate("/chat")
    }

    //${props.selected.first_name === props.firstName ? 'homeCardMain2' : 'homeCardMain'}

    return (
        <Card
        onClick={onClick}
        className={`${props.selected != null && props.selected.data.client_first_name === props.firstName ? 'homeCardMain2' : 'homeCardMain'} shadow-inner rounded homeCardSpacing`}>
                <Card.Body>
                <div className="homeCardTextAlign">
                    <div className='paragraphBlocking'>
                    <p className="my-2" style={{whiteSpace:'pre', fontWeight: '570', fontSize: '19px'}}> {props.firstName} {props.lastName}</p>
                    </div>
                    <div className='paragraphBlocking'>
                    <p className=" my-2" style={{whiteSpace:'pre', fontWeight: '570', fontSize: '19px'}}>Module {props.moduleNum}</p>
                    </div>
                    <div className='paragraphBlocking'>
                    <p className="my-2" style={{whiteSpace:'pre', fontWeight: '570', fontSize: '19px'}}>Chapter {props.chapterNum}</p>
                    </div>
          
                    <div className='paragraphBlocking'>
    
                        <Badge color="primary" badgeContent={props.unreadMessages}>
                            <ChatBubbleOutlineOutlinedIcon className='my-2' sx={{width: 31, height: 31}}  onClick={clickChat}/>
                        </Badge>
                    </div>
                </div>
                </Card.Body>
        </Card>
    )
}

export default HomeCard;