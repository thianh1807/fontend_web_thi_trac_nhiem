// get home page
export const getHomeSectionHero = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/home?populate=hero_section.panner`
  );
  const data = await response.json();

  return data;
};

// get home features_section
export const getHomeSectionFeature = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/home?populate[0]=features_section&populate[2]=features_section.section_items`
  );
  const data = await response.json();

  return data;
};

// get home statistics_section
export const getHomeSectionStatistics = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/home?populate[0]=statistics_section`
  );
  const data = await response.json();

  return data;
};
