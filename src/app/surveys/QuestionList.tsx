import React from 'react';
import { Question } from "@/types/survey";
import useSurveyStore from "@/store/SurveyState";


interface QuestionListProps {
    questions: Question[];
    sectionId: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, sectionId }) => {
    const { deleteQuestion, updateQuestion } = useSurveyStore();

    return (
        <div className="question-list">
            {questions.map((question, index) => (
                <div key={question.id}>
                    <input
                        type="text"
                        value={question.question_text}
                        onChange={(e) => updateQuestion(sectionId, question.id, e.target.value)}
                    />
                    <button onClick={() => deleteQuestion(sectionId, question.id)}>질문 삭제하기</button>
                </div>
            ))}
        </div>
    );
};

export default QuestionList;
