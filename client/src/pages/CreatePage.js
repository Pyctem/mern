import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/Auth.context';
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState('');
    const { request } = useHttp()

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                console.log('122')
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data);
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input 
                        placeholder="Вставте ссылку" 
                        id="link" 
                        type="text"
                        name="email"
                        value={link}
                        onChange={event => setLink(event.target.value)}
                        onKeyPress={pressHandler}
                    />
                </div>
            </div>
        </div>
    )
}