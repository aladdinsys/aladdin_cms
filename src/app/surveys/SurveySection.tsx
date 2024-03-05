import React, { useState, ChangeEvent } from 'react';
import { Section } from "@/types/survey";
import QuestionList from "@/app/surveys/QuestionList";
import useSurveyStore from "@/store/SurveyState";

interface SurveySectionProps {
    section: Section;
}

const SurveySection: React.FC<SurveySectionProps> = ({ section }) => {
    const { addQuestion, deleteSection, updateSectionTitle, updateSectionDescription } = useSurveyStore();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateSectionTitle(section.id, e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateSectionDescription(section.id, e.target.value);
    };

    return (
        <div className="survey-section">
            <input
                type="text"
                value={section.title} // 직접 섹션의 타이틀을 사용합니다.
                onChange={handleTitleChange}
                placeholder="섹션 제목을 입력해주세요."
            />
            <input
                type="text"
                value={section.description} // 직접 섹션의 설명을 사용합니다.
                onChange={handleDescriptionChange}
                placeholder="섹션 설명을 입력해주세요."
            />
            <QuestionList questions={section.questions} sectionId={section.id} />
            <button onClick={() => addQuestion(section.id, 'BOOLEAN')}>질문 추가하기</button>
            <button onClick={() => deleteSection(section.id)}>섹션 삭제하기</button>
        </div>
    );
};

export default SurveySection;