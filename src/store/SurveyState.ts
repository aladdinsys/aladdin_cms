import {create} from 'zustand';
import {Section, Survey, Question, QuestionType} from "@/types/survey";

interface SurveyState {
    sections: Section[];
    addSection: () => void;
    deleteSection: (sectionId: string) => void;
    addQuestion: (sectionId: string, questionType: QuestionType) => void;
    deleteQuestion: (sectionId: string, questionId: string) => void;
    updateSectionTitle: (sectionId: string, newTitle: string) => void;
    updateSectionDescription: (sectionId: string, newDescription: string) => void;
    updateQuestion: (sectionId: string, questionId: string, newText: string) => void;
}

const useSurveyStore = create<SurveyState>(set => ({
    sections: [],

    addSection: () => set(state => {
        const newSectionId = `${state.sections.length + 1}`;
        return {
            sections: [...state.sections, { id: newSectionId, title: '', description: '', questions: [] }]
        };
    }),

    updateSectionTitle: (sectionId, newTitle) => set(state => ({
        sections: state.sections.map(section =>
            section.id === sectionId
                ? { ...section, title: newTitle }
                : section
        )
    })),

    updateSectionDescription: (sectionId, newDescription) => set(state => ({
        sections: state.sections.map(section =>
            section.id === sectionId
                ? {...section, description: newDescription}
                : section
        )
    })),

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

    updateQuestion: (sectionId, questionId, newText) => set(state => ({
        sections: state.sections.map(section =>
            section.id === sectionId
                ? {
                    ...section,
                    questions: section.questions.map(question =>
                        question.id === questionId
                            ? { ...question, question_text: newText }
                            : question
                    )
                }
                : section
        )
    })),

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