"use client"
import { DummyUniqueVisitors } from '@/app/_data/GraphData';
import { db } from '@/utils'
import { project, projectClick, userInfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, linearGradient } from 'recharts';


function UniqueVisitors() {
    const {user}=useUser();

    const [Data,setData]=useState();
    useEffect(()=>{
        user&&GetTotalVisitors();
    },[user])
    const GetTotalVisitors=async()=>{
        const result=await db.select({
              totalClick:sql`count(${projectClick.id})`.mapWith(Number),
              month:projectClick.month,
            }).from(projectClick)
            .rightJoin(project,eq(projectClick.projectRef,project.id))
            .innerJoin(userInfo,eq(project.userRef,userInfo.id))
            .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress))
            .groupBy(projectClick.month)
            
            const finalResult=[...DummyUniqueVisitors,...result]
            setData(finalResult)
    }
    
  return (
    <div className='border rounded-lg p-7'>
      <h2 className='my-3 text-lg font-bold'>Unique Visitors</h2>
      <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                    data={Data} // Use Data instead of chartData

                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" style={{ fontSize: 12 }} />
                <YAxis style={{ fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="totalClick"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
    </div>
  )
}

export default UniqueVisitors
