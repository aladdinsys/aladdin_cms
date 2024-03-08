import {create} from 'zustand';
import {QuestionType, Section, Survey} from "@/app/survey/types/survey";

interface SurveyState {
    survey: Survey;
    setSurveyTitle: (title: string) => void;
    setSurveyDescription: (description: string) => void;
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
}

const useSurveyStore = create<SurveyState>(set => ({
    survey: {
        title: '',
        description: '',
        contents: [],
    },

    setSurveyTitle: (title) => set((state) => ({
        survey: { ...state.survey, title: title }
    })),

    setSurveyDescription: (description) => set((state) => ({
        survey: { ...state.survey, description: description }
    })),

    addSection: () => set((state) => ({
        survey: {
            ...state.survey,
            contents: [
                ...state.survey.contents,
                { id: `${state.survey.contents.length + 1}`, title: '', description: '', questions: [] }
            ]
        }
    })),

    updateSection: (sectionId, updateFn) => set(state => ({
        survey: {
            ...state.survey,
            contents: state.survey.contents.map(section =>
                section.id === sectionId ? updateFn(section) : section
            ),
        },
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

    deleteSection: (sectionId) => set(state => {
        const updatedContentsWithNextSection = state.survey.contents.map(section => ({
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

        const filteredSections = updatedContentsWithNextSection.filter(section => section.id !== sectionId);
        const renumberedSections = filteredSections.map((section, index) => ({
            ...section,
            id: `${index + 1}`
        }));

        return {
            survey: {
                ...state.survey,
                contents: renumberedSections
            }
        };
    }),

    addQuestion: (sectionId, questionType) => set(state => {
        return {
            survey: {
                ...state.survey,
                contents: state.survey.contents.map(section => {
                    if (section.id === sectionId) {
                        const newQuestionId = `question-${section.questions.length + 1}`;
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
            }
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
                question.id === questionId ? {...question, type: newType,  answers: []} : question
            ),
        }));
    },

    deleteQuestion: (sectionId, questionId) => set(state => ({
        survey: {
            ...state.survey,
            contents: state.survey.contents.map(section => {
                if (section.id === sectionId) {
                    const updatedQuestions = section.questions.filter(question => question.id !== questionId);
                    return {
                        ...section,
                        questions: updatedQuestions
                    };
                }
                return section;
            })
        }
    })),


}));

export default useSurveyStore;