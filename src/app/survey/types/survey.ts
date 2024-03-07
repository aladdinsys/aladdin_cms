export interface Survey {
    title: string;
    sections: Array<Section>;
    description: string;
}
export interface Section {
    id: string;
    title: string;
    questions: Array<Question>;
    description: string;
}

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

export interface ConditionalQuestionOption {
    value: any;
    label: string;
    nextSection?: string;
}

export interface ConditionalQuestion extends Question {
    answers: ConditionalQuestionOption[];
}