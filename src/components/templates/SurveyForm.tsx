'use client'

import React, { useState } from 'react';
import SurveySection from "@/app/surveys/SurveySection";
import {Question} from "@/types/survey";


// Section 인터페이스 정의
interface Section {
    title: string;
    questions: Question[];
}

// SurveySectionProps 인터페이스 정의
interface SurveySectionProps {
    section: Section;
    sectionIndex: number;
    onSectionTitleChange: (title: string, index: number) => void;
    onAddQuestion: (questionType: Question['type'], index: number) => void;
    onDeleteSection?: (index: number) => void;
}

const SurveyForm = () => {
    const [sections, setSections] = useState<Section[]>([]);

    const handleAddSection = () => {
        setSections([...sections, { title: '', questions: [] }]);
    };

    const handleDeleteSection = (sectionIndex: number) => {
        const updatedSections = sections.filter((_, index) => index !== sectionIndex);
        setSections(updatedSections);
    };

    const handleSectionTitleChange = (title: string, index: number) => {
        const updatedSections = sections.map((section, idx) => {
            if (idx === index) {
                return { ...section, title };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const handleAddQuestion = (questionType: Question['type'], index: number) => {
        const newQuestion: Question = { type: questionType, text: '', options: [] };
        const updatedSections = sections.map((section, idx) => {
            if (idx === index) {
                return { ...section, questions: [...section.questions, newQuestion] };
            }
            return section;
        });
        setSections(updatedSections);
    };

    return (
        <div className="survey-form-container">
            <div className="survey-title-input">
                <input type="text" placeholder="설문지 제목을 입력해주세요"/>
            </div>
            <div className="survey-description-input">
                <input type="text" placeholder="설문지 설명(선택 사항)"/>
            </div>
            {sections.map((section, index) => (
                <SurveySection
                    key={index}
                    section={section}
                    sectionIndex={index}
                    onSectionTitleChange={handleSectionTitleChange}
                    onDeleteSection={handleDeleteSection}
                />
            ))}
            <div className="add-section-button">
                <button onClick={handleAddSection}>섹션 추가</button>
            </div>
        </div>
    );
};

export default SurveyForm;
