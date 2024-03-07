import {create} from 'zustand';
import {QuestionType, Section} from "@/app/survey/types/survey";

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
            sections: [...state.sections, {id: newSectionId, title: '', description: '', questions: []}]
        };
    }),

    updateSection: (sectionId, updateFn) => set(state => ({
        sections: state.sections.map(section =>
            section.id === sectionId ? updateFn(section) : section
        ),
    })),

    updateSectionTitle: (sectionId, newTitle) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({...section, title: newTitle}));
    },

    updateSectionDescription: (sectionId, newDescription) => {
        useSurveyStore.getState().updateSection(sectionId, (section) => ({...section, description: newDescription}));
    },

    deleteSection: (sectionId) => set(state => {
        const updatedSectionsWithNextSection = state.sections.map(section => ({
            ...section,
            questions: section.questions.map(question => ({
                ...question,
                answers: question.answers.map(answer => {
                    if (answer.nextSection && answer.nextSection !== "" && answer.nextSection !== sectionId) {
                        const updatedNextSection = parseInt(answer.nextSection) > parseInt(sectionId)
                            ? `${parseInt(answer.nextSection) - 1}`
                            : answer.nextSection;
                        return { ...answer, nextSection: updatedNextSection };
                    }
                    return { ...answer, nextSection: answer.nextSection === sectionId ? "" : answer.nextSection };
                })
            }))
        }));

        // 삭제된 섹션 필터링
        const filteredSections = updatedSectionsWithNextSection.filter(section => section.id !== sectionId);

        // 섹션 ID 재배정
        const renumberedSections = filteredSections.map((section, index) => ({
            ...section,
            id: `${index + 1}`
        }));

        return {
            sections: renumberedSections
        };
    }),

    addQuestion: (sectionId, questionType) => set(state => {
        return {
            sections: state.sections.map(section => {
                if (section.id === sectionId) {
                    const newQuestionId = `${section.questions.length + 1}`;
                    const newQuestion = {
                        id: newQuestionId,
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
                question.id === questionId ? {...question, type: newType} : question
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