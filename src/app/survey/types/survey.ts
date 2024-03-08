import React from "react";

export type Survey = {
    title: string;
    contents: Section[];
    description: string;
}
export type Section = {
    id: string;
    title: string;
    questions: Array<Question>;
    description: string;
}

export type QuestionComponentMap = {
    [key in QuestionType]?: React.FC<any>;
};

export type QuestionType =
    'FIVE-LIKERT' | 'BOOLEAN' | 'SHORT_ANSWER' | 'LONG_ANSWER' | 'SINGLE_SELECTION' | 'MULTIPLE_SELECTION' | 'MAP' | '';

export type Question = {
    id: string;
    type: QuestionType;
    question_text: string;
    answers: Array<any>;
    options?: QuestionOptions;
    description: string;
}

export type QuestionOptions = {
    coordinates?: [number, number];
}

export type ConditionalQuestionOption = {
    value: any;
    label: string;
    nextSection?: string;
}

export type ConditionalQuestion = Question & {
    answers: ConditionalQuestionOption[];
};
