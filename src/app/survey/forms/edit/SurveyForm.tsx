'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import useSurveyStore from "@/store/SurveyState";
import SectionForm from "@/app/survey/forms/edit/SectionForm";
import {getSurveyById, postSurvey} from "@/apis/survey";
import {SurveyRequest} from "@/apis/types/survey";
import InputField from "@/components/molecule/InputField";
import Button from "@/components/atoms/Button";

export type SurveyFormProps = {
    id?: string;
}

const SurveyForm = ({id, ...props}: SurveyFormProps) => {

    const { sections, setSections, addSection } = useSurveyStore();

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {

        const surveyRequest: SurveyRequest = {
            title: titleRef.current?.value!,
            description: descriptionRef.current?.value!,
            content: JSON.stringify({contents: sections})
        }

        try {
            const responseData = await postSurvey(surveyRequest);
        } catch (error) {

        }
    };

    const [
        surveyFormProps,
        setSurveyFormProps
    ] = useState<SurveyFormProps>({});

    useEffect(() => {
        retrieveForm();
    }, []);

    const retrieveForm = useCallback(() => {
        if(id) {
            getSurveyById(id).then((response) => {
                const {
                    title, description, content
                } = response.result;
                setSections(JSON.parse(content));
            })
        }
    }, [id, setSections]);

    return (
        <div
            className="survey-form-container"
        >
            <InputField type={"text"} name={"title"} label={"타이틀"} ref={titleRef} />
            <InputField type={"text"} name={"description"} label={"설명"} ref={descriptionRef}/>

            <div className={"sections-wrapper flex flex-col gap-4 p-2"}>
                {id && sections.map((section) => (
                    <SectionForm key={section.id} section={section}/>
                ))}
            </div>

            <div className={"button-wrapper flex flex-row justify-end gap-4"}>
                <Button onClick={addSection}>섹션 추가 하기</Button>
                <Button color={'gray'} onClick={handleSubmit}>제출 하기</Button>
            </div>
        </div>
    );
};

export default SurveyForm;
