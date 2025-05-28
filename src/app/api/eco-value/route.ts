import { NextRequest, NextResponse } from 'next/server';

// Error response helper
const errorResponse = (message: string, status: number) =>
    NextResponse.json({ error: message }, { status });

export async function GET(request: NextRequest) {
    try {
        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const facilityId = searchParams.get('facilityId');
        const weekInterval = searchParams.get('weekInterval') || '4';

        // Validate required parameters
        if (!facilityId) {
            return errorResponse('Facility ID is required', 400);
        }


        // Get environment variables
        const apiBaseUrl = process.env.API_BASE_URL_DASHBOARD;
        const authToken = process.env.AUTH_TOKEN;
        const subscriptionKey = process.env.API_SUBSCRIPTION_KEY;

        // Validate environment variables
        if (!apiBaseUrl || !authToken || !subscriptionKey) {
            console.error('Missing required environment variables');
            return errorResponse('Server configuration error', 500);
        }

        // Make API request
        const apiUrl = `${apiBaseUrl}/api/EcoValueDetail?FacilityId=${facilityId}`;
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
                'Ocp-Apim-Subscription-Key': process.env.API_SUBSCRIPTION_KEY || '',
                'Content-Type': 'application/json'
            }
        });

        // Handle API errors
        if (!response.ok) {
            console.error(`API request failed with status ${response.status}`);
            return errorResponse(`API request failed with status ${response.status}`, response.status);
        }

        // Return successful response
        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        // Log and handle unexpected errors
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching urinal vs toilet usage data:', errorMessage);
        return errorResponse('Failed to fetch urinal vs toilet usage data', 500);
    }
}
