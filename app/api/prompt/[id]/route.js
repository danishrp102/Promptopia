import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// has 3 different types of requests: 
//GET (read the requests)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt),
            { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts",
            { status: 500 })
    }
}


//PATCH (update it)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt; // RHS is the new prompt that we pass throuh params 
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 })
    }
}


//DELETE (the requests)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
}
