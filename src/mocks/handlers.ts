import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/api/items', () => {
        const mockData = localStorage.getItem('mockData');
        const data = mockData ? JSON.parse(mockData) : [];
        return HttpResponse.json(data);
    }),

    http.post('/api/items', async ({ request }) => {
        const newData = await request.json();

        // Update localStorage with the new data
        localStorage.setItem('mockData', JSON.stringify(newData));

        return HttpResponse.json({ success: true, message: 'Mock data updated successfully.' });
    }),
]