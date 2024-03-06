import {create} from 'zustand';
import {Section, QuestionType} from "@/types/survey";

interface SurveyState {
    sections: Section[];
    addSection: () => void;
    updateSection: (sectionId: string, updateFn: (section: Section) => Section) => void;
    deleteSection: (sectionId: string) => void;
    addQuestion: (sectionId: string, questionType: QuestionType) => void;
    deleteQuestion: (sectionId: string, questionId: string) => void;
    updateSectionTitle: (sectionId: string, newTitle: string) => void;
    updateSectionDescription: (sectionId: string, newDescription: string) => void;
    updateQuestion: (sectionId: string, questionId: string, newText: string) => void;
    updateQuestionType: (sectionId: string, questionId: string, newType: QuestionType) => void;
    updateQuestionAnswer: (sectionId: string, questionId: string, newAnswers: any[]) => void;
}

const useSurveyStore = create<SurveyState>(set => ({
    sections: [],

    addSection: () => set(state => {
        const newSectionId = `${state.sections.length + 1}`;
        return {
            sections: [...state.sections, { id: newSectionId, title: '', description: '', questions: [] }]
        };
    }),

    updateSection: (sectionId, updateFn) => set(state => ({
        sections: state.sections.map(section =>
            section.id === sectionId ? updateFn(section) : section
        ),
    })),

    updateSectionTitle: (sectionId, newTitle) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({ ...section, title: newTitle }));
    },

    updateSectionDescription: (sectionId, newDescription) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({ ...section, description: newDescription }));
    },

    deleteSection: (sectionId) => set(state => {
        const updatedSections = state.sections.filter(section => section.id !== sectionId);
        const renumberedSections = updatedSections.map((section, index) => {
            const newSectionId = `${index + 1}`;
            return {
                ...section,
                id: newSectionId,
            };
        });
        return {
            sections: renumberedSections
        };
    }),

    addQuestion: (sectionId, questionType) => set(state => {
        return {
            sections: state.sections.map(section => {
                if (section.id === sectionId) {
                    const newQuestionId = `${section.questions.length + 1}`;
                    const newQuestion = { id: newQuestionId, type: questionType, question_text: '', answers: [], description: '' };
                    return { ...section, questions: [...section.questions, newQuestion] };
                }
                return section;
            })
        };
    }),

    updateQuestion: (sectionId, questionId, newText) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({
            ...section,
            questions: section.questions.map(question =>
                question.id === questionId ? { ...question, question_text: newText } : question
            ),
        }));
    },

    updateQuestionAnswer: (sectionId, questionId, newAnswers) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({
            ...section,
            questions: section.questions.map(question =>
                question.id === questionId ? { ...question, answers: newAnswers } : question
            ),
        }));
    },

    updateQuestionType: (sectionId, questionId, newType) =>{
        useSurveyStore.getState().updateSection(sectionId, (section) => ({
            ...section,
            questions: section.questions.map(question =>
                question.id === questionId ? { ...question, type: newType } : question
            ),
        }));
    },

    deleteQuestion: (sectionId, questionId) => set(state => ({
        sections: state.sections.map(section => {
            if (section.id === sectionId) {
                const updatedQuestions = section.questions.filter(question => question.id !== questionId);
                const renumberedQuestions = updatedQuestions.map((question, qIndex) => ({
                    ...question,
                    id: `${qIndex + 1}`
                }));
                return {
                    ...section,
                    questions: renumberedQuestions
                };
            }
            return section;
        })
    })),

}));

export default useSurveyStore;