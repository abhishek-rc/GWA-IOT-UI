// import { useAccessToken } from '@/hooks/useAccessToken';
// import { auth0 } from '@/lib/auth0';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_URL = `${process.env.API_BASE_URL_SAMPLE}/api/BuildingManagement/CbmsGetBuildingDetails`;
    // const session = await auth0.getSession();
    // let accessToken;
    // if (session) {
    //   accessToken = session.tokenSet.accessToken;
    // }
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
      const errorDetail = await response.text().catch(() => 'Could not read error response');
      return NextResponse.json({ error: `API request failed with status ${response.status}`, detail: errorDetail }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching building details:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch building data',
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
