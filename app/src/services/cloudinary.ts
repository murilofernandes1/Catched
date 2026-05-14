export const uploadToCloudinary = async (imageUri: string) => {
  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "cat.jpg",
  } as any);

  formData.append("upload_preset", "mobile");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dk2ymtczi/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  return data.secure_url;
};
