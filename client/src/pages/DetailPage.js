import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { LinkCard } from '../components/LinkCrad';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/Auth.context';
import { useHttp } from '../hooks/http.hook';

export const DetailPage = () => {
    const { token } = useContext(AuthContext);
    const [link, setLink] = useState(null);
    const { request, loading } = useHttp();
    const linkID = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkID}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched);
        } catch (e) {}
    }, [token, linkID, request]);

    useEffect(() => {
        getLink()
    }, [getLink]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} /> }
        </>
    )
}