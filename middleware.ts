import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Simple middleware for hire_genai project
  return NextResponse.next()
}
