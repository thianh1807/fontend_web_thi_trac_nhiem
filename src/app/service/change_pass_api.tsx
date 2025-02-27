// đổi mật khẩu
export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzM4MDY3NjQ2LCJleHAiOjE3NDA2NTk2NDZ9.WegL8P1K-8ruM5kEgiGiF-WQNTidCF7GeRxHSCK-7FY`,
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      }),
    }
  );
  const data = await response.json();

  return data;
};
