import { NextResponse, NextRequest } from 'next/server'
import { mockProjects, searchProjects, getProjectsByIndustry, getProjectsByJobType } from '@/data/mockProjects'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const search = url.searchParams.get('search')
    const industry = url.searchParams.get('industry')
    const jobType = url.searchParams.get('jobType')

    let projects = mockProjects

    if (search) {
      projects = searchProjects(search)
    } else if (industry) {
      projects = getProjectsByIndustry(industry)
    } else if (jobType) {
      projects = getProjectsByJobType(jobType)
    }

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Fetch projects error:', error)
    return NextResponse.json({ error: '获取项目列表失败' }, { status: 500 })
  }
}
