'use client'
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../../../axios'

function Profile({ searchParams }: { searchParams: { id: string } }) {
    const {data, error } = useQuery({
        queryKey: ['profile', searchParams.id],
        queryFn: () => makeRequest.get('users/get-user?id=' + searchParams.id).then((res)=>{
            return res.data[0]
        })
    })
    if(error){
        console.log(error)
    }
    console.log(data)
    return(
        <div>{searchParams.id}</div>
    );

}

export default Profile;