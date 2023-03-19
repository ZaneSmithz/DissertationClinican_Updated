import {useState, useEffect, React, Fragment} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {collection, query, onSnapshot, where, orderBy, getDocs, doc, collectionGroup} from "firebase/firestore"
import {db} from '../firebase'
import '../Components/CSS/Dashboard.css';
import HomeCard from '../Components/Cards/HomeCard';
import { UseAuth } from '../Contexts/AuthContext';
import SelectedNameCard from '../Components/Cards/SelectedNameCard';
import useContentful from '../useContenful';
import GraphCard from '../Components/Cards/GraphCard';
import { PieChart} from 'react-minimal-pie-chart';
import LogCard from '../Components/Cards/LogCard';
import ClientInfoCard from '../Components/Cards/ClientInfoCard';
import ModuleOverviewCard from '../Components/Cards/ModuleOverviewCard';
import LogCardSkeleton from  '../Components/Cards/LogCardSkeleton';

const queryContentful = `
query {
  moduleCollection(limit: 10){
    items{
      moduleTitle
      moduleId
      totalChapterNum
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
    const [assignedClient, setAssignedClient] = useState(null);
    const [clientClinicanFirebaseId, setClientClinicanFirebaseId] = useState();
    const [chatId, setChatId] = useState()
    const [docLog, setDocLog] = useState([]);
    const [messages, setMessages] = useState([]);
    const [fetched, setFetched] = useState(false);

    // 

    let { data, errors } =  useContentful(queryContentful);

    useEffect(() => {
      const q = query(collection(db, 'client_clinican_collection'), where('users', "array-contains", currentUser?.uid));
        onSnapshot(q, (querySnapshot) => {
          setUser(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })))
        })
      },[])

    useEffect(() => {
      setDocLog(null);
      let chatQuery;
        if (selected) {
            chatQuery = query(collection(db, 'client_clinican_collection'), where('users', '==', [selected?.data.uid, currentUser?.uid]));
            getDocs(chatQuery)
            .then((querySnapshot) => {
                const chatDoc = querySnapshot.docs[0];
                if (chatDoc) {
                const clientClinicanFirebaseId = chatDoc.id;
                setClientClinicanFirebaseId(clientClinicanFirebaseId);
                console.log('Chat ID:', clientClinicanFirebaseId);
                } else {
                console.log('No chat found');
                }
            })
            .catch((error) => {
                console.error('Error getting chat documents:', error);
            });
          }
      },[selected])
      

      useEffect (() => { 
        if(clientClinicanFirebaseId) {
        const chapterRef = collection(db, 'client_clinican_collection', clientClinicanFirebaseId, 'chapters');
        const myQuery = query(chapterRef, where('chapterCompleted', '==', 'true'))
    
          getDocs(myQuery).then((querySnapshot) => {
            setDocLog(querySnapshot.docs.map((doc) => ( {
              id: doc.id,
              chapterIdDoc: doc.data().chapterId,
              moduleIdDoc: doc.data().moduleId,
              chapterCompletedDoc: doc.data().chapterCompleted,
            })))
          }).catch((error) => {
            console.error('error getting doc', error);
          })
        }
      }, [clientClinicanFirebaseId]);

      useEffect(() => {
        let chatQuery;
        chatQuery = query(collection(db, 'chats'), where('users', 'array-contains', currentUser?.uid));
        
        getDocs(chatQuery)
            .then((querySnapshot) => {
                const chatDocs = querySnapshot.docs;
                if (chatDocs) {
                  const chatIds = chatDocs.map((chatId) => {return chatId.id});
                  console.log("COMPLETED CHAPTER ID ARRAY? ", chatIds)
                  setChatId(chatIds);
                  console.log('Chat ID:', chatIds);
                } else {
                console.log('No chat found');
                }
            })
            .catch((error) => {
                console.error('Error getting chat documents:', error);
            });
          console.log("CHAT QUERY ", chatQuery);
      
    }, [])

    useEffect(() => {
      if (chatId) {
        const collectionGroupQuery = query(
          collectionGroup(db, "messages"),
          where("clinican_unread", "==", true)
        );

        getDocs(collectionGroupQuery).then((querySnapshot) => {
          setMessages(querySnapshot.docs.map((doc) => ( {
            id: doc.id,
            text: doc.data().text,
            user: doc.data().user,
          })))
        }).catch((error) => {
          console.error('error getting doc', error);
        })

      }
    }, [chatId]);
          
    if(errors) {
        return <span>{errors.map(error => error.message).join(", ")}</span>
    } 
    if(!data) {
        return <span> Loading... </span>
    } 

    const findCurrentModule = () => {
      if (selected) {
        const currentModule = selected.data.currentModule;
        const currentChapter = selected.data.currentChapter;
        const name = selected.data.client_first_name;
    
        for (const item of moduleCollection.items) {
          if (item.moduleId == currentModule) {
    
            return item.totalChapterNum;
          }
        }
      }
    
      return 0;
    };


    const setBadgeContent = (firstName, clientEmail) => {
      let localCounter = 0; 
      if(messages != null ) {
          messages.map((message) => {
              if(message.user._id == clientEmail) {
            

                  localCounter++;
              }
          });
      }
          return localCounter;
    }
      

    const { moduleCollection } = data;

    //
    return (
      <Fragment>
        <Row>
        <Col md={8}>
          <div className="homeCardTopSpacing">
            
          {
            users.map((user) => (
       
                <HomeCard
                  selected={selected}
                  setSelected={setSelected}
                  user={user}
                  firstName={user.data.client_first_name}
                  lastName={user.data.client_last_name}
                  moduleNum={user.data.currentModule}
                  chapterNum={user.data.currentChapter}
                  clientEmail={user.data.client_email}
                  unreadMessages={setBadgeContent(user.data.client_first_name , user.data.client_email)}
                />

            ))
            }
          </div>
          <div className='homePageHr'></div>
          <Row>

          {moduleCollection != null ? 
            <ModuleOverviewCard
              moduleCollection={moduleCollection}
            /> :
            undefined
          }
      

          {selected != null ?
          <ClientInfoCard
          firstName={selected.data.client_first_name}
              lastName={selected.data.client_last_name}
              moduleNum={selected.data.currentModule}
              martialStatus={selected.data.client_martial_status}
              medicalDiagonsis={selected.data.client_medical_diagonsis}
              medication={selected.data.client_medication}
              nationality={selected.data.client_nationality}
              occupation={selected.data.client_occupation}
              
              />
             
            :
            <ClientInfoCard
            firstName={"Select"}
            lastName={"Me"}
            moduleNum={"Temp"}
          />}
          </Row>
        
          <div className='verticalLine mr-5'></div>
          </Col>
        
     
        
    
        <Col md={4}>
        {selected != null ?
            <SelectedNameCard
              firstName={selected.data.client_first_name}
              lastName={selected.data.client_last_name}
              moduleNum={selected.data.currentModule}
            />
            :
            <SelectedNameCard
              firstName={"Select"}
              lastName={"Me"}
              moduleNum={"Temp"}
            />}



        {selected != null ? 
        <GraphCard
        chapterCurrent={selected.data.currentChapter}
        chapterTotal={ findCurrentModule()}/>
        :
        undefined
}

        {selected != null && docLog != null ?
          <LogCard
          docLog={docLog}
          firstName={selected.data.client_first_name}/>: 
          
          <LogCardSkeleton
          />}
        </Col>
        </Row>
          
    
  
      </Fragment>
      
    )
}

export default Dashboard;