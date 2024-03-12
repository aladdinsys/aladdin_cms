import React from 'react';
import useSurveyStore from "@/store/SurveyState";
import {ConditionalQuestion} from "@/app/survey/_types/survey";
import NextSectionSelector from "@/app/survey/_survey-components/question-components/NextSectionSelector";
import Input from "@/components/atoms/Input";
import {generateUID} from "@/utils/uid";
import Button from "@/components/atoms/Button";

interface MultipleSelectionProps {
    sectionId: string;
    question: ConditionalQuestion;
}

const MultipleSection: React.FC<MultipleSelectionProps> = ({sectionId, question}) => {
    const {updateQuestionAnswer} = useSurveyStore();


    const handleAnswerChange = (index: number, newValue: string) => {
        const updatedAnswers = question.answers.map((answer, i) => {
            if (i === index) {
                return {...answer, label: newValue};
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
            label: '',
            value: (question.answers.length + 1).toString(),
            nextSection: ''
        };
        const newAnswers = [...question.answers, newAnswer];
        updateQuestionAnswer(sectionId, question.id, newAnswers);
    };

    const handleDeleteAnswer = (index: number) => {
        const filteredAnswers = question.answers.filter((_, i) => i !== index);
        const renumberedAnswers = filteredAnswers.map((answer, i) => ({
            ...answer,
            value: (i + 1).toString(),
        }));
        updateQuestionAnswer(sectionId, question.id, renumberedAnswers);
    };

    const tempInputId = generateUID();

    return (
        <div className={"flex flex-col gap-2"}>
            {question.answers.map((answer, index) => (
                <div key={index} className={"flex flex-row gap-2 relative"}>
                    <input
                        type="checkbox"
                        className={"select-none pointer-events-none"}
                    />
                    <Input
                        name={tempInputId}
                        type="text"
                        defaultValue={answer.label}
                        onChange={(e) => handleAnswerChange(index, e.currentTarget.value)}
                    />
                    <Button color={"red"} onClick={() => handleDeleteAnswer(index)}>
                        X
                    </Button>
                </div>
            ))}
            <Button onClick={handleAddAnswer}>답변 추가</Button>
        </div>
    );
};

export default MultipleSection;
