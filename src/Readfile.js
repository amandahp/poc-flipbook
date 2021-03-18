const PDFJS = require("pdfjs-dist/webpack");
const  PDFJSdist = require ('pdfjs-dist');




const readFileData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

//param: file -> the input file (e.g. event.target.files[0])
//return: images -> an array of images encoded in base64 
const convertPdfToImages = async (file) => {
  let images = [];
  const data = await readFileData(file);
  const pdf = await PDFJS.getDocument(data).promise;
  const canvas = document.createElement("canvas");
  console.log(pdf.numPages)
  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    console.log(page)
    console.log(images)
    const viewport = page.getViewport({ scale: 1 });
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    console.log(canvas)
    await page.render({ canvasContext: context, viewport: viewport }).promise;
    images.push(canvas.toDataURL());
  }
  canvas.remove();
  return images;
}

export default convertPdfToImages