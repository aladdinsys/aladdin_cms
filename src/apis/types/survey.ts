export type SurveyRequest = {
    title: string;
    description: string;
    content: string;
    center: {
        x: number;
        y: number;
    }
}

export type SurveyResponse = {
    id: string,
    title: string
    description: string
    content: string
    publishId: string
    owner: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}