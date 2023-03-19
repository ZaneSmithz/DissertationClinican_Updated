import React, { Fragment, useState } from 'react'
import {Card, Col, Row, Modal, Button} from 'react-bootstrap';

const ModuleOverviewCard = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Fragment>
      <Card  className={ "moduleOverviewCard shadow-inner rounded"}>
        <Card.Body>
          <div className='userCardTextAlign'>
            <p className='userCardNameParagraph'> Modules </p>
            <hr/>

          {props.moduleCollection.items.map((item) =>
            <Row>
              <Col style={{textAlign: 'start'}} md={8}>
                <p className="mx-5" style={{whiteSpace:'pre', fontWeight:'600'}}> {item.moduleTitle}</p>
              </Col>

              <Col md={4}>
                <Button className='mb-3' variant="secondary" onClick={handleShow} > View </Button>
              </Col>
            <hr/>
            </Row>
              
              )}
          </div>
        </Card.Body>
      </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>

        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
        {props.moduleCollection.items.map((item) =>
          item.moduleChapters.links.entries.block.map((chapter) => (
          <div key={chapter.id}>
            <p>TEST TEST</p>
            {chapter.chapterActivity.json.content.map((content) => (
            <p key={content.nodeUid}>{content.content[0].value}</p>
            ))}
          </div>
          ))
        )}

          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>
  </Fragment>
  )
}

export default ModuleOverviewCard