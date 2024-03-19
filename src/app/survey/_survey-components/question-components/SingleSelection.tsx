import React from 'react';
import useSurveyStore from "@/store/SurveyState";
import {ConditionalQuestion} from "@/app/survey/_types/survey";
import NextSectionSelector from "@/app/survey/_survey-components/question-components/NextSectionSelector";
import Input from "@/components/atoms/Input";
import {generateUID} from "@/utils/uid";
import Button from "@/components/atoms/Button";

interface SingleSelectionProps {
    sectionId: string;
    question: ConditionalQuestion;
}

const SingleSelection: React.FC<SingleSelectionProps> = ({sectionId, question}) => {
    const {updateQuestionAnswer} = useSurveyStore();


    const handleAnswerChange = (answerId: string, newText: string) => {
        const updatedAnswers = question.answers.map(answer => {
            if (answer.id === answerId) {
                return {...answer, label: newText, value: newText};
            }
            return answer;
        });
        updateQuestionAnswer(sectionId, question.id, updatedAnswers);
    };

    const handleAddAnswer = () => {
        if (question.answers.length > 10) {
            alert('최대 10개의 옵션만 추가할 수 있습니다.');
            return;
        }
        const newAnswer = {
            id: generateUID(),
            label: '',
            value: '',
            nextSection: ''
        };
        const newAnswers = [...question.answers, newAnswer];
        updateQuestionAnswer(sectionId, question.id, newAnswers);
    };

    const handleDeleteAnswer = (answerId: string) => {
        const filteredAnswers = question.answers.filter(answer => answer.id !== answerId);
        updateQuestionAnswer(sectionId, question.id, filteredAnswers);
    };

    return (
        <div className={"flex flex-col gap-2"}>
            {question.answers.map((answer) => (
                <div key={answer.id} className={"flex flex-row gap-2 relative"}>
                    <input
                        type="checkbox"
                        className={"select-none pointer-events-none"}
                    />
                    <Input
                        id={answer.id}
                        name={answer.id}
                        type="text"
                        value={answer.label}
                        onChange={(e) => handleAnswerChange(answer.id, e.currentTarget.value)}
                    />
                    <NextSectionSelector sectionId={sectionId} questionId={question.id} answerValue={answer.value}/>
                    <Button color={"red"} onClick={() => handleDeleteAnswer(answer.id)}>
                        X
                    </Button>
                </div>
            ))}
            <Button color={"green"} onClick={handleAddAnswer}>답변 추가</Button>
        </div>
    );
};

export default SingleSelection;
