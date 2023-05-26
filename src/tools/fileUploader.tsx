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
        console.log("Success");
        break;
      case 404:
        console.log("Api endpoint not found");
        break;
      case 500:
      case 503:
        console.log("Server error");
        break;
      default:
        console.log(
          "Unhandled error, status: " +
            response.status +
            ", response body: " +
            response.body
        );
        break;
    }
  } catch (error) {
    console.error("Error uploading file: ", error);
  }
}
