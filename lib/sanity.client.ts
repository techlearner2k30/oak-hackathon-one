//import { client } from "@/sanity/lib/client";
import { createClient, type ClientConfig } from '@sanity/preview-kit/client'

export const projectId =  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset =  process.env.NEXT_PUBLIC_SANITY_DATASET;

export const client = createClient({
    token : process.env.SANITY_ACCESS_TOKEN,
    projectId : projectId,
    dataset : dataset,
    apiVersion : process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn : true
})
