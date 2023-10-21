export default function Upload() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", event.target.image.files[0]);

    const response = await fetch("/api/generateProduct", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*" required />
      <button type="submit">Upload</button>
    </form>
  );
}
