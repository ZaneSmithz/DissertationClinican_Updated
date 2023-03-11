import {useState, useEffect, React} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {collection, query, onSnapshot, where} from "firebase/firestore"
import {db} from '../firebase'
import '../Components/CSS/Dashboard.css';
import HomeCard from '../Components/Cards/HomeCard';
import { UseAuth } from '../Contexts/AuthContext';
import SelectedNameCard from '../Components/Cards/SelectedNameCard';
import useContentful from '../useContenful';

const queryContentful = `
query {
  moduleCollection(limit: 10){
    items{
      moduleTitle
      moduleId
      moduleChapters{
        links{
          entries{
            block {
              __typename
              ...on Chapter {
                chapterId
                userInput
                chapterTitle
                chapterImage{
                  title
              		contentType
                  url
                }
                chapterActivity{
                  json
                }
                
              }
            }
          }
        }
      }
      
    }
  }
}
`;

const Dashboard = (props) => {
    const [users, setUser] = useState([]);
    const { currentUser } = UseAuth();
    const [selected, setSelected] = useState(null);
    const [assignedClient, setAssignedClient] = useState();

    let { data, errors } =  useContentful(queryContentful);

    useEffect(() => {
      const q = query(collection(db, currentUser.uid));
        onSnapshot(q, (querySnapshot) => {
          setUser(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })))
        })
      },[])

        useEffect(() => {
        let chatQuery;
        if (selected) {
            chatQuery = query(collection(db, 'client_clinican_collection'), where('users', '==', [selected?.data.uid, currentUser?.uid]));
            console.log(selected.data.first_name)
            console.log("ENTERED SELECTED!!");
        
            onSnapshot(chatQuery, (querySnapshot) => {
              setAssignedClient(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),

              })))
            })
          }
      },[selected])

    if(errors) {
        return <span>{errors.map(error => error.message).join(", ")}</span>
    } 
    if(!data) {
        return <span> Loading... </span>
    } 

    const { moduleCollection } = data;

    console.log("ASSIGNED CLIENT = ", assignedClient)
    
    return (
      <Row>
        <div className='homeCardsDivsRowAlign'>
          <div className="homeCardTopSpacing mx-5 my-5" md={3}>
              {users.map((user) => (
                <HomeCard
                  selected={selected}
                  setSelected={setSelected}
                  user={user}
                  firstName={user.data.first_name}
                  lastName={user.data.last_name}
                  moduleNum={user.data.currentModuleNum}
                  chapterNum={user.data.currentChapterNum}
                />
            ))}
            </div>

          {selected != null ?
            <SelectedNameCard
              firstName={selected.data.first_name}
              lastName={selected.data.last_name}
              moduleNum={selected.data.currentModuleNum}
            />
            :
            <SelectedNameCard
              firstName={"Select"}
              lastName={"Me"}
              moduleNum={"Temp"}
            />}
          </div>
        
        <Col>
        <div className='homePageHr'></div>
          <div className='verticalLine'></div>
        </Col>
      </Row>
    )
}

export default Dashboard;