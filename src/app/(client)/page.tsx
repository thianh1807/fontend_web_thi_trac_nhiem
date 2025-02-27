"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, user } from "@nextui-org/react";

import {
  getHomeSectionFeature,
  getHomeSectionHero,
  getHomeSectionStatistics,
} from "../service/home_api";
import Icon from "../_components/common/Icon";
import Loading from "../_components/common/Loading";

const Introduction = () => {
  const [dataHeroSection, setDataHeroSection] = useState<any>(null);
  const [dataFeatureSection, setDataFeatureSection] = useState<any>(null);
  const [dataStatisticsSection, setDataStatisticsSection] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      // get hero section
      const data = await getHomeSectionHero();
      setDataHeroSection(data.data.hero_section);
      

      // get features section
      const dataFeature = await getHomeSectionFeature();
      setDataFeatureSection(dataFeature.data.features_section);

      // get statistics section
      const dataStatistics = await getHomeSectionStatistics();
      setDataStatisticsSection(dataStatistics.data.statistics_section);
    };

    fetchData();
  },[]);
  if (!dataHeroSection || !dataFeatureSection || !dataStatisticsSection)
    return <Loading />;
  return (
    <div className="min-h-screen bg-white mt-[5rem]">
      {/* Hero Section */}
      <h1>{dataHeroSection.url}</h1>
      <div className="relative h-[600px] w-full ">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${dataHeroSection.panner.url}`}
          alt={dataHeroSection.panner.name || "image panne"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center text-white px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <Icon
                icon={dataHeroSection?.icon}
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {dataHeroSection?.header}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl"
            >
              {dataHeroSection?.content}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-16"
        >
          {dataFeatureSection?.header}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {dataFeatureSection.section_items.map((feature: any, index: any) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="w-full h-[14rem]"
            >
              <Card className="shadow-lg h-full">
                <CardHeader className="pb-2 pt-6 px-6">
                  <div className="flex flex-col gap-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-blue-600"
                    >
                      <Icon icon={feature.icon} size={40} />
                    </motion.div>
                    <h4 className="text-xl font-bold">{feature.title}</h4>
                  </div>
                </CardHeader>
                <CardBody className="pb-6 px-6">
                  <p className="text-gray-600 text-md">{feature.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {dataStatisticsSection.map((stat: any, index: any) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex justify-center mb-4 text-blue-600"
                >
                  <Icon icon={stat.icon} size={40} />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-blue-600"
                >
                  {stat.value}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                  className="mt-2 text-gray-600"
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
