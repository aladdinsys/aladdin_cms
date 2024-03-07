export type SurveyRequest = {
    title: string;
    description: string;
    content: string;
}

export type SurveyResponse = {
    id: number,
    title: string
    description: string
    content: string
    publishId: string
    owner: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}