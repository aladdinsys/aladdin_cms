import React from 'react';
import {ConditionalQuestion, Question, QuestionType} from "@/types/survey";
import useSurveyStore from "@/store/SurveyState";
import BooleanQuestion from "@/app/surveys/Boolean";
import LongAnswerQuestion from "@/app/surveys/LongAnswer";


interface QuestionListProps {
    questions: Question[];
    sectionId: string;
}

const QuestionList: React.FC<QuestionListProps> = ({questions, sectionId}) => {
    const {deleteQuestion, updateQuestion, updateQuestionType, updateQuestionAnswer} = useSurveyStore();

    const questionTypeLabels = {
        'FIVE-LIKERT': '5점 리쿼트',
        'BOOLEAN': 'BOOLEAN',
        'SHORT_ANSWER': '단답형',
        'LONG_ANSWER': '서술형',
        'SINGLE_SELECTION': '단일 선택',
        'MULTIPLE_SELECTION': '다중 선택'
    };

    const renderQuestionComponent = (question: ConditionalQuestion) => {
        switch (question.type) {
            case 'BOOLEAN':
                return <BooleanQuestion
                    question={question}
                    updateQuestionAnswer={(newAnswers) => updateQuestionAnswer(sectionId, question.id, newAnswers)}/>;
            case 'LONG_ANSWER':
                return <LongAnswerQuestion
                    question={question}
                />

            default:
                return null;
        }
    };

    return (
        <div className="question-list">
            {questions.map((question, index) => (
                <div key={question.id}>
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
                        {Object.entries(questionTypeLabels)
                            .filter(([value, _]) => value !== 'MAP')
                            .map(([value, label]) => (
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
