import React from 'react';
import {Question} from "@/types/survey";

const MultipleSelection: React.FC<Question> = ({question_text, answers}) => {
    return (
        <div>
            <label>{question_text}</label>
            {answers.map((option, index) => (
                <label key={index}>
                    <input type="text" name="MULTIPLE_SELECTION" value={option}/>
                    {option}
                </label>
            ))}
        </div>
    );
};

export default MultipleSelection;
