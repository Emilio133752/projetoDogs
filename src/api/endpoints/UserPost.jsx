import { func } from 'prop-types'
import React from 'react'

const UserPost = () => {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function handleSubmit(event){
        event.preventDefault()

        fetch('https://dogsapi.origamid.dev/json/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': "Application/Json"
            },
            body: JSON.stringify({
                username,
                email, 
                password
            })
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(json => {
            console.log(json)
            return
        })
    }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      placeholder='username'
      value={username} 
      onChange={({target}) => setUsername(target.value)} />
      <input 
      type="email" 
      placeholder='email'
      value={email} 
      onChange={({target}) => setEmail(target.value)} />
      <input 
      type="password" 
      placeholder='Password'
      value={password} 
      onChange={({target}) => setPassword(target.value)} />
      <button>Enviar</button>
    </form>
  )
}

export default UserPost
