export interface FormData {
  class: string;
  lecturer: string;
  subject: string;
  exam_day: string;
  day_close: string;
  point: string;
  duration: string;
  see_exam_results: boolean;
  status_exam: boolean;
}

export interface Question {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  results: string;
}

export interface ModalAddExamProps {
  onClose: () => void;
  setReload: (value: boolean) => void;
  reload: boolean;
  dataEdit?: any;
  setDataEdit?: (value: any) => void;
}
