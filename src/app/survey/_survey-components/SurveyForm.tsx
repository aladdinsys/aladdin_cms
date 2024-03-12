'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import useSurveyStore from "@/store/SurveyState";
import SectionForm from "@/app/survey/_survey-components/SectionForm";
import {getSurveyById, patchSurvey, postSurvey, publishSurvey} from "@/apis/survey";
import {SurveyRequest} from "@/apis/types/survey";
import InputField from "@/components/molecule/InputField";
import Button from "@/components/atoms/Button";

const SurveyForm = () => {

    const { id, title, description, sections, setTitle, setDescription, setId, setSections, addSection, reset } = useSurveyStore();

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

            responseData = await postSurvey(surveyRequest);

            console.log(responseData);

        } catch (error) {

        }
    };

    const retrieveForm = useCallback(() => {
        if(id !== null) {
            getSurveyById(id).then((response) => {
                const {
                    title, description, content
                } = response.result;

                setTitle(title);
                setDescription(description);

                setSections(JSON.parse(content));
            })
        }

    }, [id, setDescription, setId, setSections, setTitle]);

    useEffect(() => {
        retrieveForm();
    }, [id, title, description, retrieveForm]);

    if(!sections) return <div>Loading</div>;



    return (
        <div className="survey-form-container min-w-[33%] bg-white dark:bg-gray-100 border px-8 py-4">
            <InputField id={`title`} type={"text"} defaultValue={title ?? ''} className={"text-xl"} name={"title"} label={"타이틀"} ref={titleRef} />
            <InputField id={`description`} type={"text"} defaultValue={description ?? ''} name={"description"} label={"설명"} ref={descriptionRef}/>

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
