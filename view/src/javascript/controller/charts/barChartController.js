
export const fetchBarStats = async () => {

  const userid = "86a75215-6fb8-4d9e-8d89-960a71288ff6";

    try {
      const response = await fetch('http://127.0.0.1:5000/dashboard/thisWeeksStats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userid: userid}),
      })

      const calsAndMacs = await response.json();
      
    }
    catch(error) {
      console.log('Error: ', error);
    }
  }

