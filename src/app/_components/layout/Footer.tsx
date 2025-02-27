"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getFooterContact_one,
  getFooterContact_two,
  getFooterCopyright,
  getFooterLogo,
  getFooterQuickLink,
  getFooterSocialMedia,
} from "@/app/service/Footer_api";
import Icon from "../common/Icon";
import Contact_footer from "../ui/Contact_footer";

export default function Footer() {
  const [logo, setLogo] = useState<any>({});
  const [contactOne, setContactOne] = useState<any>("");
  const [contactTwo, setContactTwo] = useState<any>("");
  const [quickLink, setQuickLink] = useState<any>({
    header: "",
    Information: [],
  });
  const [copyright, setCopyright] = useState<any>({});
  const [socialMedia, setSocialMedia] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      // get footer logo
      const data = await getFooterLogo();
      setLogo(data.data.footer.header);

      // get footer contact one
      const dataContactOne = await getFooterContact_one();
      setContactOne(dataContactOne.data.footer.contactOne);

      // get footer contact two
      const dataContactTwo = await getFooterContact_two();
      setContactTwo(dataContactTwo.data.footer.contactTwo);

      // get footer quick link
      const dataQuickLink = await getFooterQuickLink();
      setQuickLink(dataQuickLink.data.footer.quick_link);

      // get footer copyright
      const dataCopyright = await getFooterCopyright();
      setCopyright(dataCopyright.data.footer.copyright);

      // get footer social media
      const dataSocialMedia = await getFooterSocialMedia();
      setSocialMedia(dataSocialMedia.data.footer.social_media);

    };
    fetchData();
  }, []);

  if (
    !quickLink?.Information?.length &&
    !contactOne?.length &&
    !contactTwo?.length &&
    !logo?.length &&
    !copyright?.length &&
    !socialMedia?.length
  ) {
    return null;
  }

  return (
    <footer className="relative bg-gray-900 text-white mt-16">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Main Content */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              {logo.logo_text}
            </h1>
            <p className="text-gray-400 mb-6 text-sm lg:text-base">
              {logo.slogan}
            </p>
            {/* Social media */}
            <div className="flex space-x-4">
              {socialMedia?.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={item.url}
                  target={item.target}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon icon={item.icon} className="w-5 h-5 lg:w-6 lg:h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* // contact  */}
          <Contact_footer contact={contactOne} />
          <Contact_footer contact={contactTwo} />

          {/* Links */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-base lg:text-lg font-bold mb-4 lg:mb-6 flex items-center">
              <span className="inline-block w-2 h-2 bg-pink-500 mr-2"></span>
              {quickLink?.header}
            </h2>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-sm lg:text-base text-gray-400">
              {quickLink?.Information?.map((item: any, index: number) => (
                <li key={index}>
                  <Link
                    href={item.url}
                    target={item.target}
                    className="hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm lg:text-base">
            © {copyright.title}
          </p>
        </div>
      </div>
    </footer>
  );
}
