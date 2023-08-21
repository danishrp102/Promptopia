'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Profile from "@/components/Profile";

const UserProfile = ({ params }) => {
    const serachParams = useSearchParams();
    const userName = serachParams.get("name");

    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            // const response = await fetch(`/api/users/${params?.id}/posts`);
            const response = await fetch(`/api/users/${params?.id}/posts`, { next: { revalidate: 2 } });
            const data = await response.json();

            setUserPosts(data);
        };

        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
            data={userPosts}
        />
    );
};

export default UserProfile;