// get footer logo
export const getFooterLogo = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/global?&populate[0]=footer&populate[1]=footer.header`
  );
  const data = await response.json();

  return data;
};
// get footer contact one
export const getFooterContact_one = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/global?&populate[0]=footer&populate[2]=footer.contactOne&populate[3]=footer.contactOne.Information`
  );
  const data = await response.json();

  return data;
};
// get footer contact two
export const getFooterContact_two = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/global?&populate[0]=footer&populate[2]=footer.contactTwo&populate[3]=footer.contactTwo.Information`
  );
  const data = await response.json();

  return data;
};

// get footer contact two
export const getFooterQuickLink = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/global?&populate[0]=footer&populate[2]=footer.quick_link&populate[3]=footer.quick_link.Information`
  );
  const data = await response.json();

  return data;
};

// get footer copyright
export const getFooterCopyright = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/global?&populate[0]=footer&populate[2]=footer.copyright`
  );
  const data = await response.json();

  return data;
};

// get footer social_media
export const getFooterSocialMedia = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/global?&populate[0]=footer&populate[2]=footer.social_media`
  );
  const data = await response.json();

  return data;
};
