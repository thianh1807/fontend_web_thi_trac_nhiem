export interface Question {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  results: string;
}

export interface FormData {
  subject: string;
  duration: string;
  point: string;
  lecturer: string;
  status_exam: boolean;
}

export interface ModalAddPracticeProps {
  isOpenModalCreate: boolean;
  setIsOpenModalCreate: (value: boolean) => void;
  practiceEdit: any;
  setPracticeEdit: (value: any) => void;
  setRefresh: (value: any) => void;
}
