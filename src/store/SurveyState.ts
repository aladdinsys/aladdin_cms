import { create } from 'zustand';
import { Question } from "@/types/survey";

type QuestionState = Question;

type SectionState = {
    id: string;
    title: string;
    questions: QuestionState[];
};

type State = {
    sections: SectionState[];
    addSection: (title: string) => void;
    addQuestion: (sectionId: string, question: Omit<QuestionState, 'id'>) => void;
    deleteQuestion: (sectionId: string, questionId: string) => void;
    updateQuestionType: (sectionId: string, questionId: string, type: QuestionState['type']) => void;
    updateAnswer: (sectionId: string, questionId: string, answerIndex: number, newLabel: string) => void;
};

export const useStore = create<State>((set) => ({
    sections: [],
    addSection: (title) => set((state) => {
        const newSectionId = String(state.sections.length + 1); // id를 문자열로 생성
        return {
            sections: [...state.sections, { id: newSectionId, title, questions: [] }]
        };
    }),
    addQuestion: (sectionId, question) => set((state) => ({
        sections: state.sections.map(section => {
            if (section.id === sectionId) {
                const newQuestionId = String(section.questions.length + 1); // id를 문자열로 생성
                return {
                    ...section,
                    questions: [...section.questions, { ...question, id: newQuestionId }]
                };
            }
            return section;
        })
    })),

    deleteQuestion: (sectionId, questionId) => set((state) => ({
        sections: state.sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    questions: section.questions.filter(question => question.id !== questionId)
                };
            }
            return section;
        })
    })),
    updateQuestionType: (sectionId, questionId, type) => set((state) => ({
        sections: state.sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    questions: section.questions.map(question => {
                        if (question.id === questionId) {
                            return { ...question, type };
                        }
                        return question;
                    })
                };
            }
            return section;
        })
    })),
    updateAnswer: (sectionId, questionId, answerIndex, newLabel) => set((state) => ({
        sections: state.sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    questions: section.questions.map(question => {
                        if (question.id === questionId) {
                            const newAnswers = question.answers.map((option, index) => {
                                if (index === answerIndex) {
                                    return { ...option, label: newLabel };
                                }
                                return option;
                            });
                            return { ...question, answers: newAnswers };
                        }
                        return question;
                    })
                };
            }
            return section;
        })
    })),
}));
