import {create} from 'zustand';
import {QuestionType, Section} from "@/app/survey/_types/survey";
import {generateUID} from "@/utils/uid";

type Actions = {
    setId: (id: string | null) => void,
    setTitle: (title: string) => void,
    setDescription: (description: string) => void,
    setSections: (sections: Section[]) => void;
    setCenter: (center: { x: number, y: number }) => void;

    addSection: () => void;
    updateSection: (sectionId: string, updateFn: (section: Section) => Section) => void;
    deleteSection: (sectionId: string) => void;
    updateSectionTitle: (sectionId: string, newTitle: string) => void;
    updateSectionDescription: (sectionId: string, newDescription: string) => void;
    addQuestion: (sectionId: string, questionType: QuestionType) => void;
    deleteQuestion: (sectionId: string, questionId: string) => void;
    updateQuestion: (sectionId: string, questionId: string, newText: string) => void;
    updateQuestionType: (sectionId: string, questionId: string, newType: QuestionType) => void;
    updateQuestionAnswer: (sectionId: string, questionId: string, newAnswers: any[]) => void;
    reset: () => void
}

type State = {
    id: string | null;
    title: string;
    description: string;
    sections: Section[];
    center: {
        x: number;
        y: number;
    }
}
const initialState: State = {
    id: null,
    title: '',
    description: '',
    sections: [],
    center: {
        x: 0,
        y: 0
    }
}

const useSurveyStore = create<State & Actions>()((set) => ({
    ...initialState,
    setId: (id: string | null) => set({id}),
    setTitle: (title: string) => {
        set({title});
    },
    setDescription: (description: string) => set({description}),
    setSections: (sections) => set({sections}),
    setCenter: (center) => set({center}),
    addSection: () => set((state) => ({
        sections: [
            ...state.sections,
            {id: generateUID(), title: '', description: '', questions: []}

        ]
    })),
    updateSection: (sectionId, updateFn) => set(state => ({
        sections: state.sections.map(section =>
            section.id === sectionId ? updateFn(section) : section
        ),
    })),

    updateSectionTitle: (sectionId, newTitle) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({
            ...section, title: newTitle
        }));
    },

    updateSectionDescription: (sectionId, newDescription) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({
            ...section, description: newDescription
        }));
    },

    deleteSection: (sectionId) => set((state) => ({
        sections: state.sections.filter(section => section.id !== sectionId)
    })),

    addQuestion: (sectionId, questionType) => set(state => {
        return {
            sections: state.sections.map(section => {
                if (section.id === sectionId) {
                    const newQuestion = {
                        id: generateUID(),
                        type: questionType,
                        question_text: '',
                        answers: [],
                        description: ''
                    };
                    return {...section, questions: [...section.questions, newQuestion]};
                }
                return section;
            })
        };
    }),

    updateQuestion: (sectionId, questionId, newText) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({
            ...section,
            questions: section.questions.map(question =>
                question.id === questionId ? {...question, question_text: newText} : question
            ),
        }));
    },

    updateQuestionAnswer: (sectionId, questionId, newAnswers) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({
            ...section,
            questions: section.questions.map(question =>
                question.id === questionId ? {...question, answers: newAnswers} : question
            ),
        }));
    },

    updateQuestionType: (sectionId, questionId, newType) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({
            ...section,
            questions: section.questions.map(question =>
                question.id === questionId ? {...question, type: newType, answers: []} : question
            ),
        }));
    },

    deleteQuestion: (sectionId, questionId) => set(state => {
        return {
            ...state,
            sections: state.sections.map(section => {
                if (section.id === sectionId) {
                    const updatedQuestions = section.questions.filter(question => {
                        return question.id !== questionId;
                    });
                    return {...section, questions: updatedQuestions};
                }
                return section;
            })
        };
    }),

    reset: () => {
        set(initialState)
    }
}));

export default useSurveyStore;