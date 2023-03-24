import {useState, useEffect, React, useLayoutEffect} from 'react'
import {db} from '../firebase'
import {collection, query, onSnapshot, where, orderBy, getDocs, addDoc, serverTimestamp, doc, writeBatch} from "firebase/firestore"
import { UseAuth } from '../Contexts/AuthContext';
import HomeCard from '../Components/Cards/HomeCard';
import { Button, Form, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
    const [users, setUser] = useState([]);
    const { currentUser } = UseAuth();
    const [selected, setSelected] = useState(null);
    const [newMessage, setNewMessages] = useState("")
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState();


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
        let chatQuery;
        if (selected) {
            chatQuery = query(collection(db, 'chats'), where('users', '==', [selected?.data.uid, currentUser?.uid]));
            console.log(selected.data.first_name)
            console.log("ENTERED SELECTED!!");
        
        getDocs(chatQuery)
            .then((querySnapshot) => {
                const chatDoc = querySnapshot.docs[0];
                if (chatDoc) {
                const chatId = chatDoc.id;
                setChatId(chatId);
                console.log('Chat ID:', chatId);
                } else {
                console.log('No chat found');
                }
            })
            .catch((error) => {
                console.error('Error getting chat documents:', error);
            });
          console.log("CHAT QUERY ", chatQuery);
        }
    }, [selected])

    useEffect( () => {
        if(chatId) {
            const messageRefNew = collection(doc(db, 'chats', chatId), 'messages');
            const q = query(messageRefNew, orderBy('createdAt', 'asc'));

            const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: serverTimestamp(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            ));
            
            
            return () => {
                unsubscribe();
            }
        }

    }, [chatId])
    
    useEffect( () => {
        if(chatId) {
            const messageRefNew = collection(doc(db, 'chats', chatId), 'messages');
            const unreadDocsQuery = query(messageRefNew, where('clinican_unread', '==', true));
            const batch = writeBatch(db);

            getDocs(unreadDocsQuery).then((querySnapshot) => {
                // Loop over the query snapshot documents
                querySnapshot.docs.forEach((doc) => {
                  // Update each document in the collection
                  console.log("doc.id = " + doc.id);
              
                  // Use doc.ref instead of doc.id to get a DocumentReference object
                  batch.update(doc.ref, { clinican_unread: false });
                });
              
                // Commit the batch write
                return batch.commit();
              
              }).then(() => {
                console.log('All documents updated successfully');
              }).catch((error) => {
                console.log('Error updating documents:', error);
              });

    }}, [chatId])

    const handleSubmit = async(e) => {
        console.log("entered handle submit!")
        e.preventDefault();
        if(newMessage === "") return;

        console.log(messages)
        if(chatId) {
        const messageRef = collection(doc(db, 'chats', chatId), 'messages');

        await addDoc(messageRef, {
            _id: uuidv4(),
            text: newMessage,
            createdAt: serverTimestamp(),
            user: currentUser.email,
          });
      
          setNewMessages("");
   }
   setNewMessages("");
}

  return (
    <Container>
        <Row>
        <div className="homeCardTopSpacingChat mx-5" md={3}>
            {users.map((user) => (
                    <HomeCard
                    selected={selected}
                    setSelected={setSelected}
                    user={user}
                    firstName={user.data.client_first_name}
                    lastName={user.data.client_last_name}
                    moduleNum={user.data.currentModule}
                    chapterNum={user.data.currentChapter}
                    />
                ))} 
        </div>
        </Row>

        <Row style={{justifyContent: 'center', maxHeight: '100px'}}>
        <div className="chat-app" style={{ maxHeight: '300px'}}>
            <div style={{ maxHeight: '250px'}} >
            {messages.map((message) => {
                return message?.user?._id ? (
                    <div className="messageBoxClinican" style={{ alignItems: 'flex-start', flexDirection: 'column', display: 'flex'}} >
                    <div className='messageClinican'> <span className="clinicanTextMessage"> {message.text} </span> </div>
                    </div>
                ) : (
                    <div className="messageBoxClient" style={{ alignItems: 'flex-end', flexDirection: 'column', display: 'flex'}} >
                    <div className='messageClient'> <span className="userTextMessage"> {message.text} </span> </div> 
                    </div>
                );
                })}
            </div>
        </div>
        </Row>
        <Row>


        <div className='send-form-div'>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    className='new-message-input'
                    placeholder='Type message here...'
                    type="text"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessage}
                />
                <Button type="submit" className="send-button my-3 mx-1">Submit</Button>
            </Form>
        </div>
        </Row>
       
    </Container>
  )
}

export default Chat
