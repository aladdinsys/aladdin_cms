'use client'

import {useCallback, useEffect, useState} from "react";
import {getSurveysOwn} from "@/apis/survey";
import {SurveyResponse} from "@/apis/types/survey";
import Link from "next/link";

export default function SurveyForms() {

    const [surveys, setSurveys] = useState<Array<SurveyResponse>>([]);

    useEffect(() => {
        retrieveList();
    }, []);

    const retrieveList = useCallback(() => {
        getSurveysOwn().then((response) => {
            setSurveys(response.result);
        })
    }, []);


    return (
        <div className={'flex flex-col gap-2'}>
            {surveys.map((survey) => (
                <Link href={{
                        pathname: `/survey/forms/edit`,
                        query: {id: survey.id}
                    }}
                      key={survey.id}>
                    {survey.title}
                </Link>
            ))}
        </div>
    );
}
