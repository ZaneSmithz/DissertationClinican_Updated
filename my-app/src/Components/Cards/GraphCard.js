import React from 'react'
// import '../../../node_modules/react-vis/dist/style.css';
import { Card } from 'react-bootstrap';
import { PieChart} from 'react-minimal-pie-chart';



const GraphCard = (props) => {

    // get currentModuleId, if data.moduleId == currentModuleId 
    // get moduleLength
    // retrive firebase

    return (
        <Card  className={ "graphChartCard shadow-inner rounded"}>
             <Card.Body>
                <div className='userCardTextAlign'>
                <p className='userCardNameParagraph'> Module Progress </p>
                <PieChart
                    animation
                    animationDuration={500}
                    animationEasing="ease-out"
                    center={[50, 50]}
                    data={[
                        {
                        color: "#BFD7E3",
                        title: "Current Chapter",
                        value: props.chapterCurrent
                        },
                        {
                        color: "#323639",
                        title: "Total Chapters",
                        value: props.chapterTotal
                        },
            
                    ]}
                    labelPosition={50}
                    lengthAngle={360}
                    lineWidth={30}
                    paddingAngle={0}
                    radius={42}
                    rounded
                    startAngle={90}
                    viewBoxSize={[100, 100]}
                />
                </div>
                </Card.Body>

        </Card>
    )
}

export default GraphCard