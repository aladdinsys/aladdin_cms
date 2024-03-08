'use client'

import React, {useState} from 'react';
import useSurveyStore from "@/store/SurveyState";
import SurveySection from "@/app/survey/SurveySection";

const SurveyForm = () => {
    const {sections, addSection} = useSurveyStore();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        const surveyData = {
            title,
            description,
            sections
        };
        console.log("설문 데이터:", surveyData);
    };

    return (
        <div className="survey-form-container">
            <input
                type="text"
                placeholder="제목 없는 설문지"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="설문지 설명(선택 사항)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {sections.map((section, index) => (
                <SurveySection key={section.id} section={section}
                />
            ))}
            <button onClick={addSection}>섹션 추가하기</button>
            <button onClick={handleSubmit}>제출하기</button>
        </div>
    );
};

export default SurveyForm;
