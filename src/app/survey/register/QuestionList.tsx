import React from 'react';

import useSurveyStore from "@/store/SurveyState";
import {Question, QuestionType} from "@/app/survey/_types/survey";
import {componentMap, questionTypeLabels} from "@/app/survey/_constants";

interface QuestionListProps {
    questions: Question[];
    sectionId: string;
}

const QuestionList: React.FC<QuestionListProps> = ({questions, sectionId}) => {
    const {deleteQuestion, updateQuestion, updateQuestionType} = useSurveyStore();

    const sectionStyle = {
        margin: '20px',
        border: '1px'
    };

    return (
        <div className="question-list">
            {questions.map((question) => {
                const SpecificQuestionComponent = componentMap[question.type];
                const props = {
                    question,
                    ...(componentMap[question.type] && {sectionId})
                };

                return (
                    <div key={question.id} style={sectionStyle}>
                        <input
                            type="text"
                            value={question.question_text}
                            onChange={(e) => updateQuestion(sectionId, question.id, e.target.value)}
                            placeholder="질문을 입력해주세요"
                        />

                        <select
                            value={question.type}
                            onChange={(e) => updateQuestionType(sectionId, question.id, e.target.value as QuestionType)}
                        >
                            {Object.entries(questionTypeLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>

                        {SpecificQuestionComponent ? <SpecificQuestionComponent {...props} /> : null}
                        <button onClick={() => deleteQuestion(sectionId, question.id)}>질문 삭제하기</button>
                    </div>
                );
            })}
        </div>
    );
};

export default QuestionList;
