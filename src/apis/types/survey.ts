export type SurveyRequest = {
    title: string;
    description: string;
    content: string;
    center: PointSpatial;
}

export type SurveyResponse = {
    id: string;
    title: string;
    description: string;
    content: string;
    center: PointSpatial;
    publishId: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

type PointSpatial = {
    x: number
    y: number
}