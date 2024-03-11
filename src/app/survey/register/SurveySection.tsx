import React, {ChangeEvent} from 'react';

import QuestionList from "@/app/survey/register/QuestionList";
import useSurveyStore from "@/store/SurveyState";
import {Section} from "@/app/survey/_types/survey";

interface SurveySectionProps {
    section: Section;
}

const SurveySection: React.FC<SurveySectionProps> = ({section}) => {

    const sectionStyle = {
        margin: '20px',
    };

    const {deleteSection, updateSectionTitle, updateSectionDescription, addQuestion} = useSurveyStore();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateSectionTitle(section.id, e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateSectionDescription(section.id, e.target.value);
    };

    return (
        <div className="survey-section" style={sectionStyle}>
            <input
                type="text"
                value={section.title}
                onChange={handleTitleChange}
                placeholder="섹션 제목을 입력해주세요."
            />
            <input
                type="text"
                value={section.description}
                onChange={handleDescriptionChange}
                placeholder="섹션 설명을 입력해주세요."
            />
            <QuestionList questions={section.questions} sectionId={section.id}/>
            <button onClick={() => addQuestion(section.id, 'FIVE-LIKERT')}>질문 추가하기</button>
            <button onClick={() => deleteSection(section.id)}>섹션 삭제하기</button>
        </div>
    );
};

export default SurveySection;