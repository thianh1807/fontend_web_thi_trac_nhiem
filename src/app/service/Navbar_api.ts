import { getCookie } from "cookies-next";

// get navbar logo
export const getLogo = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/global?&populate[0]=navbar&populate[1]=navbar.logo`
  );
  const data = await response.json();

  return data;
};
// get navbar items
export const getNavItems = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/global?&populate[0]=navbar&populate[1]=navbar.items`
  );
  const data = await response.json();

  return data;
};

// get navbar btn

export const getNavBtn = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/global?&populate[0]=navbar&populate[1]=navbar.btn_nav`
  );
  const data = await response.json();

  return data;
};

// thông tin user 
export const getUserInfo = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`,
      },
    }
  );
  const data = await response.json();

  return data;
};


