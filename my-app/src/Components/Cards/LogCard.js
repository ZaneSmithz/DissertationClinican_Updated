import React from 'react'
import {Card, Row, Col} from 'react-bootstrap';

const LogCard = (props) => {


  return (
    <Card  className={ "clientLogCard shadow-inner rounded"}>
    <Card.Body>
       <div className='userCardTextAlign'>
       <p className='userCardNameParagraph'> Client Log </p>
      
       <hr/>
       { props.docLog != undefined || props.docLog != null || props.docLog.length != 0 ?  
          props.docLog.map((log) => 
            <Row>
              <Col md={4}>
                <p> 19/12/2022: </p>
              </Col> 

              <Col md={8}>
                <p style={{whiteSpace:'pre'}}> M{log.moduleIdDoc}C{log.chapterIdDoc} Completed</p>
              </Col>
              <hr/>
            </Row>
              )
            :
            <h> RETURN FAILURE {console.log(props.firstName + " Return failrue")} </h>
      } 

       </div>
       </Card.Body>

</Card>
  )
}

export default LogCard