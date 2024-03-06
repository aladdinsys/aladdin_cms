import React from 'react';
import {ConditionalQuestion, Question, QuestionType} from "@/types/survey";
import useSurveyStore from "@/store/SurveyState";
import BooleanQuestion from "@/app/surveys/Boolean";
import LongAnswerQuestion from "@/app/surveys/LongAnswer";
import ShortAnswer from "@/app/surveys/ShortAnswer";
import FiveLikertQuestion from "@/app/surveys/FiveLikert";


interface QuestionListProps {
    questions: Question[];
    sectionId: string;
}

const QuestionList: React.FC<QuestionListProps> = ({questions, sectionId}) => {
    const {deleteQuestion, updateQuestion, updateQuestionType} = useSurveyStore();

    const sectionStyle = {
        margin: '20px', // 원하는 마진 값을 지정
        border: '1px'
        // 추가적인 스타일을 여기에 정의할 수 있습니다
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
