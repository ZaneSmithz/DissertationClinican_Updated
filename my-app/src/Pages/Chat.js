import {useState, useEffect, React, useLayoutEffect} from 'react'
import {db} from '../firebase'
import {collection, query, onSnapshot, where, doc, orderBy, getDocs, addDoc, serverTimestamp} from "firebase/firestore"
import { UseAuth } from '../Contexts/AuthContext';
import HomeCard from '../Components/Cards/HomeCard';
import { Button, Form, Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
    const [users, setUser] = useState([]);
    const { currentUser } = UseAuth();
    const [selected, setSelected] = useState(null);
    const [newMessage, setNewMessages] = useState("")
    const [messages, setMessages] = useState([]);
    const [uid, setUid] = useState();
    const [chatId, setChatId] = useState();

    useEffect(() => {
        const q = query(collection(db, currentUser.uid));
          onSnapshot(q, (querySnapshot) => {
            setUser(querySnapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            })))
          })

          console.log(currentUser.uid);
          setUid(currentUser.uid)
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
    }, [uid, selected])
    
    useEffect(() => {
        if(chatId) {
            const messageRefNew = collection(doc(db, 'chats', chatId), 'messages');
                const q  = query(messageRefNew, orderBy('createdAt', 'asc'));
                console.log("entering final useeffect, message ref complete")

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
        <div className="homeCardTopSpacing mx-5" md={3}>
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
        <div className="chat-app">
            <div className="messages">
                {messages.map((message) => (
                    <div className="message">
                        <span className="user"> {message.text}  </span>
                    </div>
                ))}
            </div>
        </div>

        <div className='send-form-div'>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    className='new-message-input'
                    placeholder='Type message here...'
                    type="text"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessage}
                />
                <Button type="submit" className="send-button">Submit</Button>
            </Form>
        </div>
    </Container>
  )
}

export default Chat
