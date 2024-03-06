'use client';

import {useEffect, useState} from "react";
import {getSurveys} from "@/apis/survey";
import {SurveyResponse} from "@/apis/types/survey";

export default function MyPageForm(){
    const [data, setData] = useState<SurveyResponse[]>([]);

    useEffect(() => {
        getSurveys()
            .then(result => {
                setData(result.result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
            <div>
                {data.map((survey: SurveyResponse) =>
                    <div key={survey.id}>
                        <h2>{survey.title}</h2>
                    </div>
                )}
            </div>
    );
}

