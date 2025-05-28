import { NextRequest, NextResponse } from 'next/server';

/**
 * API route handler for fetching average water consumption per visit data
 */
export async function GET(request: NextRequest) {
  try {
    const facilityId = request.nextUrl.searchParams.get('facilityId');
    const weekInterval =  '4';
    // request.nextUrl.searchParams.get('weekInterval') ||
    
    if (!facilityId) {
      return NextResponse.json(
        { error: 'facilityId is required' },
        { status: 400 }
      );
    }

    // Get the API base URL and subscription key from environment variables
    const apiBaseUrl = process.env.API_BASE_URL_DASHBOARD;
    const apiSubscriptionKey = process.env.API_SUBSCRIPTION_KEY;
    const authToken = process.env.AUTH_TOKEN;

    if (!apiBaseUrl || !apiSubscriptionKey) {
      return NextResponse.json(
        { error: 'API configuration is missing' },
        { status: 500 }
      );
    }

    // Make the request to the external API
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/Consumption/AvgWaterConsumption?FacilityId=${facilityId}&WeekInterval=${weekInterval}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken || '',
            'Ocp-Apim-Subscription-Key': apiSubscriptionKey,
          },
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text().catch(() => 'Unknown error');
        console.error(`API request failed with status ${response.status}:`, errorDetail);
        return NextResponse.json(
          { error: `API request failed with status ${response.status}` },
          { status: response.status }
        );
      }
      
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error fetching from external API:', error);
      return NextResponse.json(
        { error: 'Failed to fetch data from external API' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in avgWaterPerVisit API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
