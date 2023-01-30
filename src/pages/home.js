import { useRouter } from 'next/router'

import { signOutFromAccount } from 'firebase/client'
import useUser, { STATES } from 'hooks/useUser'

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
            <p>Bienvenido al chat</p>
        </>
        }
    </>
}

export default home