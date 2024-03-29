import api from ".";
import { Response } from "@/apis/types";
import {SurveyRequest, SurveyResponse} from "@/apis/types/survey";

export const getSurveys = async () => {
    const { data } = await api.get<Response<SurveyResponse[]>>('/surveys')
        .then((response) => response)
        .catch((error) => error);

    return data;
}

export const getSurveysOwn = async () => {
    const { data } = await api.get<Response<SurveyResponse[]>>('/surveys/find-own')
        .then((response) => response)
        .catch((error) => error);

    return data;
}

export const getSurveyById = async (id: string) => {
    const { data } = await api.get<Response<SurveyResponse[]>>(`/surveys/${id}`)
        .then((response) => response)
        .catch((error) => error);

    return data;
}

export const getCoord = async (address: string) => {
    const { data } = await api.get<Response<SurveyResponse[]>>(`/open-api/vworld/coord/${address}`, {
        headers: {
            'Content-Type': 'application/json',
            'API-KEY': `${process.env.NEXT_PUBLIC_API_KEY}`
        }})
        .then((response) => response)
        .catch((error) => error);

    return data;
}

export const postSurvey = async (survey: SurveyRequest) => {
    const { data } = await api.post<Response<SurveyResponse>>('/surveys', survey)
        .then((response) => response)
        .catch((error) => error);

    return data;
}

export const patchSurvey = async (id: string, survey: SurveyRequest) => {
        const { data } = await api.patch<Response<null>>(`/surveys/${id}`, survey)
            .then((response) => response)
            .catch((error) => error);

        return data;
}

export const publishSurvey = async (id: string) => {
    const { data } = await api.patch<Response<null>>(`/surveys/${id}/publish`)
        .then((response) => response)
        .catch((error) => error);

    return data;
}

export const publishSurveyAndSave = async (surveyRequest: SurveyRequest) => {
    const { data } = await api.patch<Response<null>>(`/surveys/publish`, surveyRequest)
        .then((response) => response)
        .catch((error) => error);

    return data;
}
