"use client"
import { db } from '@/utils';
import { project, projectClick, userInfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function ProjectVisitors() {
  const { user } = useUser();
  const [data, setData] = useState([]);
  useEffect(() => {
    user && projectAnalyticsData();
  }, [user])
  const projectAnalyticsData = async () => {
    const result = await db.select({
      totalClick: sql`count(${projectClick.id})`.mapWith(Number),
      name: project.name,
      projectId: projectClick.projectRef
    }).from(projectClick)
      .rightJoin(project, eq(projectClick.projectRef, project.id))
      .innerJoin(userInfo, eq(project.userRef, userInfo.id))
      .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress))
      .groupBy(projectClick.projectRef, project.name)
    setData(result);
    // setProjectClickData(result)

    console.log(result);
  }
  return (
    <div className='border rounded-lg p-7'>
      <h2 className='my-3 text-lg font-bold'>Project Visitors</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalClick" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProjectVisitors
