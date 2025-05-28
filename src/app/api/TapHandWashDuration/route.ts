import { NextRequest, NextResponse } from 'next/server';

/**
 * API route handler for fetching hand wash duration data
 */
export async function GET(request: NextRequest) {
  try {
    // Get the facility ID from the query parameters
    const facilityId = request.nextUrl.searchParams.get('FacilityId');
    
    if (!facilityId) {
      return NextResponse.json(
        { error: 'FacilityId is required' },
        { status: 400 }
      );
    }

    // Get the API base URL and subscription key from environment variables
    const apiBaseUrl = process.env.API_BASE_URL_DASHBOARD;
    const apiSubscriptionKey = process.env.API_SUBSCRIPTION_KEY;

    if (!apiBaseUrl || !apiSubscriptionKey) {
      return NextResponse.json(
        { error: 'API configuration is missing' },
        { status: 500 }
      );
    }

    // Make the request to the external API
    try {
      const authToken = process.env.AUTH_TOKEN;
      const response = await fetch(
        `${apiBaseUrl}/api/TapHandWashDuration?FacilityId=${facilityId}`,
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
      
      // If the API returns valid data, use it
      if (data && Object.keys(data).length > 0) {
        return NextResponse.json(data);
      } else {
        // Return an error if the API returns empty data
        return NextResponse.json(
          { error: 'API returned empty data' },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error('Error fetching from external API:', error);
      return NextResponse.json(
        { error: 'Failed to fetch data from external API' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching hand wash duration data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hand wash duration data' },
      { status: 500 }
    );
  }
}



