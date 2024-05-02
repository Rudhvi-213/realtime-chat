import {Children, createContext, useState} from 'react'
import { useAuthContext } from './AuthContext'
import io from 'socket.io-client'

export const SocketContainer = createContext()

export const useSocketContext = () => {
    return useContext(SocketContainer)
}

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUSers, setOnlineUSers] = useState([])

    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser) {    
            const socket = io("http://locathost:3005", {
                query: {
                    userId: authUser._id,
                },
            });
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                setOnlineUSers(users);
            }) ;

            return () => socket.close()
        } else{
            if (socket){
                socket.close()
                setSocket(null);
            }
        }
    }, []);

    return (
        <SocketContext.Provider values={{socket, onlineUSers}}>
            {children}
        </SocketContext.Provider>
    )
} 