"use client";

import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router';
import Form from '@components/Form';

const CreatePrompt = () => {

    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST', // passing this data (frontend) to the above API endpoint using POST request
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally { // happens either way
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt