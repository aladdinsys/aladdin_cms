import React from 'react';
import {Question} from "@/types/survey";

const LongAnswer: React.FC<Question> = ({ question_text }) => {
    return (
        <div>
            <label>{question_text}</label>
            <textarea name="longAnswer" />
        </div>
    );
};

export default LongAnswer;
