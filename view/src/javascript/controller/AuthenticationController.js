
export class AuthenticationController {
  async getUserId(cookies) {
    try {
      // Fetch the userId from the backend using the 'sessionToken' cookie
      const response = await fetch('http://127.0.0.1:5000/authentication/getUserId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        body: JSON.stringify({ token: cookies.token }), // Use cookies.token to get the token value
      });

      // Check if the response status is okay (2xx status code)
      if (response.ok) {
        // Parse the response body as JSON
        const data = await response.json();
        // Return the 'userId' from the data object
        return data.userId;
      } else {
        // If the response is not okay, handle the error and throw it
        throw new Error('Unauthorized');
      }
    } catch (error) {
      // Handle errors, such as unauthorized access or network issues
      console.error(error.message);
      throw error;
    }
  }
}

