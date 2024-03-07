'use client';

import {useEffect} from "react";
import {getSurveys} from "@/apis/survey";
import {SurveyResponse} from "@/apis/types/survey";
import useSurveyState from "@/store/SurveyState";

export default function MyPageForm(){
    const { survey, setSurvey } = useSurveyState();


    useEffect(() => {
        getSurveys()
            .then(result => {
                setSurvey(result.result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [setSurvey]);

    if (!survey) {
        return <div>Loading...</div>;
    }

    return (
            <div>
                {survey.map((survey: SurveyResponse) =>
                    <div key={survey.id}>
                        <h2>{survey.title}</h2>
                    </div>
                )}
            </div>
    );
}

