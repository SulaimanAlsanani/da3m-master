import axios from "axios";
const apiServiceCall = async ({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  method?: string;
  body?: any;
  headers?: any;
}) => {
 

  try {
    const response = await axios({
      method: method?.toUpperCase() || "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data: body, // Replace body with data
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      // Spread any custom config passed to the function
    });
    
    return {status:response?.status, data:response.data};
  } catch (error) {
    // Handle error (you could add more custom error handling here)
    if (axios.isAxiosError(error)) {
      if (error.status === 401) {
        throw {
          status: 401,
          redirectToLogin: true,
          message: "Unauthorized",
          data: error.response?.data,
        };
      }
      throw  {status:error?.status, message:error?.message,data:error?.response?.data}
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export default apiServiceCall;