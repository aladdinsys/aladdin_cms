'use client'

import SurveyForm from "@/app/survey/form";
import {useEffect, useState} from "react";
import {getSurveys} from "@/apis/survey";

export default function SurveysPage() {

    const [surveyId, setSurveyId] = useState(1); //수정 필요
    const [surveys, setSurveys] = useState([]);

    // TODO 서버에서 Fetching 후 정제해서 SurveyForm에 넘겨주기
    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const surveyData = await getSurveys();
                setSurveys(surveyData);
            } catch (error) {
                console.error('설문 목록을 가져오는 중 오류 발생:', error);
            }
        };
        fetchSurveys();
    }, []);


    return (
        <div className={"h-screen flex"}>
            <SurveyForm surveyId={surveyId}/>
        </div>
    );
}
