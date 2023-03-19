import React from 'react'
import {Card, Col, Row} from 'react-bootstrap';

const ClientInfoCard = (props) => {
  return (
    <Card  className={ "clientInfoCard shadow-inner rounded"}>
    <Card.Body>
       <div className='userCardTextAlign'>
       
       <p className='userCardNameParagraph'> Patient Information </p>
       <hr/>
       <Row>

       <Col md={4}>
       <p> Name: </p>
       </Col>

       <Col md={8}>
       <p style={{whiteSpace:'pre'}}> {props.firstName} {props.lastName}</p>
       </Col>
       <hr/>
      </Row>

      <Row>
        <Col md={4}>
          <p> Job: </p>
        </Col>

        <Col md={8}>
          <p> {props.occupation}</p>
        </Col>
        <hr/>
      </Row>

      <Row>
        <Col md={4}>
          <p> Status: </p>
        </Col>

        <Col md={8}>
          <p> {props.martialStatus}</p>
        </Col>
        <hr/>
      </Row>
      
      <Row>
        <Col md={4}>
          <p> Citizen:</p>
        </Col>

        <Col md={8}>
          <p> {props.nationality}</p>
        </Col>
        <hr/>
      </Row>

        <Row>
        <Col md={4}>
          <p> Diagnosis: </p>
        </Col>

        <Col md={8}>
          <p> {props.medicalDiagonsis}</p>
        </Col>
        <hr/>
      </Row>


      
       </div>
       
       </Card.Body>

</Card>
  )
}

export default ClientInfoCard