import {ElasticQuery} from "@/apis/types/survey_elastic";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ELASTIC_URL as string;
export const getResultsBySurveyId = async (query: ElasticQuery<any>) => {
    const { data } = await axios.post(`${baseUrl}/surveys/_search/`,
        query,
        { headers: { 'Content-Type': 'application/json', }}
    );

    return data;
}

export const getResultByQuery = async (query: ElasticQuery<any>) => {
    const { data } = await axios.post(`${baseUrl}/surveys/_search/`,
        query,
        {headers: { 'Content-Type': 'application/json', },
    });

    return data;
}