// get practice page
export const getPracticePage = async (page: number, searchTerm: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/practices?pagination[page]=${page}&pagination[pageSize]=15&filters[subject][$containsi]=${searchTerm}&populate=*`
  );
  const data = await response.json();

  return data;
};

// get detail practice
export const getPracticeDetail = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/practices/${id}?populate=*`
  );
  const data = await response.json();
  return data;
};

// xóa bài thi
export const DeletePractice = async (id: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/practices/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_KEY_TOKEN}`,
      },
    }
  );
  const data = await response.json();

  return data;
};

// thêm bài thi
export const addPractice = async (_data: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/practices`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_KEY_TOKEN}`,
      },
      body: JSON.stringify({ data: _data }),
    }
  );
  const data = await response.json();
  console.log("response", data);

  return data;
};

// update practice
export const updatePractice = async (_data: any, documentId: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/practices/${documentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_KEY_TOKEN}`,
      },
      body: JSON.stringify({ data: _data }),
    }
  );
  const data = await response.json();
  return data;
};
