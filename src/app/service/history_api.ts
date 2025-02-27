//  lưu lại lịch sử thi
export const setHistoryExam = async (
  dataUsers: any,
  dataQuestion: any,
  selectedAnswers: any
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/history-exam`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_KEY_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            msv: dataUsers.information_user.mav,
            username: dataUsers.username,
            subject: dataQuestion.subject,
            class: dataUsers.information_user.class,
            namelecturer: dataQuestion.lecturer,
            mgv: dataQuestion.magv,
            answer: selectedAnswers,
            duration: dataQuestion.duration,
            exam_day: new Date().toISOString(),
            point: dataQuestion.point,
          },
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {}
};

// lấy lịch sử thi
export const getHistoryExam = async (
  page: number,
  searchTerm: string,
  mgv: any
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/history-exam?populate=*&pagination[page]=${page}&pagination[pageSize]=20&filters[$or][0][subject][$containsi]=${searchTerm}&filters[$or][1][msv][$containsi]=${searchTerm}&filters[$or][2][username][$containsi]=${searchTerm}&filters[$or][3][class][$containsi]=${searchTerm}&filters[$or][4][namelecturer][$containsi]=${searchTerm}&filters[mgv][$containsi]=${mgv}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử thi:", error);
    throw error;
  }
};
