
/**
 * @param {string} url - The source image
 * @param {number} aspectRatio - The aspect ratio
 * @return {Promise<HTMLCanvasElement>} A Promise that resolves with the resulting image as a canvas element
 */
function crop(url, aspectRatio) {
    // we return a Promise that gets resolved with our canvas element
    return new Promise((resolve) => {
        // this image will hold our source image data
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {
            // let's store the width and height of our image
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;

            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;

            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > aspectRatio) {
                outputWidth = inputHeight * aspectRatio;
            } else if (inputImageAspectRatio < aspectRatio) {
                outputHeight = inputWidth / aspectRatio;
            }

            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * 0.5;
            const outputY = (outputHeight - inputHeight) * 0.5;

            // create a canvas that will present the output image
            const canvas = document.createElement('canvas');

            // set it to the same size as the image
            canvas.width = outputWidth;
            canvas.height = outputHeight;

            // draw our image at position 0, 0 on the canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(inputImage, outputX, outputY);
            resolve(canvas.toDataURL());
        };

        // start loading our image
        inputImage.src = url;
    });
}

function resizeImage(inputDataUrl) {
    return new Promise((resolve) => {
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {
            const canvas = document.createElement('canvas');
            const targetWidth = 300;
            const targetHeight = 300;

            let width = inputImage.naturalWidth;
            let height = inputImage.naturalHeight;

            // Calculate the new dimensions, maintaining the aspect ratio
            if (width > height) {
                if (width > targetWidth) {
                    height *= targetWidth / width;
                    width = targetWidth;
                }
            } else {
                if (height > targetHeight) {
                    width *= targetHeight / height;
                    height = targetHeight;
                }
            }

            // Set the canvas dimensions to the new dimensions
            canvas.width = width;
            canvas.height = height;

            // Draw the resized image on the canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(inputImage, 0, 0, width, height);
            resolve(canvas.toDataURL());
        };
        inputImage.src = inputDataUrl;

    });
}