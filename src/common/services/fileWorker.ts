import { FileServiceImpl } from "./FileService";

const fileService = new FileServiceImpl();

self.onmessage = async (event) => {
  const { path, content, method, resolve, reject } = event.data;

  try {
    let result;
    switch (method) {
      case "readFile":
        result = await fileService.readFile(path);
        break;
      case "writeFile":
        result = await fileService.writeFile(path, content);
        break;
      case "fileExists":
        result = await fileService.fileExists(path);
        break;
    }
    self.postMessage({ result, resolve });
  } catch (error) {
    self.postMessage({ error, reject });
  }
};
