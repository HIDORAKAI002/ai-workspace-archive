from upsonic import Direct, Task
from upsonic.utils.image import extract_and_save_images_from_response

# Create Direct instance
direct = Direct(model="openai/gpt-4o")

# Get response with image URLs
task = Task(
    description=(
        "Provide a markdown formatted image. "
        "Format as: ![Image](https://example.com/image.jpg)"
    )
)
result = direct.do(task)

# Extract and save images from response (folder created automatically)
saved_images = extract_and_save_images_from_response(
    response_text=result,
    folder_path="downloaded_images",
    base_filename="downloaded"
)

print(f"Saved {len(saved_images)} images")