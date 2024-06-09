import React from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api'

export const UserContext = React.createContext()

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function autoLogin(){
            const token = window.localStorage.getItem('token');
            if(token){
                try {
                    setError(null)
                    setLoading(true)
                    const {url, options} = TOKEN_VALIDATE_POST(token)
                    const response = await fetch(url, options)
                    if(!response.ok) throw new Error('Token Invalido')
                    await getUser(token);
                } catch (err) {
                    userLogout()
                }finally{
                    setLoading(false)
                }
            }
        }
        autoLogin()
    }, []);

    async function getUser(token){
        const {url, options} = USER_GET(token) 
        const response = await fetch(url, options)   
        const json = await response.json()
        setData(json)
        setLogin(true)  
        console.log(json)
    }

    async function userLogin(username, password){
        try{
            setError(null)
            setLoading(true)
            const {url, options} = TOKEN_POST({username, password})
            const tokenRes= await fetch(url, options)
            console.log(tokenRes.statusText)
            if(!tokenRes.ok) throw new Error(`Error: Usuário invalido`)
            const {token} = await tokenRes.json()
            window.localStorage.setItem('token', token)
            await getUser(token)
        }catch(err){
            setError(err.message)
            setLogin(false)
        }finally{
            setLoading(false)
        }
    }

    async function userLogout(){
        setData(null)
        setError(null)
        setLoading(false)
        setLogin(false)
        window.localStorage.removeItem('token')
    }

  return (
    <UserContext.Provider value={{ userLogin, data, userLogout, error, loading, login }}>
      {children}
    </UserContext.Provider>
  )
}