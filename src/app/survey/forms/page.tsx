'use client'

import {useCallback, useEffect, useState} from "react";
import {getSurveysOwn} from "@/apis/survey";
import {SurveyResponse} from "@/apis/types/survey";
import useSurveyStore from "@/store/SurveyState";
import Button from "@/components/atoms/Button";
import {useRouter} from "next/navigation";

export default function SurveyForms() {

    const router = useRouter();
    const [surveys, setSurveys] = useState<Array<SurveyResponse>>([]);

    const { setId, reset } = useSurveyStore();

    useEffect(() => {
        retrieveList();
    }, []);

    const retrieveList = useCallback(() => {
        getSurveysOwn().then((response) => {
            setSurveys(response.result);
        })
    }, []);

    const handleOnClick = (survey?: SurveyResponse) => {

        reset();

        if(survey) setId(survey.id);

        router.push('/survey/forms/edit');
    }

    return (
        <div className={'flex flex-col gap-2'}>
            <Button color={"green"} onClick={() => handleOnClick()}>
                등록
            </Button>
            {surveys.map((survey) => (
                <Button key={survey.id} onClick={() => handleOnClick(survey)}>
                    {survey.title}
                </Button>
            ))}
        </div>
    );
}
