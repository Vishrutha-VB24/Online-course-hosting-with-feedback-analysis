/* eslint-disable react/prop-types */
"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function FeedbackChart({feedbackslist}) {
  const chartData = [
    { rating: "r1", feedbacks : 0, fill: "var(--color-r1)"},
    { rating: "r2", feedbacks : 0, fill: "var(--color-r2)"},
    { rating: "r3", feedbacks : 0, fill: "var(--color-r3)"},
    { rating: "r4", feedbacks : 0, fill: "var(--color-r4)"},
    { rating: "r5", feedbacks : 0, fill: "var(--color-r5)"},
  ]

  const chartConfig = {
    feedbacks: {
      label: "Total Feedbacks",
    },
    r1: {
      label: "Very Disappointed",
      color: "#e43937",
    },
    r2: {
      label: "Disappointed",
      color: "#fc674c",
    },
    r3: {
      label: "Neutral",
      color: "#ffc236",
    },
    r4: {
      label: "Satisfied",
      color: "#9dcc2f",
    },
    r5: {
      label: "Very Satisfied",
      color: "#36ae26",
    },
  } 
  let totalFeedbacks = 0;
  
  React.useEffect(()=>{
    feedbackslist.forEach(element => {
      const rating = `r${element.label}`;
      const item = chartData.find(obj => obj.rating == rating)
      if(item){
        item.feedbacks += 1;
      }
    });
    totalFeedbacks = chartData.reduce((acc, curr) => acc + curr.feedbacks, 0)
  }, [])
  return (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="feedbacks"
              nameKey="rating"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalFeedbacks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Feedbacks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
  )
}
