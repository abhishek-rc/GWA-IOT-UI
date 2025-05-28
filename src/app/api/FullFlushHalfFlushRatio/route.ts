import { NextRequest, NextResponse } from 'next/server';

/**
 * API route handler for fetching Full Flush Half Flush Ratio data
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
        `${apiBaseUrl}/api/FullFlushHalfFlushRatio?FacilityId=${facilityId}`,
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
      if (data && Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data);
      } else {
        // Return default values if the API returns empty data
        console.log('API returned empty data, returning default values');
        
        // Create default data structure that matches the expected format
        const defaultData = [
          [{ TargetFullFlushHalfFlushRatio: 70 }], // Default target is 70% half flushes
          [{ FullFlushHalfFlushRatio: 0 }]        // Default actual is 0% half flushes
        ];
        
        return NextResponse.json(defaultData);
      }
    } catch (error) {
      console.error('Error fetching from external API:', error);
      return NextResponse.json(
        { error: 'Failed to fetch data from external API' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in FullFlushHalfFlushRatio API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Full Flush Half Flush Ratio data' },
      { status: 500 }
    );
  }
}