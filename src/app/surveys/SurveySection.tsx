import React, {useState} from 'react';
import QuestionList from "@/app/surveys/QuestionList";
import Button from "@/components/atoms/Button";
import {Question, QuestionType} from "@/types/survey";

interface Section {
    title: string;
    description?: string;
    questions: Question[];
}

interface SurveySectionProps {
    section: Section;
    sectionIndex: number;
    onSectionTitleChange: (title: string, index: number) => void;
    onSectionDescriptionChange?: (description: string, index: number) => void;
    onDeleteSection?: (index: number) => void;
}

const SurveySection: React.FC<SurveySectionProps> = ({
                                                         section,
                                                         sectionIndex,
                                                         onSectionTitleChange,
                                                         onSectionDescriptionChange,
                                                         onDeleteSection
                                                     }) => {
    const [questions, setQuestions] = useState<Question[]>(section.questions);

    const handleQuestionTypeChange = (index: number, type: Question['type']) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].type = type;
        setQuestions(updatedQuestions);
    };

    const handleDeleteQuestion = (questionIndex: number) => {
        const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
        setQuestions(updatedQuestions);
    };

    return (
        <div className="survey-section">
            <input
                type="text"
                value={section.title}
                onChange={(e) => onSectionTitleChange(e.target.value, sectionIndex)}
                placeholder="섹션 이름을 입력하세요"
            />
            <input
                type="text"
                value={section.description}
                onChange={(e) => onSectionDescriptionChange && onSectionDescriptionChange(e.target.value, sectionIndex)}
                placeholder="섹션 설명(선택 사항)"
            />

            <QuestionList sectionId={String(sectionIndex)}  // sectionId를 문자열로 변환하여 전달
                          onQuestionTypeChange={handleQuestionTypeChange}
                          onDeleteQuestion={handleDeleteQuestion}/>

            {onDeleteSection && (
                <Button onClick={() => onDeleteSection(sectionIndex)}>섹션 삭제</Button>
            )}
        </div>
    );
};

export default SurveySection;
