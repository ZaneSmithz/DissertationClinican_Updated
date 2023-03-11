import {useState, useEffect, React, Fragment} from 'react'
import {Card, Button, Modal} from 'react-bootstrap';
import '../CSS/Dashboard.css';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import {BLOCKS, INLINES} from '@contentful/rich-text-types'

const ModuleCard = ({ item }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(item);

    return (
        <Fragment>
          <Card className="homeCardMain homeCardSpacing">
              <Card.Body>
                  <h> {item.moduleTitle} </h>
                  <button variant="primary" onClick={handleShow} > Modal Test </button>
      
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
          {item.moduleChapters.links.entries.block.map(chapter => 
            <div>
              <p> {chapter.chapterTitle} </p> 
              {chapter.chapterActivity.json.content.map((content) =>
                <p> {content.content[0].value} </p>)} 
            </div>
        )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>

      </Modal>

        
    
        </Fragment>
    )
}

export default ModuleCard;