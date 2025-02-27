import { toast } from "react-toastify";

// Thêm bài thi
export const getItemExamQuestion = async (
  question: any,
  formData: any,
  magv: any
) => {
  toast.dismiss();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_API_KEY_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        class: formData.class,
        subject: formData.subject,
        lecturer: formData.lecturer,
        exam_day: formData.exam_day,
        see_exam_results: formData.see_exam_results,
        point: formData.point,
        duration: formData.duration,
        status_exam: formData.status_exam,
        day_close: formData.day_close,
        question: question,
        magv: magv,
      },
    }),
  });
  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.message);
  }
  toast.success(data.message);
  return data;
};

// xóa bài thi
export const deleteExam = async (id: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_KEY_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.message);
  }
  toast.success(data.message);
  return data;
};

// detail exam
export const getDetailExam = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${id}?populate=*`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_API_KEY_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Có lỗi xảy ra khi lấy dữ liệu");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching exam details:", error);
    throw new Error(error.message || "Có lỗi xảy ra khi lấy dữ liệu");
  }
};

// update exam
export const updateExam = async (
  id: any,
  formData: any,
  question: any,
  magv: any
) => {
  toast.dismiss();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_KEY_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          class: formData.class,
          subject: formData.subject,
          lecturer: formData.lecturer,
          exam_day: formData.exam_day,
          see_exam_results: formData.see_exam_results,
          point: formData.point,
          duration: formData.duration,
          status_exam: formData.status_exam,
          day_close: formData.day_close,
          magv: magv,
          question: question,
        },
      }),
    }
  );
  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.message);
  }
  toast.success(data.message);
  return data;
};
