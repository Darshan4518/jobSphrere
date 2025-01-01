import DataURIParser from "datauri/parser";
import path from "path";

const parser = new DataURIParser();
export const formatBufferTo64 = (
  file: Express.Multer.File
): { content: string } => {
  const result = parser.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );

  return { content: result?.content || "" };
};
