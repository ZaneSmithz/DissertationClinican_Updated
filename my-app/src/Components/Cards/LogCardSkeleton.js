import React from 'react'
import {Card, Row, Col} from 'react-bootstrap';

const LogCard = (props) => {

  return (
    <Card  className={ "clientLogCard shadow-inner rounded"}>
    <Card.Body>
       <div className='userCardTextAlign'>
       <p className='userCardNameParagraph'> Client Log </p>
      
       <hr/>

       </div>
       </Card.Body>

</Card>
  )
}

export default LogCard