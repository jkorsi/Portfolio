export async function fileUploader(file: File, apiAddress: string) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(apiAddress, {
      method: "POST",
      body: formData,
    });
    switch (response.status) {
      case 200:
        console.log("File uploaded succesfully");
        return "File uploaded succesfully";
        break;
      case 404:
        console.log("Api endpoint not found");
        return "File not uploaded: API endpoint not found.";
        break;
      case 500:
      case 503:
        console.log("Server error");
        return "Server error, code: " + response.status;
        break;
      default:
        console.log(
          "Unhandled error, status: " +
            response.status +
            ", response body: " +
            response.body
        );
        return "Unexpected error, status code: " + response.status;
        break;
    }
  } catch (error) {
    console.error("Error uploading file: ", error);
  }
}
