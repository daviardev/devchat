import { useState, useEffect } from 'react'

import { db } from 'firebase/client'
import { onSnapshot, orderBy, collection, query, limit } from 'firebase/firestore'

const Channel = ({ user = null }) => {
    const [messages, setMessages] = useState([])

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

    return <>
        <ul>
            {messages.map(message => (
                <li key={message.id}>{message.text}</li>
            ))}
        </ul>
    </>
}

export default Channel