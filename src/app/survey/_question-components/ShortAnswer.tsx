import React from 'react';
import {Question} from "@/app/survey/_types/survey";
import Input from "@/components/atoms/Input";
import {generateUID} from "@/utils/uid";

interface ShortAnswerProps {
    question: Question;

}

const ShortAnswer: React.FC<ShortAnswerProps> = () => {

    const tempInputId = generateUID();

    return (
        <>
            <Input
                name={tempInputId}
                type={"text"}
                className={"bg-transparent dark:bg-transparent"}
                placeholder="단답형"
                readOnly={true}
            />
        </>
    );
};

export default ShortAnswer;
