// import { auth0 } from '@/lib/auth0';
import { NextResponse } from 'next/server';

/**
 * API route handler for water consumption data
 */
export async function GET(request: Request) {
  try {
    // Get parameters from the URL query parameters
    const { searchParams } = new URL(request.url);
    const facilityId = searchParams.get('facilityId');
    const weekInterval = searchParams.get('weekInterval') || '4'; // Default to 4 weeks

    if (!facilityId) {
      return NextResponse.json({ error: 'facilityId is required' }, { status: 400 });
    }
    // const session = await auth0.getSession();
    // let accessToken;
    // if (session) {
    //   accessToken = session.tokenSet.accessToken;
    // }
    const API_URL = `${process.env.API_BASE_URL_DASHBOARD}/api/Consumption/AvgWaterConsumption?FacilityId=${facilityId}&WeekInterval=${weekInterval}`;

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
        'Ocp-Apim-Subscription-Key': process.env.API_SUBSCRIPTION_KEY || ''
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorDetail = await response.text().catch(() => 'Unknown error');
      return NextResponse.json({ error: `API request failed with status ${response.status}`, detail: errorDetail }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in water consumption API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
