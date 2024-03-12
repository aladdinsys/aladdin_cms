'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import useSurveyStore from "@/store/SurveyState";
import SectionForm from "@/app/survey/forms/edit/SectionForm";
import {getSurveyById, patchSurvey, postSurvey, publishSurvey} from "@/apis/survey";
import {SurveyRequest} from "@/apis/types/survey";
import InputField from "@/components/molecule/InputField";
import Button from "@/components/atoms/Button";

export type SurveyFormProps = {
    id?: string;
}

const SurveyForm = ({id, ...props}: SurveyFormProps) => {

    const { sections, title, description, setTitle, setDescription, setSections, addSection } = useSurveyStore();

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {

        const surveyRequest: SurveyRequest = {
            title: titleRef.current?.value!,
            description: descriptionRef.current?.value!,
            content: JSON.stringify(sections)
        }

        try {
            let responseData: Response;

            if(id) {
                responseData = await patchSurvey(id, surveyRequest);
                responseData = await publishSurvey(id);
            } else {
                responseData = await postSurvey(surveyRequest);
            }

            console.log(responseData);

        } catch (error) {

        }
    };

    useEffect(() => {
        retrieveForm();
    }, []);

    const retrieveForm = useCallback(() => {
        if(id) {
            getSurveyById(id).then((response) => {
                const {
                    title, description, content
                } = response.result;

                setTitle(title);
                setDescription(description);


                setSections(JSON.parse(content));
            })
        }
    }, [id, setSections]);


    return (
        <div
            className="survey-form-container min-w-[33%] bg-white dark:bg-gray-100 border px-8 py-4"
        >
            <InputField type={"text"} defaultValue={title} className={"text-xl"} name={"title"} label={"타이틀"} ref={titleRef} />
            <InputField type={"text"} defaultValue={description} name={"description"} label={"설명"} ref={descriptionRef}/>

            <div className={"sections-wrapper flex flex-col gap-4 py-2"}>
                {sections.map((section) => (
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
