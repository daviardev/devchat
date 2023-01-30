import Image from 'next/image'

import { auth } from 'firebase/client'

import { formatRelative } from 'date-fns'

const Message = ({ text, createdAt }) => {
    const user = auth.currentUser

    const { displayName, photoURL } = user
    
    return <>
        <div>
            {photoURL && (
                <Image
                    src={photoURL}
                    alt='Avatar profile'
                    width={45}
                    height={45}
                />
            )}
            {displayName && <p>{displayName}</p>}
            {createdAt?.seconds && (
                <span>
                    {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                </span>
            )}
            <p>{text}</p>
        </div>
    </>
}

export default Message