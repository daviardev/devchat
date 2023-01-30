import { useRouter } from 'next/router'

import { db } from 'firebase/client'

import { signOutFromAccount } from 'firebase/client'
import useUser, { STATES } from 'hooks/useUser'
import Channel from 'components/Channel'

const home = () => {
    const user = useUser()
    const router = useRouter()

    const handleLogout = () => {
        signOutFromAccount()
            .then(() => {
                user === STATES.NOT_LOGGED && router.replace('/')
            })
            .catch(err => {
                console.error(err)
            })
    }
    return <>
        {user && <>
            <button onClick={handleLogout}>Cerrar sesión</button> 
            <Channel user={user} db={db} />
        </>
        }
    </>
}

export default home