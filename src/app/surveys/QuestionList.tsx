import MultipleSelection from "@/app/surveys/MultipleSelection";
import Button from "@/components/atoms/Button";
import {Question} from "@/types/survey";
import {useStore} from "@/store/SurveyState";
import {useState} from "react";
import BooleanQuestion from "@/app/surveys/Boolean";

const questionTypes = [
    {label: '객관식', value: 'SHORT_ANSWER'},
    {label: '5점 리쿼트', value: 'FIVE-LIKERT'},
    {label: 'Boolean', value: 'BOOLEAN'},
    {label: '단답형', value: 'SHORT_ANSWER'},
    {label: '서술형', value: 'LONG_ANSWER'}
];

interface QuestionListProps {
    sectionId: string;
    onQuestionTypeChange: (index: number, type: Question['type']) => void;
    onDeleteQuestion: (index: number) => void;
}

const renderQuestionComponent = (question: Question) => {
    switch (question.type) {
        case 'MULTIPLE_SELECTION':
            return <MultipleSelection question_text={question.question_text}
                                      answers={question.answers.map(a => a.label)} description={question.description}
                                      id={question.id} type={question.type}/>;
      //  case "BOOLEAN":
        //    return <BooleanQuestion question={question}/>
        //  case "LONG_ANSWER":
        //      return <LongAnswer question={question} />;
        // case "FIVE-LIKERT":
        //     const likertQuestion = question
        //     return <FiveLikert question={question.question_text} options={question.answers} />;
        default:
            return null;
    }
};

const QuestionList: React.FC<QuestionListProps> = ({ sectionId }) => {
    const sections = useStore(state => state.sections);
    const currentSection = sections.find(section => section.id === sectionId);
    const questions = currentSection ? currentSection.questions : [];

    const addQuestion = useStore(state => state.addQuestion);
    const deleteQuestion = useStore(state => state.deleteQuestion);
    const updateQuestionType = useStore(state => state.updateQuestionType);

    const [questionTexts, setQuestionTexts] = useState<string[]>(questions.map(q => q.question_text || ''));


    const handleQuestionTextChange = (text: string, index: number) => {
        const updatedTexts = [...questionTexts];
        updatedTexts[index] = text;
        setQuestionTexts(updatedTexts);
    };

    const handleAddQuestion = () => {
        addQuestion(sectionId, {
            question_text: '',
            answers: [],
            description: '',
            type: 'MULTIPLE_SELECTION'
        });
        setQuestionTexts([...questionTexts, '']);
    };


    const handleQuestionTypeChange = (index: number, type: Question['type']) => {
        const questionId = questions[index].id;
        updateQuestionType(sectionId, questionId, type);
    };


    return (
        <div>
            {questions.map((question, index) => (
                <div key={question.id} className="question-item">
                    <input
                        type="text"
                        value={questionTexts[index]}
                        onChange={(e) => handleQuestionTextChange(e.target.value, index)}
                        placeholder="질문을 입력하세요"
                    />
                    <select
                        onChange={(e) => handleQuestionTypeChange(index, e.target.value as Question['type'])}
                    >
                        {questionTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    {renderQuestionComponent(question)}
                    <Button onClick={() => deleteQuestion(sectionId, question.id)}>질문 삭제</Button>
                </div>
            ))}
            <Button onClick={handleAddQuestion}>질문 추가</Button>
        </div>
    );
};


export default QuestionList;