import {QuestionComponentMap} from "@/app/survey/types/survey";
import BooleanQuestion from "@/app/survey/question-components/Boolean";
import LongAnswerQuestion from "@/app/survey/question-components/LongAnswer";
import ShortAnswer from "@/app/survey/question-components/ShortAnswer";
import FiveLikertQuestion from "@/app/survey/question-components/FiveLikert";
import SingleSelection from "@/app/survey/question-components/SingleSelection";
import MultipleSelection from "@/app/survey/question-components/MultipleSelection";

export const questionTypeLabels = {
    'FIVE-LIKERT': '5점 리쿼트',
    'BOOLEAN': 'BOOLEAN',
    'SHORT_ANSWER': '단답형',
    'LONG_ANSWER': '서술형',
    'SINGLE_SELECTION': '단일 선택',
    'MULTIPLE_SELECTION': '다중 선택',
    'MAP': '지도'
};

export const componentMap: QuestionComponentMap = {
    'BOOLEAN': BooleanQuestion,
    'LONG_ANSWER': LongAnswerQuestion,
    'SHORT_ANSWER': ShortAnswer,
    'FIVE-LIKERT': FiveLikertQuestion,
    'SINGLE_SELECTION': SingleSelection,
    'MULTIPLE_SELECTION': MultipleSelection,
};