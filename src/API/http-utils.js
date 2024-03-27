export const httpGet = async (url, setLoading, toast) => {
  const access_token_name = "access_token"

  var authtoken = localStorage.getItem(access_token_name);
  try {
    
    setLoading(true);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    });

    setLoading(false);

    const data = await response.json();
    if (response.ok) {
      return { data, status: response.status };
    } else if (response.status === 401 || response.status === 403) {
      localStorage.removeItem(access_token_name);
      return { data: null, status: null };
    } else {
      toast({
        title: "Error",
        description: data.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return { data: null, status: null };
    }
  } catch (error) {
    setLoading(false);
    toast({
      title: "Error",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return { data: null, status: null };
  }
};

export const httpPost = async (
  url,
  body,
  setLoading,
  toast,
) => {
  const access_token_name = "access_token" 
  try {
    var authtoken = localStorage.getItem(access_token_name);
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `${authtoken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setLoading(false);

    var data = await response?.json();
    if (data === undefined) {
      data = null;
    }
    if (response.ok) {
      return { data, status: response.status };
    } else if (response.status === 401 || response.status === 403) {
      localStorage.removeItem(access_token_name);
      return { data: null, status: null };
    } else {
      toast({
        title: "Error",
        description: data.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return { data: null, status: null };
    }
  } catch (error) {
    setLoading(false);
    toast({
      title: "Error",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return { data: null, status: null };
  }
};
