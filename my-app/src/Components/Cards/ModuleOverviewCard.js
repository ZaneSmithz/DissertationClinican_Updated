import React, { Fragment, useState } from 'react'
import {Card, Col, Row, Modal, Button} from 'react-bootstrap';

const ModuleOverviewCard = (props) => {
  const [show, setShow] = useState(false);
  const [moduleItem, setModuleItem] = useState();
  const [userAnswers, setUserAnswers] = useState([]);

  const handleClose = () => {
    setShow(false);
    setModuleItem(null);
    setUserAnswers(null);
  }

  const handleShow = (contentfulModule) => {
    setModuleItem(contentfulModule)
    let newArray = []
    props.textResponse.map((response) => {
      
      if(response.moduleIdDoc == contentfulModule.moduleId) {
        newArray = [...newArray, response]
      }
    })
    setUserAnswers(newArray);
  
    setShow(true);
  }

  /*
  Onclick = filter textResponse so only moduleId == textResponse.moduleId
  */


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
                <p className="mx-5" style={{whiteSpace:'pre', fontWeight:'600'}}>{item.moduleTitle}</p>
              </Col>

              <Col md={4}>
                <Button className='mb-3' variant="secondary" onClick={() => handleShow(item)} > View </Button>
              </Col>
            <hr/>
            </Row>
              
              )}
          </div>
        </Card.Body>
      </Card>
{moduleItem ? 
    <Modal
    
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>

        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* if response.chapterId == chapter.id then render */}
          

         { moduleItem.moduleChapters.links.entries.block.map((chapter) => (
          <div key={chapter.id}>
            <p style={{fontWeight: 650}}> {chapter.chapterTitle} </p>
            {chapter.chapterActivity.json.content.map((content) => (
            <p key={content.nodeUid}>{content.content[0].value}</p>
            ))}

            {userAnswers.map((answer) => (
            <p style={{color: "red"}}> { chapter.chapterId == answer.chapterIdDoc ? answer.textResponse : undefined} </p> 
            ))}

          </div>
          ))
        }

          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>
      : undefined }
  </Fragment>
  )
}

export default ModuleOverviewCard