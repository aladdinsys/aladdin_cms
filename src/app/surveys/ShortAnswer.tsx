import React from 'react';
import {Question} from "@/types/survey";

const ShortAnswer: React.FC<Question> = ({ question_text }) => {
    return (
        <div>
            <label>{question_text}</label>
            <input type="text" name="shortAnswer" />
        </div>
    );
};

export default ShortAnswer;
