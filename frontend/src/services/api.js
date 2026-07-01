import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE_URL });

/**
 * Uploads a steel surface image to the backend and returns the
 * defect classification result from the AI model.
 * @param {File} imageFile
 */
export async function analyzeDefect(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await api.post("/analyze-defect", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

export async function fetchDefectCatalogue() {
  const response = await api.get("/defect-catalogue");
  return response.data.catalogue;
}
