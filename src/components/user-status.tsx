'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export default function UserStatus(){
    const {data: session, status} = useSession();

    if(status === 'loading'){
        return <p>...</p>
    }

    if(session){
        return(
            <div className="flex items-center space-x-2">
                <Avatar>
                    {session.user?.image && <AvatarImage src={session.user.image}/>}
                    <AvatarFallback>{session.user?.email?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
            </div>
        );
    }

    return(
        <Button onClick={() => signIn()}>
            Sign in
        </Button>
    )
}