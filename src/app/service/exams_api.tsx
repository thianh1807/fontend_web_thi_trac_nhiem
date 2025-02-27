// hiện thị các bài thi
export const getItemExam = async (
  mgv: any,
  searchTerm: string,
  _class: any
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams?filters[${
      mgv ? "magv" : "class"
    }][$containsi]=${
      mgv ? mgv : _class
    }&filters[$or][0][subject][$containsi]=${searchTerm}&filters[$or][1][class][$containsi]=${searchTerm}&filters[$or][2][lecturer][$containsi]=${searchTerm}`,
    {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${process.env.NEXT_API_KEY_TOKEN}`,
      },
    }
  );
  const data = await response.json();

  return data;
};
