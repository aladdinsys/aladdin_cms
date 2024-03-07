import React from 'react';

import useSurveyStore from "@/store/SurveyState";
import BooleanQuestion from "@/app/survey/Boolean";
import LongAnswerQuestion from "@/app/survey/LongAnswer";
import ShortAnswer from "@/app/survey/ShortAnswer";
import FiveLikertQuestion from "@/app/survey/FiveLikert";
import {ConditionalQuestion, Question, QuestionType} from "@/app/survey/types/survey";
import Selection from "@/app/survey/Selection";

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

    const questionTypeLabels = {
        'FIVE-LIKERT': '5점 리쿼트',
        'BOOLEAN': 'BOOLEAN',
        'SHORT_ANSWER': '단답형',
        'LONG_ANSWER': '서술형',
        'SINGLE_SELECTION': '단일 선택',
        'MULTIPLE_SELECTION': '다중 선택',
        'MAP': '지도'
    };

    const renderQuestionComponent = (question: ConditionalQuestion) => {
        switch (question.type) {
            case 'BOOLEAN':
                return <BooleanQuestion
                    question={question}
                    sectionId={sectionId}
                />
            case 'LONG_ANSWER':
                return <LongAnswerQuestion
                    question={question}
                />
            case 'SHORT_ANSWER':
                return <ShortAnswer
                    question={question}
                />
            case 'FIVE-LIKERT':
                return <FiveLikertQuestion
                    sectionId={sectionId}
                    question={question}
                />
            case 'SINGLE_SELECTION':
                return <Selection
                    sectionId={sectionId}
                    question={question}
                />
            case 'MULTIPLE_SELECTION':
                return <Selection
                    sectionId={sectionId}
                    question={question}
                />
            default:
                return null;
        }
    };

    return (
        <div className="question-list">
            {questions.map((question) => (
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

                    {renderQuestionComponent(question)}
                    <button onClick={() => deleteQuestion(sectionId, question.id)}>질문 삭제하기</button>
                </div>
            ))}
        </div>
    );
};

export default QuestionList;
