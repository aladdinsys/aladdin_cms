'use client';

import {useCallback, useEffect, useState} from "react";
import {SurveyResponse} from "@/apis/types/survey";
import {getSurveysOwn} from "@/apis/survey";
import Button from "@/components/atoms/Button";
import PollForm from "@/app/survey/_survey-components/PollForm";
import SurveyResultForm from "@/app/survey/_survey-components/SurveyResultForm";

const ResultPage = () => {

    const [openPoll, setOpenPoll] = useState(false);
    const [surveys, setSurveys] = useState<Array<SurveyResponse>>([]);
    const [selectedSurvey, setSelectedSurvey] = useState<string>('');


    useEffect(() => {
        retrieveList();
    }, []);

    const retrieveList = useCallback(() => {
        getSurveysOwn().then((response) => {
            setSurveys(response.result);
        })
    }, []);

    const handleOnClick = (survey?: SurveyResponse) => {
        setOpenPoll(true);
        survey && setSelectedSurvey(survey.id);
    }

    return (
        <div className={'flex flex-col gap-2'}>
            {
                openPoll &&
                <>
                    <Button onClick={() => setOpenPoll(false)} >
                        목록으로
                    </Button>
                    <SurveyResultForm id={selectedSurvey} />
                </>
            }
            {
                !openPoll && surveys.map((survey) => (
                    <Button key={survey.id} onClick={() => handleOnClick(survey)}>
                        {survey.title}
                    </Button>
                ))
            }
        </div>
    );
}

export default ResultPage;