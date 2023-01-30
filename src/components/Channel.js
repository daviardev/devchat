import { useState, useEffect } from 'react'

import { db, auth } from 'firebase/client'
import { onSnapshot, orderBy, collection, query, limit, Timestamp, addDoc } from 'firebase/firestore'

const Channel = () => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const user = auth.currentUser

    const { displayName, uid, photoURL } = user

    useEffect(() => {
        if (db) {
            try {
                const collectionRef = collection(db, 'messages')
                const order = query(collectionRef, orderBy('createdAt', 'desc', limit(100)))

                const unSub = onSnapshot(order, (snapshot) => {
                    setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
                return unSub
            } catch (err) {
                console.error(err)
            }
        }
    }, [db])

    const handleOnChange = e => {
        setNewMessage(e.target.value)
    }

    const handleOnSubmit = async e => {
        e.preventDefault()

        if (db) {
            await addDoc(collection(db, 'messages'), {
                text: newMessage,
                createdAt: Timestamp.fromDate(new Date()),
                uid,
                username: displayName,
                avatar: photoURL
            })
        }
    }

    return <>
        <ul>
            {messages.map(message => (
                <li key={message.id}>{message.text}</li>
            ))}
        </ul>
        <form onSubmit={handleOnSubmit}>
            <input
                type='text'
                value={newMessage}
                onChange={handleOnChange}
                placeholder='Escriba su mensaje aquí...'
            />
            <button type='submit' disabled={!newMessage}>
                Enviar
            </button>
        </form>
    </>
}

export default Channel