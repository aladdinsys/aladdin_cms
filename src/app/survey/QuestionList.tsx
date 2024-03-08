import React from 'react';

import useSurveyStore from "@/store/SurveyState";
import BooleanQuestion from "@/app/survey/Boolean";
import LongAnswerQuestion from "@/app/survey/LongAnswer";
import ShortAnswer from "@/app/survey/ShortAnswer";
import FiveLikertQuestion from "@/app/survey/FiveLikert";
import {Question, QuestionComponentMap, QuestionType} from "@/app/survey/types/survey";
import SingleSelection from "@/app/survey/SingleSelection";
import MultipleSelection from "@/app/survey/MultipleSelection";

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

    const componentMap: QuestionComponentMap = {
        'BOOLEAN': BooleanQuestion,
        'LONG_ANSWER': LongAnswerQuestion,
        'SHORT_ANSWER': ShortAnswer,
        'FIVE-LIKERT': FiveLikertQuestion,
        'SINGLE_SELECTION': SingleSelection,
        'MULTIPLE_SELECTION': MultipleSelection,
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
