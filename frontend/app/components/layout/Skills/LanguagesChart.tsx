'use client';
import { usePortfolio } from '@/app/context/PortfolioContext';
import React from 'react';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

const LanguagesChart = ({title} : {title?: string}) => {
  const { wakaTimeData } = usePortfolio();
  
  const id = "pie-interactive";
  
  const filteredLanguages = wakaTimeData.filter((lang) => lang.hours > 10).sort((a, b) => b.hours - a.hours);

  const chartConfig: ChartConfig = {};
  filteredLanguages.forEach((lang) => {
    const name = lang.name as string;
    chartConfig[name] = {
      label: lang.name,
      color: lang.color,
    };
  });

  const chartData = filteredLanguages.map((lang) => ({
    name: lang.name,
    hours: lang.hours,
    fill: lang.color,
  }));

  return (
    <div className='w-full sm:w-[50%] lg:w-[40%] xl:w-[30%]'>
      <Card data-chart={id} className="flex flex-col backdrop-blur-sm bg-white/60 dark:bg-black/60 text-gray-900 dark:text-gray-200">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader>
          <CardTitle className='text-2xl lg:text-3xl text-center'>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-0 h-[20rem] sm:h-fit">
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full"
          >
            <PieChart>
              <ChartLegend
                verticalAlign='bottom'
                content={<ChartLegendContent nameKey="name" payload={chartData}/>}
                className="flex-wrap gap-2 lg:text-[1.2rem] *:basis-1/4 *:justify-center"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="hours"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
};

export default LanguagesChart;
